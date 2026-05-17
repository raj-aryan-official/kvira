import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    setNotifications([]);
  }, []);

  return notifications;
};

export default useNotifications;
