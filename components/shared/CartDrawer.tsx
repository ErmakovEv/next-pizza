'use client';

import React, { FC, PropsWithChildren, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import CartDrawerItem from './CartDrawerItem';
import { getCartItemDetails } from '@/lib/getcartItemDetails';
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constans/pizza';

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ children }) => {
  const {
    fetchCartItems,
    items,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const clickCountButtonHandler = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    updateItemQuantity(id, type === 'plus' ? ++quantity : --quantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            Товары в корзине: <span className="font-bold">{items.length}</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx6 mt-5 overflow-auto flex-1">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                className={''}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  clickCountButtonHandler(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/checkout">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
