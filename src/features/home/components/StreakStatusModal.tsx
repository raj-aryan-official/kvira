import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';
import { Modal } from '../../../shared/components/ui/Modal';

type Props = { visible: boolean; streak: number; onClose: () => void };

export const StreakStatusModal: React.FC<Props> = ({ visible, streak, onClose }) => {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={{ fontSize: 48, textAlign: 'center' }}>🔥</Text>
      <Text style={{ color: theme.colors.text, ...theme.typography.h2, textAlign: 'center', marginTop: 12 }}>
        {streak} day streak!
      </Text>
      <Text style={{ color: theme.colors.textMuted, ...theme.typography.body, textAlign: 'center', marginTop: 8 }}>
        Keep practicing daily to grow your streak.
      </Text>
    </Modal>
  );
};

export default StreakStatusModal;
