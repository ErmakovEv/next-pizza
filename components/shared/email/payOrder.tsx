import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  url: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  url,
}) => (
  <div>
    <h1>Создан заказ №{orderId} !</h1>
    <p>
      Чтобы оплатить заказ на сумму ${totalAmount} перейдите по
      <a href={url}>ссылке</a>
    </p>
  </div>
);
