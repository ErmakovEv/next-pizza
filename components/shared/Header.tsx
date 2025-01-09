import { cn } from '@/lib/utils';
import { Container } from './Container';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import CartButton from './CartButton';

type THeaderProps = {
  classname?: string;
};

export const Header: React.FC<THeaderProps> = ({ classname }) => {
  return (
    <header className={cn(classname, 'border border-b')}>
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
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          <div>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
