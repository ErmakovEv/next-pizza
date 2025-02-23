import Link from 'next/link';
import { FC } from 'react';
import { Title } from './Title';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

type TProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  classname?: string;
};

export const ProductCard: FC<TProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  classname,
}) => {
  return (
    <div className={classname}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients.map((item) => item.name).join(', ')}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
