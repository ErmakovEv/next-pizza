'use client';

import { FC } from 'react';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';
import { Title } from './Title';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

type TProductsListProps = {
  title: string;
  items: any[];
  categoryId: number;
  classname?: string;
  listClassName?: string;
};

export const ProductsList: FC<TProductsListProps> = ({
  title,
  items,
  listClassName,
  categoryId,
  classname,
}) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.9,
  });

  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={classname} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.productItems?.[0].price}
          />
        ))}
      </div>
    </div>
  );
};
