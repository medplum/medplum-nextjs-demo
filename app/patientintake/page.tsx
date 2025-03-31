'use client';

import { createReference, normalizeErrorString } from '@medplum/core';
import { Questionnaire, QuestionnaireResponse } from '@medplum/fhirtypes';
import { Document, QuestionnaireForm, useMedplum, useMedplumProfile } from '@medplum/react';
import { useCallback, useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { Loading } from '../../components/Loading';
import { useRouter } from 'next/navigation';

export default function Page(): JSX.Element {
  const router = useRouter();
  const medplum = useMedplum();
  const profile = useMedplumProfile();
  const [notFound, setNotFound] = useState(false);

  const [questionnaire, setQuestionnaire] = useState<Questionnaire | undefined>(undefined);

  useEffect(() => {
    medplum.readResource('Questionnaire', 'intake-questionnaire').then((questionnaire) => {
      setQuestionnaire(questionnaire);
    }).catch(() => {
      setNotFound(true);
    });
  }, [medplum]);

  const handleOnSubmit = useCallback(
    (response: QuestionnaireResponse) => {
      if (!questionnaire || !profile) {
        return;
      }

      medplum
        .createResource<QuestionnaireResponse>({
          ...response,
          author: createReference(profile),
        })
        .then(() => {
          showNotification({
            title: 'Success',
            message: 'Answers recorded',
          });
        })
        .catch((err) => {
          showNotification({
            color: 'red',
            title: 'Error',
            message: normalizeErrorString(err),
          });
        });
    },
    [medplum, router, questionnaire, profile]
  );

  if (notFound) {
    return <div>Patient Intake Questionnaire Not found</div>;
  }

  if (!questionnaire) {
    return <Loading />;
  }

  return (
    <Document width={800}>
      <QuestionnaireForm questionnaire={questionnaire} onSubmit={handleOnSubmit} />
    </Document>
  );
}
