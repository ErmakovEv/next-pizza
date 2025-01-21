'use client';

import { FC } from 'react';
import { Title } from './Title';
import { Input } from '../ui/input';
import { RangeSlider } from './RangeSlider';
import { FilterCheckboxGroup } from './FilterCheckboxGroup';
import { useFilters } from '@/hooks/useFilters';
import { useIngredients } from '@/hooks/useIngredients';
import { useQueryFilters } from '@/hooks/useQueryFilters';

type TFiltersProps = {
  classname?: string;
};

export const Filters: FC<TFiltersProps> = ({ classname }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={classname}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <FilterCheckboxGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '2' },
          { text: 'Традиционное', value: '1' },
        ]}
      />

      <FilterCheckboxGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <div className="mt-6 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font0bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={10000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      <FilterCheckboxGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
