import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type ToastVariant = 'info' | 'success' | 'error';

type ToastMessage = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ToastItem: React.FC<{ toast: ToastMessage; onHide: (id: string) => void }> = ({
  toast,
  onHide,
}) => {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
        onHide(toast.id),
      );
    }, 2800);
    return () => clearTimeout(timer);
  }, [onHide, opacity, toast.id]);

  const backgroundColor =
    toast.variant === 'success'
      ? theme.colors.accentTeal
      : toast.variant === 'error'
        ? theme.colors.error
        : theme.colors.primary;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          backgroundColor,
          borderRadius: theme.radii.md,
          marginBottom: theme.spacing.sm,
          paddingHorizontal: theme.spacing.base,
          paddingVertical: theme.spacing.md,
        },
      ]}
    >
      <Text style={{ color: theme.colors.white, ...theme.typography.bodyMedium }}>{toast.message}</Text>
    </Animated.View>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message: string, variant: ToastVariant = 'info') => {
    setToasts((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, message, variant }]);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="box-none" style={styles.host}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={hide} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const Toast: React.FC = () => null;

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 48,
    zIndex: 9999,
  },
  toast: { alignSelf: 'stretch' },
});

export default Toast;
