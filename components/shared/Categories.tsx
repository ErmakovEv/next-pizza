'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { FC } from 'react';
import { Category } from '@prisma/client';

type TCategoriesProps = {
  classname?: string;
  items: Category[];
};

export const Categories: FC<TCategoriesProps> = ({ classname, items }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', classname)}
    >
      {items.map((cat) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategoryId === cat.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          key={cat.id}
          href={`/#${cat.name}`}
        >
          <button>{cat.name}</button>
        </a>
      ))}
    </div>
  );
};
