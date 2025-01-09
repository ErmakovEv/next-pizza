'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ChooseProductForm } from '../shared/ChooseProductForm';
import { ChoosePizzaForm } from '../shared/ChoosePizzaForm';

type TChooseProductModalProps = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: FC<TChooseProductModalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.productItems[0].pizzaType);

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
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
