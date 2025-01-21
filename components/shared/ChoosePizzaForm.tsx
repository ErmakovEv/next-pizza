'use client';

import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { Title } from './Title';
import { Button } from '../ui/button';
import { PizzaImage } from './PizzaImage';
import { GroupVariants } from './GroupVariants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/constans/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './IngredientItem';
import { usePizzaOptions } from '@/hooks/usePizzaOptions';
import { getPizzaDetails } from '@/lib/getPizzaDetails';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  className,
  loading,
  onSubmit,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          loading={loading}
          onClick={() =>
            currentItemId &&
            onSubmit(currentItemId, Array.from(selectedIngredients))
          }
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
