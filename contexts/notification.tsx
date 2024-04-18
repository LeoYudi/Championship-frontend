import { Alert, AlertProps, Snackbar } from '@mui/material';
import { ReactNode, createContext, useContext, useState } from 'react';

type NotificationContextType = {
  notificate: (message: string, severity: AlertProps['severity']) => void,
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>();

  const notificate = (message: string, severity: AlertProps['severity']) => {
    setIsOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  return (
    <NotificationContext.Provider value={{ notificate }}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => setIsOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ marginTop: '80px' }}>
        <Alert severity={severity} variant='filled' onClose={() => setIsOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}