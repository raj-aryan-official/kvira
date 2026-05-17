import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useTheme } from '../../../providers/ThemeProvider';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarMode = 'photo' | 'initials' | 'character';

export type AvatarProps = {
  size?: AvatarSize;
  mode?: AvatarMode;
  source?: ImageSourcePropType;
  initials?: string;
  characterEmoji?: string;
};

const INITIAL_BACKGROUNDS = ['avatarKids', 'avatarJunior', 'avatarSenior'] as const;

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  mode = 'initials',
  source,
  initials = '?',
  characterEmoji = '🦊',
}) => {
  const { theme, mode: themeMode } = useTheme();
  const bounce = useRef(new Animated.Value(1)).current;
  const dimension = theme.sizes.avatar[size];

  const backgroundColor = useMemo(() => {
    const key = INITIAL_BACKGROUNDS[initials.charCodeAt(0) % INITIAL_BACKGROUNDS.length];
    return theme.colors[key];
  }, [initials, theme.colors]);

  useEffect(() => {
    if (themeMode !== 'kids' || mode !== 'character') return undefined;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.spring(bounce, { toValue: 1.08, useNativeDriver: true, friction: 4 }),
        Animated.spring(bounce, { toValue: 1, useNativeDriver: true, friction: 4 }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bounce, mode, themeMode]);

  const content = useMemo(() => {
    if (mode === 'photo' && source) {
      return <Image source={source} style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }} />;
    }
    if (mode === 'character' && themeMode === 'kids') {
      return (
        <Animated.Text
          style={[
            styles.character,
            { fontSize: dimension * 0.5, transform: [{ scale: bounce }] },
          ]}
        >
          {characterEmoji}
        </Animated.Text>
      );
    }
    return (
      <Text
        style={[
          styles.initials,
          {
            color: theme.colors.white,
            fontSize: dimension * 0.38,
            fontWeight: theme.typography.label.fontWeight,
          },
        ]}
      >
        {initials.slice(0, 2).toUpperCase()}
      </Text>
    );
  }, [bounce, characterEmoji, dimension, initials, mode, source, theme, themeMode]);

  if (mode === 'photo' && source) {
    return (
      <View style={[styles.wrap, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}>
        {content}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrap,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: mode === 'character' && themeMode === 'kids' ? theme.colors.accentYellow : backgroundColor,
        },
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  initials: { fontWeight: '700' },
  character: { textAlign: 'center' },
});

export default Avatar;
