'use client';

import { useRouter } from 'next/navigation';

import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './styles.scss';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className='not-found-page'>
      <h1>
        Para de fuçar ou vai ser desclassificado 😠
      </h1>

      <Button className='back-button' variant='outlined' onClick={() => { router.push('/leaderboard') }}>
        <ArrowBackIcon /> Voltar
      </Button>
    </div>
  )
}