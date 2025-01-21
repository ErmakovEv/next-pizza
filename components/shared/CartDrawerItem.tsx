import { cn } from '@/lib/utils';
import React from 'react';
import { CartItemProps } from './cartItemsDetails/cartDetails.types';

import * as CartItem from './cartItemsDetails/';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemove: () => void;
  className: string;
}

function CartDrawerItem({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  onClickCountButton,
  onClickRemove,
}: Props) {
  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info details={details} name={name} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawerItem;
