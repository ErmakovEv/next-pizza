'use client';

import { cn } from '@/lib/utils';
import { Container } from './Container';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import CartButton from './CartButton';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { ProfileButton } from './ProfileButton';
import { AuthModal } from '../modal/AuthModal/AuthModal';

type THeaderProps = {
  className?: string;
  hasCheckout?: boolean;
};

export const Header: React.FC<THeaderProps> = ({
  className,
  hasCheckout = false,
}) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  console.log('session', session);

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    // if (searchParams.has('verified')) {
    //   toastMessage = 'Почта успешно подтверждена!';
    // }

    if (toastMessage) {
      setTimeout(() => {
        toast.success(toastMessage);
      }, 100);
    }
  }, [searchParams]);

  return (
    <header className={cn(className, 'border-b')}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">next pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкуснее уже некуда
              </p>
            </div>
          </div>
        </Link>
        {!hasCheckout && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {!hasCheckout && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
