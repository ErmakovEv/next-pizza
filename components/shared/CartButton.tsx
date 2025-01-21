'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { useCartStore } from '@/store/cart';

interface Props {
  className?: string;
}

function CartButton({ className }: Props) {
  const { loading, totalAmount, items } = useCartStore((state) => state);

  return (
    <CartDrawer>
      <Button
        className={cn('group relative', className, { 'w-[108px]': loading })}
        loading={loading}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
}

export default CartButton;
