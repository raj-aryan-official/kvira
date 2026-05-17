import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'GroupCreationScreen'>;

export default function GroupCreationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Private Study Group');
  const [msgPerm, setMsgPerm] = useState('Everyone Can Message');
  const [joinPerm, setJoinPerm] = useState('Invite Only');

  const types = ['School Group', 'Class Group', 'Subject Group', 'Private Study Group', 'Competition Group'];
  const msgPerms = ['Only Admin Can Message', 'Admins and Moderators', 'Everyone Can Message'];
  const joinPerms = ['Public Anyone Can Join', 'School Only', 'Invite Only'];

  const handleCreate = () => {
    // Generate code logic normally in backend
    const code = 'X8F9A2';
    // Success, go back or to the group
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Group Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="E.g. Class 10 Math Wizards"
          maxLength={50}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.charCount}>{name.length}/50</Text>

        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="What is this group about?"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Group Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {types.map(t => (
            <TouchableOpacity 
              key={t} 
              style={[styles.pill, type === t && styles.pillActive]}
              onPress={() => setType(t)}
            >
              <Text style={[styles.pillText, type === t && styles.pillTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Message Permissions</Text>
        {msgPerms.map(p => (
          <TouchableOpacity key={p} style={styles.radioRow} onPress={() => setMsgPerm(p)}>
            <View style={[styles.radio, msgPerm === p && styles.radioActive]} />
            <Text style={styles.radioText}>{p}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Join Permissions</Text>
        {joinPerms.map(p => (
          <TouchableOpacity key={p} style={styles.radioRow} onPress={() => setJoinPerm(p)}>
            <View style={[styles.radio, joinPerm === p && styles.radioActive]} />
            <Text style={styles.radioText}>{p}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Text style={styles.createBtnText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  form: { padding: 16 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 16, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  charCount: { textAlign: 'right', fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  scrollRow: { marginHorizontal: -16, paddingHorizontal: 16 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#D1D5DB', marginRight: 8, marginBottom: 8 },
  pillActive: { backgroundColor: '#EEF2FF', borderColor: '#4F46E5' },
  pillText: { color: '#4B5563' },
  pillTextActive: { color: '#4F46E5', fontWeight: 'bold' },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#D1D5DB', marginRight: 12 },
  radioActive: { borderColor: '#4F46E5', backgroundColor: '#4F46E5', borderWidth: 6 },
  radioText: { fontSize: 16, color: '#374151' },
  createBtn: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32, marginBottom: 40 },
  createBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
