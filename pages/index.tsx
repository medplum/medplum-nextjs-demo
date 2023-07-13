import { Title, Group, Card } from "@mantine/core";
import {
  Container,
  ResourceTable,
  SignInForm,
  useMedplum,
  useMedplumProfile,
} from "@medplum/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

// Medplum can autodetect Google Client ID from origin, but only if using window.location.host.
// Because window.location.host is not available on the server, we must use a constant value.
// This is a pre-defined Google Client ID for localhost:3000.
// You will need to register your own Google Client ID for your own domain.
const googleClientId =
  "921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com";

// Replace with your Medplum Project ID in env
const projectId = process.env.NEXT_PUBLIC_MEDPLUM_PROJECT_ID as string;

function IndexPage() {
  const medplum = useMedplum();
  const profile = useMedplumProfile();

  const navigate = useRouter();

  return (
    <>
      {!profile && (
        <>
          <Container p="xl">
            <Group position="center">
              <Title order={2} mt="xl">
                Welcome to Medplum &amp; Next.js!
              </Title>
            </Group>
            <SignInForm
              projectId={projectId}
              googleClientId={googleClientId}
              onSuccess={() => {
                navigate.replace("/");
              }}
            />
          </Container>
        </>
      )}
      {profile && (
        <>
          <Layout>
            <Container mt="xl">
              <Title order={3} my="xl">
                Profile
              </Title>
              <Card withBorder radius="sm" p="xl">
                <ResourceTable value={profile} ignoreMissingValues />
              </Card>
            </Container>
          </Layout>
        </>
      )}
    </>
  );
}

export default IndexPage;
