import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  View,
  type ModalProps as RNModalProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../../providers/ThemeProvider';

export type ModalProps = RNModalProps & {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children, ...rest }) => {
  const { theme } = useTheme();

  return (
    <RNModal transparent animationType="fade" visible={visible} onRequestClose={onClose} {...rest}>
      <View style={styles.overlay}>
        <BlurView
          intensity={40}
          tint="dark"
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.overlay }]}
        />
        <Pressable accessibilityRole="button" style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.card,
              margin: theme.spacing.base,
              padding: theme.spacing.xl,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center' },
  content: { zIndex: 2 },
});

export default Modal;
