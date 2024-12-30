import { ChooseProductModal } from '@/components/modal/ChooseProductModal';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type TpageProps = {
  params: { id: string };
};

const ProductModalPage: FC<TpageProps> = async ({ params }) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      ingredients: true,
      productItems: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
};

export default ProductModalPage;
