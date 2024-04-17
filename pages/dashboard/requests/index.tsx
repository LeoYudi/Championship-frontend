import { useEffect, useState } from 'react'
import Head from 'next/head';

import api from '@/services/api';

import { useNotification } from '@/contexts/notification';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import './styles.scss'
import { Typography } from '@mui/material';

type RequestType = {
  _id: string,
  id_player: string,
  player: string,
  placement: number,
  created_at: string,
}

export default function Requests() {
  const [requests, setRequests] = useState<RequestType[]>([]);

  const [loading, setLoading] = useState(false);

  const { notificate } = useNotification();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/requests');
      setRequests(response);
      setLoading(false);
    })();
  }, []);

  return (
    <div className='dashboard-requests-page'>
      <Head>
        <title>Pedidos</title>
      </Head>

      <div className='container'>
        <div className='row header'>
          <div className='index'>ID</div>
          <div className='player'>Jogador</div>
          <div className='placement'>Lugar</div>
          <div className='actions'>Opções</div>
        </div>

        {!!requests.length && requests.map((request, index) => (
          <div className='row'>
            <div className='index'>{index + 1}</div>
            <div className='player'>{request.player}</div>
            <div className='placement'>{request.placement}º</div>
            <div className='actions'>
              <div
                className='action accept'
                onClick={async () => {
                  if (!loading) {
                    const response = await api.post(`/requests/accept/${request._id}`, {});
                    notificate(response.msg, 'info');
                  }
                }}
              >
                <CheckIcon color='success' />
              </div>
              <div
                className='action remove'
                onClick={async () => {
                  if (!loading) {
                    const response = await api.delete(`/requests/remove/${request._id}`);
                    notificate(response.msg, 'info');
                  }
                }}
              >
                <CloseIcon color='error' />
              </div>
            </div>
          </div>
        ))}

        {!requests.length && <div className='empty-row'>Nenhum pedido pendente</div>}
      </div>
    </div>
  );
}