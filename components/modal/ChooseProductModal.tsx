'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ChooseProductForm } from '../shared/ChooseProductForm';
import { ChoosePizzaForm } from '../shared/ChoosePizzaForm';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

type TChooseProductModalProps = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: FC<TChooseProductModalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();
  const productItem = product.productItems[0];
  const isPizzaForm = Boolean(productItem.pizzaType);

  const { addCartItem, loading } = useCartStore((state) => state);

  const onAddProduct = () => {
    try {
      addCartItem({ productItemId: productItem.id });
      toast.success('Продукт добавлен в корзину');
      router.back();
    } catch (error) {
      console.log(error);
      toast.error('Не удалось добавить продукт');
    }
  };
  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    try {
      addCartItem({ productItemId, ingredients });
      toast.success('Пицца добавлена в корзину');
      router.back();
    } catch (error) {
      console.log(error);
      toast.error('Не удалось добавить пиццу');
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.productItems}
            onSubmit={onAddPizza}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onAddProduct}
            price={productItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
