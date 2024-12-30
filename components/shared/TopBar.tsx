import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Categories } from './Categories';
import { SortPopup } from './SortPopup';
import { Container } from './Container';
import { Category } from '@prisma/client';

type TTopBarProps = {
  classname?: string;
  items: Category[];
};

export const TopBar: FC<TTopBarProps> = ({ classname, items }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        classname
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={items} />
        <SortPopup />
      </Container>
    </div>
  );
};
