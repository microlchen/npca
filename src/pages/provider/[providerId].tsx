import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { getPatients } from '@/data/data';
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Patient } from '@/types/users';

function handleListItemClick(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  patient: Patient,
  router: NextRouter
) {
  router.push(`/patient/${patient.uuid}`);
}

function patientList(router: NextRouter) {
  const patients = getPatients(router.query['providerId'] as string);
  const listItems = patients?.map((patient) => (
    <ListItemButton
      key={patient.uuid}
      onClick={(event) => handleListItemClick(event, patient, router)}
    >
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary={patient.name} />
    </ListItemButton>
  ));

  return <List>{listItems}</List>;
}

export default function Login() {
  const router = useRouter();
  return patientList(router);
}
