import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'GroupSearchScreen'>;

export default function GroupSearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const renderResult = () => (
    <View style={styles.resultCard}>
      <View style={styles.iconBox}><Ionicons name="school" size={24} color="#4F46E5" /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>Kendriya Vidyalaya Alumni</Text>
        <Text style={styles.meta}>School Group • 342 members</Text>
      </View>
      <TouchableOpacity style={styles.joinBtn}>
        <Text style={styles.joinBtnText}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput 
            style={styles.input}
            placeholder="Search groups by name, board, class..."
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
      </View>

      <FlatList
        data={query.length > 2 ? [1,2,3] : []}
        keyExtractor={(i) => i.toString()}
        renderItem={renderResult}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          query.length > 2 ? (
            <Text style={styles.emptyText}>No groups found</Text>
          ) : (
            <Text style={styles.emptyText}>Type at least 3 characters to search</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12 },
  input: { flex: 1, paddingVertical: 12, marginLeft: 8, fontSize: 16 },
  resultCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  meta: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  joinBtn: { backgroundColor: '#EEF2FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  joinBtnText: { color: '#4F46E5', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 40 },
});
