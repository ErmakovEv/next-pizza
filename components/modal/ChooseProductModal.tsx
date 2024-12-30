'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Title } from '../shared/Title';
import { Product } from '@prisma/client';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';

type TChooseProductModalProps = {
  product: Product;
  className?: string;
};

export const ChooseProductModal: FC<TChooseProductModalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogTitle>Text</DialogTitle>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <Title text={product.name} />
      </DialogContent>
    </Dialog>
  );
};
