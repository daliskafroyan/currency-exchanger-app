/* eslint-disable prettier/prettier */
import { useState } from 'react';
import {
  NumberInput as MantineNumberInput,
  createStyles,
  NativeSelect,
  NumberInputProps
} from '@mantine/core';
import { currencyExchangerValue } from '@/pages';

const useStyles = createStyles(
  (theme, { floating }: { floating: boolean }) => ({
    root: {
      position: 'relative',
    },

    invalid: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
    },

    label: {
      position: 'absolute',
      zIndex: 2,
      top: 18,
      left: theme.spacing.sm,
      pointerEvents: 'none',
      color: floating
        ? theme.colorScheme === 'dark'
          ? theme.white
          : theme.black
        : theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
      transition:
        'transform 150ms ease, color 150ms ease, font-size 150ms ease',
      transform: floating ? `translate(-${theme.spacing.sm}px, -42px)` : 'none',
      fontSize: floating ? theme.fontSizes.sm : theme.fontSizes.md,
      fontWeight: floating ? 500 : 400,
    },

    required: {
      transition: 'opacity 150ms ease',
      opacity: floating ? 1 : 0,
    },

    input: {
      '&::placeholder': {
        transition: 'color 150ms ease',
        color: !floating ? 'transparent' : undefined,
      },
    },
  }),
);

interface CurrencyInputInterface extends NumberInputProps {
  data: Array<{ value: string, label: string }>
  onValueChange?: (val: number) => void
  onCurrencyChange: (val: keyof typeof currencyExchangerValue) => void
  value?: number | undefined
  error?: string
}

export function CurrencyInput({ data, onValueChange, onCurrencyChange, value, error, ...other }: CurrencyInputInterface) {
  const [focused, setFocused] = useState(false);
  const { classes } = useStyles({
    floating: !!value || focused,
  });


  const select = (
    <NativeSelect
      size='xl'
      data={data}
      onChange={(e) => onCurrencyChange(e.currentTarget.value as keyof typeof currencyExchangerValue)}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  return (
    <MantineNumberInput
      classNames={classes}
      error={error}
      onChange={onValueChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      rightSection={select}
      rightSectionWidth={145}
      value={value}
      precision={5}
      removeTrailingZeros
      parser={(value) => value?.replace(/\$\s?|(,*)([A-Za-z]*)/g, '')}
      formatter={(value) =>
        !Number.isNaN(value)
          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : ''
      }
      size="xl"
      {...other}
    />
  );
}
