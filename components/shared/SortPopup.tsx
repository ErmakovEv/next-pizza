import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { FC } from 'react';

type TSortPopupProps = {
  classname?: string;
};

export const SortPopup: FC<TSortPopupProps> = ({ classname }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52] rounded-2xl cursor-pointer',
        classname
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">Популярное</b>
    </div>
  );
};
