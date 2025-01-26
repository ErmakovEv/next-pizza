import { FC } from 'react';
import { RequiredSymbol } from './RequiredSymbol';
import { Input } from '@/components/ui/input';
import { ClearButton } from './ClearButton';
import { ErrorText } from './ErrorText';
import { useFormContext } from 'react-hook-form';

interface TFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<TFormInputProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {value && (
          <ClearButton
            onClick={() => setValue(name, '', { shouldValidate: true })}
          />
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
