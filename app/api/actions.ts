'use server';

import { TCheckoutForm } from '@/components/shared/checkout/schema';
import { PayOrderTemplate } from '@/components/shared/email/payOrder';
import { createPayment } from '@/lib/create-payment';
import { sendEmail } from '@/lib/sendEmail';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: TCheckoutForm) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (!userCart.totalAmount) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: 'Оплата заказа №' + order.id,
    });

    if (!paymentData) {
      throw new Error('PaymentData not found');
    }

    console.log('paymentData', paymentData);

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    await sendEmail(
      data.email,
      'Next Pizza / оплатите заказ',
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        url: paymentData.confirmation.confirmation_url,
      })
    );

    return paymentData.confirmation.confirmation_url;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}
