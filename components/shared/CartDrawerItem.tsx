import { cn } from '@/lib/utils';
import React from 'react';
import { CartItemProps } from './cartItemsDetails/cartDetails.types';

import * as CartItem from './cartItemsDetails/';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  className: string;
}

function CartDrawerItem({
  className,
  id,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled,
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
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawerItem;
