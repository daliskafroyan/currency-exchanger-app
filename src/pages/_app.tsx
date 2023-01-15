import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { MainSidebar } from '@/components/layout/MainSidebar';
import AppShell from '@/components/layout/AppShell';
import { ModalsProvider } from '@mantine/modals';

import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ fontFamily: `Montserrat` }}>
      <ModalsProvider>
        <NotificationsProvider>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
