'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store/cart';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './ChoosePizzaForm';
import { ChooseProductForm } from './ChooseProductForm';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const { addCartItem, loading } = useCartStore((state) => state);

  const firstItem = product.productItems[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = useCallback(
    async (productItemId?: number, ingredients?: number[]) => {
      try {
        const itemId = productItemId ?? firstItem.id;

        await addCartItem({
          productItemId: itemId,
          ingredients,
        });

        toast.success(product.name + ' добавлена в корзину');

        _onSubmit?.();
      } catch (err) {
        toast.error('Не удалось добавить товар в корзину');
        console.error(err);
      }
    },
    [_onSubmit, addCartItem, firstItem.id, product.name]
  );

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.productItems}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
