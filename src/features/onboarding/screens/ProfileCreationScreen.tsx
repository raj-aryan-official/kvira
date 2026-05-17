import React, { useState } from 'react';
import { ActionSheetIOS, Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { Input } from '../../../shared/components/ui/Input';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { setDisplayName, setProfilePhoto, setStep } from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';
import type { OnboardingStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ProfileCreation'>;

const ProfileCreationScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { displayName, profilePhoto } = useAppSelector(selectOnboarding);
  const [bio, setBio] = useState('');

  const pickImage = async (fromCamera: boolean) => {
    const perm = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      dispatch(setProfilePhoto(result.assets[0].uri));
    }
  };

  const openSheet = () => {
    const options = ['Take Photo', 'Choose from Gallery', 'Pick an Avatar', 'Cancel'];
  const handlers = [
      () => pickImage(true),
      () => pickImage(false),
      () => dispatch(setProfilePhoto('avatar:fox')),
      () => {},
    ];
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({ options, cancelButtonIndex: 3 }, (i) => handlers[i]?.());
    } else {
      Alert.alert('Profile photo', undefined, [
        { text: 'Take Photo', onPress: handlers[0] },
        { text: 'Gallery', onPress: handlers[1] },
        { text: 'Avatar', onPress: handlers[2] },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  return (
    <OnboardingLayout
      step={4}
      title="Create your profile"
      continueDisabled={displayName.trim().length < 2}
      onContinue={() => {
        dispatch(setStep(5));
        navigation.navigate('SubjectInterests');
      }}
    >
      <Pressable onPress={openSheet} style={styles.avatarWrap}>
        {profilePhoto && !profilePhoto.startsWith('avatar:') ? (
          <Avatar size="xl" mode="photo" source={{ uri: profilePhoto }} />
        ) : (
          <Avatar size="xl" mode="character" characterEmoji="🦊" />
        )}
        <View style={[styles.camera, { backgroundColor: theme.colors.primary }]}>
          <Ionicons name="camera" size={18} color={theme.colors.white} />
        </View>
      </Pressable>
      <Input
        label="Display name"
        value={displayName}
        onChangeText={(t) => dispatch(setDisplayName(t.slice(0, 30)))}
        maxLength={30}
        containerStyle={{ marginTop: 16 }}
      />
      <View style={[styles.preview, { backgroundColor: theme.colors.cardFlatBackground, borderRadius: theme.radii.md, padding: theme.spacing.md, marginTop: 12 }]}>
        <Text style={{ color: theme.colors.textMuted, ...theme.typography.caption }}>Leaderboard preview</Text>
        <Text style={{ color: theme.colors.text, ...theme.typography.bodyMedium, marginTop: 4 }}>
          {displayName.trim() || 'Your name'} · Rank —
        </Text>
      </View>
      <Input label="Bio (optional)" value={bio} onChangeText={(t) => setBio(t.slice(0, 60))} maxLength={60} multiline containerStyle={{ marginTop: 12 }} />
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  avatarWrap: { alignSelf: 'center' },
  camera: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {},
});

export default ProfileCreationScreen;
