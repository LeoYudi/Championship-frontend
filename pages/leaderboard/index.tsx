import Head from 'next/head';
import { useRouter } from 'next/router';

import { createRef, useEffect, useState } from 'react';

import { Button, Skeleton } from '@mui/material';

import api from '@/services/api';
import { AnimatedPositions } from '@/components/AnimatedPositions';
import { Position } from '@/components/Position';

import './styles.scss'

type PlayerType = {
  _id: string,
  name: string,
  score: number,
}

export default function Leaderboard() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/leaderboard');
      setPlayers(response);
      setLoading(false);
    })();

    const interval = setInterval(
      (async () => {
        setLoading(true);
        const response = await api.get('/leaderboard');
        setPlayers(response);
        setLoading(false);
      }),
      15000
    )

    return () => { clearInterval(interval) }
  }, [])

  return (
    <div className='leaderboard-page'>
      <Head>
        <title>Leaderboard</title>
      </Head>

      <div className='header-menu'>
        <div className='title'>
          Leaderboard
        </div>

      </div>

      <div className='container'>
        {players.length === 0 && <>
          <Skeleton width={'100%'} height={'3rem'} />
          <Skeleton width={'100%'} height={'3rem'} />
          <Skeleton width={'100%'} height={'3rem'} />
          <Skeleton width={'100%'} height={'3rem'} />
        </>}
        {players.length !== 0 &&
          <AnimatedPositions>
            {players.map((player, index) => (
              <Position
                key={player.name}
                name={player.name}
                placement={index + 1}
                score={player.score}
                ref={createRef()}
              />
            ))}
          </AnimatedPositions>
        }
      </div>

      <div className='footer-cta'>
        <Button variant='contained' fullWidth onClick={() => { router.push('/requests') }}>
          Enviar colocação
        </Button>
      </div>
    </div>
  )
}