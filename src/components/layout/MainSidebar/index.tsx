/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  Text,
  RingProgress,
  Stack,
  Paper,
} from '@mantine/core';
import Link from 'next/link';
import TransactionIcon from '@/public/transaction.svg';
import CardsIcon from '@/public/cards.svg';
import DepositMoneyIcon from '@/public/deposit.svg';
import AccountsIcon from '@/public/account.svg';
import ConvertIcon from '@/public/convert.svg';
import ChatIcon from '@/public/chat.svg';
import { IconChevronDown } from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef(`icon`);
  return {
    navbar: {
      backgroundColor: '#0E0D52',
      height: '100vh',
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: `filled`, color: theme.primaryColor })
          .background!,
        0.1,
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      padding: theme.spacing.md,
      background: '#2A2E94'
    },

    link: {
      ...theme.fn.focusStyles(),
      display: `flex`,
      alignItems: `center`,
      textDecoration: `none`,
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      height: '50px',
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: `filled`, color: theme.primaryColor })
            .background!,
          0.1,
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: `filled`, color: theme.primaryColor })
            .background!,
          0.15,
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: '', label: 'My Account', icon: AccountsIcon },
  { link: '', label: 'Transactions', icon: TransactionIcon },
  { link: '', label: 'Manage Cards', icon: CardsIcon },
  { link: '', label: 'Deposit Money', icon: DepositMoneyIcon },
  { link: '', label: 'Convert Money', icon: ConvertIcon },
  { link: '', label: 'Live Chat', icon: ChatIcon },
];

export function MainSidebar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(`Billing`);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar height={700} width={{ sm: 300 }} className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Group spacing={'sm'}>
            <RingProgress
              thickness={4}
              size={48}
              sections={[{ value: 50, color: '#2AF5D6' }]}
            />
            <Stack align="flex-start" justify="flex-start" spacing={0}>
              <Text color={'white'} size={10}>STEP 02</Text>
              <Text fw={800} size={12} color={'white'}>
                Specify Amount
              </Text>
            </Stack>
          </Group>
          <IconChevronDown color='#2AF5D6' />
        </Group>
        <div style={{ padding: '16px' }}>
          {links}
        </div>

      </Navbar.Section>
    </Navbar >
  );
}
