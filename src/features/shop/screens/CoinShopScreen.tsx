import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { spendCoins } from '../../gamification/store/gamificationSlice';
import { addOwnedItem, incrementShields } from '../store/shopSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopItem } from '../store/shopSlice';

type Props = NativeStackScreenProps<any, 'CoinShopScreen'>;

export default function CoinShopScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.gamification);
  const { items, ownedItemIds, shieldCount } = useSelector((state: RootState) => state.shop);

  const [activeTab, setActiveTab] = useState('Avatars');
  const tabs = ['Avatars', 'Themes', 'Borders', 'Shields'];

  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const displayedItems = items.filter(i => i.category === activeTab);

  const handlePurchase = () => {
    if (!selectedItem) return;
    
    if (coins < selectedItem.price) {
      Alert.alert("Not enough coins", `You need ${selectedItem.price - coins} more coins.`);
      return;
    }

    if (selectedItem.category === 'Shields' && shieldCount >= 3) {
      Alert.alert("Max Shields Reached", "You can only hold a maximum of 3 shields.");
      return;
    }

    // Process purchase
    dispatch(spendCoins(selectedItem.price));
    if (selectedItem.category === 'Shields') {
      dispatch(incrementShields());
    } else {
      dispatch(addOwnedItem(selectedItem.id));
    }
    
    setModalVisible(false);
    Alert.alert("Success!", "Item unlocked.");
  };

  const renderCard = (item: ShopItem) => {
    const isOwned = ownedItemIds.includes(item.id);

    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.card}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.previewUrl }} style={styles.previewImage} />
        </View>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        
        {isOwned ? (
          <View style={styles.ownedBadge}>
            <Text style={styles.ownedText}>OWNED</Text>
          </View>
        ) : (
          <View style={styles.pricePill}>
            <Ionicons name="logo-bitcoin" size={12} color="#F59E0B" />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.coinBalanceContainer}>
          <Ionicons name="logo-bitcoin" size={32} color="#F59E0B" />
          <Text style={styles.coinBalanceText}>{coins}</Text>
        </View>
        <Text style={styles.headerTitle}>Coins</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Exam Season Collection</Text>
          <Text style={styles.bannerSubtitle}>Get 20% off all Themes!</Text>
        </View>

        <View style={styles.tabsRow}>
          {tabs.map(t => (
            <TouchableOpacity 
              key={t} 
              style={[styles.tab, activeTab === t && styles.tabActive]}
              onPress={() => setActiveTab(t)}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Shields' && (
          <View style={styles.shieldStatusContainer}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            <Text style={styles.shieldStatusText}>Shield {shieldCount} of 3 owned</Text>
          </View>
        )}

        <View style={styles.grid}>
          {displayedItems.map(renderCard)}
        </View>
      </ScrollView>

      {/* Bottom Sheet Modal Mock */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            {selectedItem && (
              <>
                <Image source={{ uri: selectedItem.previewUrl }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalDesc}>{selectedItem.description}</Text>
                
                {ownedItemIds.includes(selectedItem.id) ? (
                  <View style={styles.modalOwnedBtn}>
                    <Text style={styles.modalOwnedBtnText}>Already Owned</Text>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={[styles.buyBtn, coins < selectedItem.price && styles.buyBtnDisabled]} 
                    disabled={coins < selectedItem.price}
                    onPress={handlePurchase}
                  >
                    <Text style={styles.buyBtnText}>
                      {coins >= selectedItem.price ? `Purchase for ${selectedItem.price} Coins` : `Need ${selectedItem.price - coins} more coins`}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { alignItems: 'center', backgroundColor: 'white', padding: 24, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backBtn: { position: 'absolute', top: 60, left: 16 },
  coinBalanceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  coinBalanceText: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginLeft: 8 },
  headerTitle: { fontSize: 16, color: '#6B7280', fontWeight: 'bold', textTransform: 'uppercase' },
  content: { padding: 16 },
  banner: { backgroundColor: '#4F46E5', borderRadius: 16, padding: 24, marginBottom: 24, alignItems: 'center' },
  bannerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  bannerSubtitle: { color: '#A5B4FC', fontSize: 14 },
  tabsRow: { flexDirection: 'row', marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#F59E0B' },
  tabText: { color: '#6B7280', fontWeight: 'bold' },
  tabTextActive: { color: '#F59E0B' },
  shieldStatusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECFDF5', padding: 12, borderRadius: 12, marginBottom: 24 },
  shieldStatusText: { color: '#047857', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: 'white', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  imageContainer: { width: 80, height: 80, backgroundColor: '#F3F4F6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  previewImage: { width: 60, height: 60 },
  itemName: { fontSize: 13, fontWeight: 'bold', color: '#111827', marginBottom: 8, textAlign: 'center' },
  pricePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  priceText: { color: '#D97706', fontWeight: 'bold', fontSize: 12, marginLeft: 4 },
  ownedBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  ownedText: { color: '#6B7280', fontWeight: 'bold', fontSize: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center' },
  modalImage: { width: 160, height: 160, marginBottom: 24 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  modalDesc: { textAlign: 'center', color: '#6B7280', marginBottom: 32, lineHeight: 22 },
  buyBtn: { backgroundColor: '#F59E0B', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  buyBtnDisabled: { backgroundColor: '#D1D5DB' },
  buyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalOwnedBtn: { backgroundColor: '#F3F4F6', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  modalOwnedBtnText: { color: '#6B7280', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  cancelBtnText: { color: '#374151', fontWeight: 'bold', fontSize: 16 },
});
