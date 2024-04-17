import Head from 'next/head';
import { useEffect, useState } from 'react';

import PlayersField from '@/components/PlayersField';

import api from '@/services/api';

import { Button, Typography } from '@mui/material';
import { useNotification } from '@/contexts/notification';

import './styles.scss'

type PlayerType = {
  _id: string,
  name: string,
  score: number,
}

type FormattedPlayerType = {
  label: string,
  data: {
    _id: string,
    name: string,
    score: number
  }
}

export default function Players() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [formattedPlayers, setFormattedPlayers] = useState<FormattedPlayerType[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const [newPlayers, setNewPlayers] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const { notificate } = useNotification()

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/players');
      setPlayers(response);
      setFormattedPlayers(response.map((player: PlayerType) => ({
        label: player.name,
        data: player
      })));
      setLoading(false);
    })();
  }, []);

  return (
    <div className='dashbopard-players-page'>
      <Head>
        <title>Jogadores</title>
      </Head>

      <div className='container'>
        <PlayersField
          label='Remover jogadores'
          loading={loading}
          multiple
          options={formattedPlayers}
          onChange={values => {
            if (Array.isArray(values))
              setSelectedPlayers((values as FormattedPlayerType[]).map(value => value.data._id))
            else
              setSelectedPlayers([(values as FormattedPlayerType).data._id])
          }}
        />

        <Button variant='contained' color='error' disabled={loading} onClick={async () => {
          setLoading(true);
          const response = await api.post('/players/remove', { ids: selectedPlayers });
          notificate(response.msg, 'success');
          setLoading(false);
        }}>
          <Typography fontWeight={'bold'}>
            Deletar
          </Typography>
        </Button>
      </div>

      <div className='container'>
        <PlayersField
          freeSolo
          label='Adicionar jogadores'
          loading={loading}
          multiple
          options={[]}
          onChange={values => {
            if (Array.isArray(values))
              setNewPlayers(values as string[]);
            else
              setNewPlayers([(values as string)]);
          }}
        />

        <Button variant='contained' color='primary' disabled={loading} onClick={async () => {
          setLoading(true);
          const response = await api.post('/players', { names: newPlayers });
          notificate(response.msg, 'success');
          setLoading(false);
        }}>
          <Typography fontWeight={'bold'}>
            Adicionar
          </Typography>
        </Button>
      </div>
    </div>
  );
}