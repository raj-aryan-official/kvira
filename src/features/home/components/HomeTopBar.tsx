import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../../providers/ThemeProvider';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { Badge } from '../../../shared/components/ui/Badge';
import type { MainTabParamList } from '../../../navigation/types';

type Props = {
  greeting: string;
  name: string;
  unreadCount: number;
  streak: number;
  onStreakPress: () => void;
};

const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export const HomeTopBar: React.FC<Props> = ({
  name,
  unreadCount,
  streak,
  onStreakPress,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <View style={[styles.bar, { paddingHorizontal: theme.spacing.base, paddingVertical: theme.spacing.md, backgroundColor: theme.colors.background }]}>
      <Pressable onPress={() => navigation.navigate('Profile')} style={styles.left}>
        <Avatar size="md" mode="initials" initials={name.slice(0, 2)} />
        <View style={{ marginLeft: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.textMuted, ...theme.typography.caption }}>{getGreeting()}</Text>
          <Text style={{ color: theme.colors.text, ...theme.typography.h3 }}>{name}</Text>
        </View>
      </Pressable>
      <View style={styles.right}>
        <Pressable onPress={onStreakPress} style={[styles.streak, { backgroundColor: `${theme.colors.accentYellow}33` }]}>
          <Text>🔥</Text>
          <Text style={{ color: theme.colors.accentYellow, fontWeight: '700', marginLeft: 4 }}>{streak}</Text>
        </Pressable>
        <Pressable style={styles.bell}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
          {unreadCount > 0 ? (
            <View style={styles.badgeWrap}>
              <Badge label={String(unreadCount)} variant="error" />
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  streak: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  bell: { padding: 4 },
  badgeWrap: { position: 'absolute', top: -4, right: -8 },
});

export default HomeTopBar;
