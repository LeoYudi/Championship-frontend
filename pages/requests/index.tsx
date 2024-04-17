import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PlayersField from '@/components/PlayersField';

import api from '@/services/api';

import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { useNotification } from '@/contexts/notification';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function NewRequest() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [formattedPlayers, setFormattedPlayers] = useState<FormattedPlayerType[]>([]);

  const [selectedPlayer, setSelectedPlayer] = useState<FormattedPlayerType>();

  const [placement, setPlacement] = useState('');

  const [loading, setLoading] = useState(false);

  const { notificate } = useNotification();

  const router = useRouter();

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
    <div className='requests-page'>
      <Head>
        <title>Pedido</title>
      </Head>

      <div className='header-menu'>
        <div className='back-button' onClick={() => { router.push('/leaderboard') }}>
          <Typography variant='h4'>
            <ArrowBackIcon />
          </Typography>
        </div>

        <div className='title'>
          Enviar colocação
        </div>
      </div>

      <div className='container'>
        <PlayersField
          label='Nome do jogador'
          loading={loading}
          options={formattedPlayers}
          onChange={values => {
            if (!Array.isArray(values))
              setSelectedPlayer(values as FormattedPlayerType)
          }}
        />

        <Autocomplete
          options={Array.from({ length: 12 }, (_, i) => `${i + 1}`)}
          value={placement}
          onChange={(e, value) => { setPlacement(value ? value : '') }}
          fullWidth
          disabled={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Colocação'}
              rows={3}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />

        <Button variant='contained' color='primary' disabled={loading} onClick={async () => {
          setLoading(true);
          const response = await api.post('/requests', { id_player: selectedPlayer?.data._id, placement: +placement });

          if (response.msg)
            notificate(response.msg, 'warning');
          else if (response.error)
            notificate(response.error, 'error');
          else
            notificate('Pedido enviado', 'success');

          setLoading(false);
        }}>
          <Typography fontWeight={'bold'}>
            Enviar
          </Typography>
        </Button>
      </div>
    </div>
  );
}