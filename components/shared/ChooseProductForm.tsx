import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { Title } from './Title';
import { Button } from '../ui/button';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit: VoidFunction;
  className?: string;
}

export const ChooseProductForm: FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={() => onSubmit()}
          loading={loading}
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
