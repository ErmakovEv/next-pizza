import { CheckoutItemDetails } from '@/components/shared/CheckouteItemDetail';
import { Title } from '@/components/shared/Title';
import { WhiteBlock } from '@/components/shared/WhiteBlock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

const CheckoutPage = () => {
  return (
    <div className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">{123132}</WhiteBlock>
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Введите адрес"
              />
              <Textarea
                name="comment"
                className="text-base"
                placeholder="Комментарий к заказу"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-4xl font-extrabold">2500 Р</span>
            </div>
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Стоимость корзины:
                </div>
              }
              value={`${3500} ₽`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Налоги:
                </div>
              }
              value={`${100} ₽`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Доставка:
                </div>
              }
              value={`${300} ₽`}
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
