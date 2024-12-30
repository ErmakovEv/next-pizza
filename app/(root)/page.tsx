import { Container } from '@/components/shared/Container';
import { Filters } from '@/components/shared/Filters';
import { ProductsList } from '@/components/shared/ProductsList';
import { Title } from '@/components/shared/Title';
import { TopBar } from '@/components/shared/TopBar';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          productItems: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size={'lg'} className="font-extrabold" />
      </Container>

      <TopBar items={categories.filter((cat) => cat.products.length)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (cat) =>
                  cat.products.length && (
                    <ProductsList
                      key={cat.id}
                      title={cat.name}
                      items={cat.products}
                      categoryId={cat.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
