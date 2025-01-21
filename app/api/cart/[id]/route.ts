import { updateCartTotalAmount } from '@/lib/updateCartTotalAmount';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const token = req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart Item not found' });
    }

    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: body.quantity,
      },
    });

    const updCart = await updateCartTotalAmount(token);

    return NextResponse.json(updCart);
  } catch (error) {
    console.error(`[CART_PATCH] Sercer error ${error}`);
    NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось удалить корзину' },
      { status: 500 }
    );
  }
}
