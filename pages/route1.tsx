import { Text } from "@mantine/core";
import { Container, useMedplum, useMedplumProfile } from "@medplum/react";
import Layout from "../components/Layout";

function Route1() {
  const medplum = useMedplum();
  const profile = useMedplumProfile();

  return (
    <>
      {profile && (
        <Layout>
          <Container mt="xl">
            <Text>Route 1</Text>
          </Container>
        </Layout>
      )}
    </>
  );
}

export default Route1;
