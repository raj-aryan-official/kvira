import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here we could report to Sentry
    // Sentry.captureException(error);
  }

  private handleRestart = () => {
    // In a real app we might use Updates.reloadAsync() from expo-updates
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Ionicons name="warning" size={64} color="#EF4444" />
            <Text style={styles.title}>Oops! Something went wrong.</Text>
            <Text style={styles.subtitle}>We've encountered an unexpected error. Don't worry, your progress is safe.</Text>
            
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{this.state.error?.message}</Text>
            </View>

            <TouchableOpacity style={styles.restartBtn} onPress={this.handleRestart}>
              <Text style={styles.restartBtnText}>Restart App</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 24, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32, lineHeight: 24 },
  errorBox: { backgroundColor: '#FEE2E2', padding: 16, borderRadius: 12, width: '100%', marginBottom: 32 },
  errorText: { color: '#B91C1C', fontFamily: 'monospace', fontSize: 12 },
  restartBtn: { backgroundColor: '#4F46E5', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12 },
  restartBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
