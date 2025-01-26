'use client';

import { Title } from '@/components/shared/Title';
import { useCart } from '@/hooks/useCart';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutCart } from '@/components/shared/checkout/CheckoutCart';
import { CheckoutPersonalFrom } from '@/components/shared/checkout/CheckoutPersonalFrom';
import { CheckoutAddressFrom } from '@/components/shared/checkout/CheckoutAddressFrom';
import {
  checkoutFormSchema,
  TCheckoutForm,
} from '@/components/shared/checkout/schema';
import { CheckoutSidebar } from '@/components/shared/checkout/CheckoutSidebar';
import { Container } from '@/components/shared/Container';
import { createOrder } from '@/app/api/actions';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { totalAmount, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<TCheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const submitHandler: SubmitHandler<TCheckoutForm> = async (data) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart loading={loading} />
              <CheckoutPersonalFrom
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              <CheckoutAddressFrom
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default CheckoutPage;
