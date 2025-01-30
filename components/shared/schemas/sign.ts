import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, { message: 'Пароль должен содержать не менее 4 символов' });

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадает',
    path: ['confirmPassword'],
  });

export type TLoginForm = z.infer<typeof loginFormSchema>;
export type TRegisterForm = z.infer<typeof registerFormSchema>;
