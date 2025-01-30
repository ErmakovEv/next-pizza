import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { loginFormSchema, TLoginForm } from '../../shared/schemas/sign';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { FormInput } from '@/components/shared/form/FormInput';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/shared/Title';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

type TLoginFormProps = {
  onClose?: VoidFunction;
  className?: string;
};

export const LoginForm: FC<TLoginFormProps> = ({ className, onClose }) => {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TLoginForm) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn('flex flex-col gap-5', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/image/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
