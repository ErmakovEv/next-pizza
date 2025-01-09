import { PizzaType, PizzaSize, mapPizzaType } from '@/constans/pizza';
import { ProductItem, Ingredient } from '@prisma/client';
import { calcTotalPizzaPrice } from './calcPizzaPrices';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetaills };
};
