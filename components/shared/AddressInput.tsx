'use client';

import React, { useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
  value?: string;
}

export const AdressInput: React.FC<Props> = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  return (
    <AddressSuggestions
      token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
      onChange={(data) => onChange?.(data?.value)}
      delay={200}
      inputProps={{
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
          if (e.target.value === '') {
            onChange?.(e.target.value);
          }
        },
        value: inputValue,
      }}
    />
  );
};
