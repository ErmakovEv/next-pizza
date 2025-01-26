import { PizzaType, PizzaSize } from '@/constans/pizza';
import { useCart } from '@/hooks/useCart';
import { getCartItemDetails } from '@/lib/getcartItemDetails';
import { FC } from 'react';
import { WhiteBlock } from '../WhiteBlock';
import { CheckoutCartItem } from './CheckoutCartItem';

type TCheckoutCartProps = {
  className?: string;
  loading?: boolean;
};

// TODO: доделать загрузку по каждому item
export const CheckoutCart: FC<TCheckoutCartProps> = ({ className }) => {
  const { items, clickCountButtonHandler, removeCartItem } = useCart();

  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <CheckoutCartItem
            key={item.id}
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
            disabled={item.disabled}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
