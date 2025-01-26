import * as React from 'react';

interface Props {
  orderId: number;
}

export const OrderCancelTemplate: React.FC<Props> = ({ orderId }) => (
  <div>
    <h1>Спасибо за покупку!</h1>
    <p>{`Оплата заказа №${orderId} не прошла :(`}</p>

    <hr />
  </div>
);
