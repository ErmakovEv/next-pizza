import { Button } from '@/components/ui/button';
import { Package, Percent, Truck, ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { WhiteBlock } from '../WhiteBlock';
import { CheckoutItemDetails } from './CheckoutItemDetail';
import { Skeleton } from '@/components/ui/skeleton';

const VAT = 15;
const DELIVERY_PRICE = 250;

type TCheckoutSidebarProps = {
  totalAmount: number;
  loading?: boolean;
};

export const CheckoutSidebar: FC<TCheckoutSidebarProps> = ({
  totalAmount,
  loading,
}) => {
  const VAT_PRICE = (totalAmount * VAT) / 100;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalAmount} ₽
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${VAT_PRICE} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        loading={loading}
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
