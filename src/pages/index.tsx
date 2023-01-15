import Head from 'next/head';

import { TextInput } from '@/components/input/TextInput';
import { Button, Group, Paper, Text } from '@mantine/core';
import { CurrencyInput } from '@/components/input/CurrencyInput';
import FeeTimeline from '@/components/common/FeeTimeline';
import { useEffect, useReducer } from 'react';
import { useTimeout } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';

export const currencyExchangerValue = {
  USD: 1,
  EUR: 0.815894,
  CAD: 1.204355,
  GBP: 0.70602,
  MXN: 19.88162,
  PLN: 3.66121,
};

interface CurrencyExchangerState {
  credit: number;
  senderCurrencyValue: undefined | number;
  receiverCurrencyValue: undefined | number;
  error: string | undefined;
  senderCurrency: keyof typeof currencyExchangerValue;
  receiverCurrency: keyof typeof currencyExchangerValue;
  fee: number;
  isLoading: boolean
}

export default function Home() {
  const senderCurrency = [{ value: 'usd', label: '🇺🇸 USD' }];
  const receiverCurrency = [
    { value: 'USD', label: '🇺🇸 USD' },
    { value: 'EUR', label: '🇪🇺 EUR' },
    { value: 'CAD', label: '🇨🇦 CAD' },
    { value: 'GBP', label: '🇬🇧 GBP' },
    { value: 'PLN', label: '🇵🇱 PLN' },
    { value: 'MXN', label: '🇲🇽 MXN' },
  ];

  const [event, updateEvent] = useReducer(
    (prev: CurrencyExchangerState, next: Partial<CurrencyExchangerState>) => {
      const newEvent = { ...prev, ...next };

      // raise error when credit is less than exchanged value
      if (newEvent.senderCurrencyValue) {
        if (newEvent.credit < newEvent.senderCurrencyValue) {
          newEvent.error = "Can't exchange money more than you have";
        } else {
          newEvent.error = undefined;
        }
      } else {
        newEvent.error = undefined;
      }

      // calculate fee on the fly
      if (newEvent.senderCurrencyValue === 0 || newEvent.senderCurrencyValue === undefined) {
        newEvent.fee = 0;
      } else if (newEvent.senderCurrencyValue < 10) {
        newEvent.fee = newEvent.senderCurrencyValue * (0.5 / 100);
      } else if (newEvent.senderCurrencyValue > 10 && newEvent.senderCurrencyValue < 100) {
        newEvent.fee = newEvent.senderCurrencyValue * (0.8 / 100);
      } else {
        newEvent.fee = 1.5 + newEvent.senderCurrencyValue * (0.8 / 100);
      }

      // show receiver value after being deducted by fee
      if (newEvent.senderCurrencyValue) {
        newEvent.receiverCurrencyValue = (newEvent.senderCurrencyValue - newEvent.fee) * currencyExchangerValue[newEvent.receiverCurrency];

        if (next.receiverCurrency) {
          newEvent.receiverCurrencyValue = (newEvent.senderCurrencyValue - newEvent.fee) * currencyExchangerValue[newEvent.receiverCurrency];
        }
      } else {
        newEvent.receiverCurrencyValue = undefined;
      }


      return newEvent;
    },
    {
      credit: 3000,
      senderCurrencyValue: undefined,
      receiverCurrencyValue: undefined,
      error: undefined,
      senderCurrency: 'USD',
      receiverCurrency: 'USD',
      fee: 0,
      isLoading: false
    },
  );

  const { start } = useTimeout(() => updateEvent({ isLoading: false }), 1000);

  useEffect(start, [event])

  const handleProceedConfirm = () => {
    if (event.senderCurrencyValue)
      updateEvent({ credit: event.credit - event.senderCurrencyValue })
    showNotification({
      title: 'Success!',
      message: 'Your money has been sent',
    })
  }

  const handleClickConfirm = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to send the money?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => handleProceedConfirm(),
    })
  }

  return (
    <>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta name="description" content="TypeScript starter for Next.js that includes all you need to build amazing apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper m={80}>
        <Paper shadow="sm" p="sm">
          <Text fw={500}>Credit</Text>
          <Text size={40} fw={600}>$ {event.credit}</Text>
        </Paper>
        <Paper shadow="md" p="md" mt="md">
          <CurrencyInput
            label="You Send"
            data={senderCurrency}
            error={event.error}
            onCurrencyChange={(e) => updateEvent({ senderCurrency: e, isLoading: true })}
            onValueChange={(e) => updateEvent({ senderCurrencyValue: e, isLoading: true })}
            value={event.senderCurrencyValue}
          />
        </Paper>
        <FeeTimeline fee={event.fee} exchangeRate={currencyExchangerValue[event.receiverCurrency]} currency={event.receiverCurrency} loading={event.isLoading} />
        <Paper shadow="md" p="md">
          <CurrencyInput
            label="Recipient Gets"
            data={receiverCurrency}
            onCurrencyChange={(e) => updateEvent({ receiverCurrency: e, isLoading: true })}
            value={event.receiverCurrencyValue}
            onValueChange={(e) => updateEvent({ receiverCurrencyValue: e, isLoading: true })}
          />
        </Paper>
        <TextInput label="Title" size="md" placeholder="*optional" mt={48} />

        <Group grow mt="md">
          <Button variant="outline" size="md">
            Back
          </Button>
          <Button onClick={handleClickConfirm} variant="filled" size="md" disabled={event.senderCurrencyValue === undefined || !!event.error || event.isLoading}>
            Continue
          </Button>
        </Group>
      </Paper>
    </>
  );
}
