import { Container } from '@/components/shared/Container';
import { GroupVariants } from '@/components/shared/GroupVariants';
import { PizzaImage } from '@/components/shared/PizzaImage';
import { Title } from '@/components/shared/Title';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type TpageProps = {
  params: { id: string };
};

const ProductPage: FC<TpageProps> = async ({ params: { id } }: TpageProps) => {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) return notFound();

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[@FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
            quaerat.
          </p>

          <GroupVariants
            items={[
              {
                name: 'Маленькая',
                value: '1',
                disabled: true,
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
              },
            ]}
            value="3"
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
