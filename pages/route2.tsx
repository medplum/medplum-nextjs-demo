import { Text } from "@mantine/core";
import { Container, useMedplum, useMedplumProfile } from "@medplum/react";
import Layout from "../components/Layout";

function Route2() {
  const medplum = useMedplum();
  const profile = useMedplumProfile();

  return (
    <>
      {profile && (
        <Layout>
          <Container mt="xl">
            <Text>Route 2</Text>
          </Container>
        </Layout>
      )}
    </>
  );
}

export default Route2;
