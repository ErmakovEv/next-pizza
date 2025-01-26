import { PaymentCallbackData } from '@/@types/ykassa';
import { OrderCancelTemplate } from '@/components/shared/email/orderCancel';
import { OrderSuccessTemplate } from '@/components/shared/email/orderSuccess';
import { sendEmail } from '@/lib/sendEmail';
import { prisma } from '@/prisma/prisma-client';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: +body.object.metadata.order_id,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      await sendEmail(
        order.email,
        'Next Pizza / Ошибка оплаты',
        OrderCancelTemplate({ orderId: order.id })
      );
    }
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: 'Server error' });
  }
}
