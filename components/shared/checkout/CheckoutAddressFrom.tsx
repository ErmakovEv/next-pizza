import { FC } from 'react';
import { WhiteBlock } from '../WhiteBlock';
import { FormTextarea } from '../form/FromTextArea';
import { AdressInput } from '../AddressInput';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../form/ErrorText';

type TCheckoutAddressFromProps = {
  className?: string;
};

export const CheckoutAddressFrom: FC<TCheckoutAddressFromProps> = ({
  className,
}) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        {/* <Input
          name="address"
          className="text-base"
          placeholder="Введите адрес"
        /> */}
        <Controller
          name="address"
          rules={{
            required: 'Поле обязательно для заполнения', // Установите сообщение об ошибке
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          }}
          render={({ field, formState }) => {
            const errorText = formState.errors['address']?.message as string;
            return (
              <>
                <AdressInput onChange={field.onChange} />

                {errorText && <ErrorText text={errorText} />}
              </>
            );
          }}
          control={control}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
