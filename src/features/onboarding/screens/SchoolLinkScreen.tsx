import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../providers/ThemeProvider';
import { Input } from '../../../shared/components/ui/Input';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { OnboardingLayout } from '../components/OnboardingLayout';
import { findSchoolByCode, findSchools } from '../data/mockSchools';
import { setSchool, setStep } from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';
import type { OnboardingStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'SchoolLink'>;

const SchoolLinkScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { schoolId, schoolName } = useAppSelector(selectOnboarding);
  const [query, setQuery] = useState('');
  const [code, setCode] = useState('');
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState(findSchools(''));

  useEffect(() => {
    setResults(findSchools(debounced));
  }, [debounced]);

  useEffect(() => {
    if (code.length === 6) {
      const school = findSchoolByCode(code);
      if (school) dispatch(setSchool({ schoolId: school.id, schoolName: school.name }));
    }
  }, [code, dispatch]);

  return (
    <OnboardingLayout
      step={3}
      title="Link your school"
      continueDisabled={!schoolId}
      onContinue={() => {
        dispatch(setStep(4));
        navigation.navigate('ProfileCreation');
      }}
      footer={
        <Pressable
          onPress={() => {
            dispatch(setSchool(null));
            dispatch(setStep(4));
            navigation.navigate('ProfileCreation');
          }}
        >
          <Text style={{ color: theme.colors.textMuted, textAlign: 'center', marginBottom: 12, ...theme.typography.body }}>
            I&apos;ll add this later
          </Text>
        </Pressable>
      }
    >
      <Input label="Search school" value={query} onChangeText={setQuery} placeholder="School name or city" containerStyle={{ marginBottom: 12 }} />
      {results.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => dispatch(setSchool({ schoolId: s.id, schoolName: s.name }))}
          style={[styles.result, { borderBottomColor: theme.colors.border }]}
        >
          <Text style={{ color: theme.colors.text, ...theme.typography.bodyMedium }}>{s.name}</Text>
          <Text style={{ color: theme.colors.textMuted, ...theme.typography.caption }}>{s.city}</Text>
        </Pressable>
      ))}
      <Input
        label="Or enter school code"
        value={code}
        onChangeText={(t) => setCode(t.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))}
        autoCapitalize="characters"
        maxLength={6}
        containerStyle={{ marginTop: 16 }}
      />
      {schoolId ? (
        <View style={[styles.confirmed, { backgroundColor: `${theme.colors.success}22`, borderRadius: theme.radii.md, padding: theme.spacing.md, marginTop: 16 }]}>
          <Ionicons name="checkmark-circle" size={22} color={theme.colors.success} />
          <Text style={{ color: theme.colors.text, marginLeft: 8, ...theme.typography.bodyMedium }}>{schoolName}</Text>
        </View>
      ) : null}
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  result: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  confirmed: { flexDirection: 'row', alignItems: 'center' },
});

export default SchoolLinkScreen;
