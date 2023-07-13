import {
  AppShell,
  Footer,
  Header,
  Navbar,
  Button,
  Group,
  Title,
} from "@mantine/core";
import { useMedplum } from "@medplum/react";
import Link from "next/link";

function Layout({ children }: any) {
  const medplum = useMedplum();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="auto" p="md">
          <Button component={Link} href="/" mt="lg">
            Home
          </Button>
          <Button component={Link} href="/route1" mt="lg">
            Route 1
          </Button>
          <Button component={Link} href="/route2" mt="lg">
            Route 2
          </Button>
        </Navbar>
      }
      header={
        <Header height={60} p="sm">
          <Group position="apart">
            <Title order={4}>Welcome to Medplum &amp; Next.js!</Title>
            <Button onClick={() => medplum.signOut()}>Sign out</Button>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      fixed
    >
      {children}
    </AppShell>
  );
}

export default Layout;
