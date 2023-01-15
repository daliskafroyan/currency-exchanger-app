import { MainSidebar } from '@/components/layout/MainSidebar';
import { AppShell as MantineAppShell } from '@mantine/core';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MantineAppShell padding="md" navbar={<MainSidebar />}>
      {children}
    </MantineAppShell>
  );
}
