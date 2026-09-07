import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Switch, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { User, BookOpen, Award, Bell, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun, Flame, CheckCircle, Download, Zap, X } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const streak = useStore((state) => state.streak);
  const certificates = useStore((state) => state.certificates);
  const offlineCourses = useStore((state) => state.offlineCourses);
  const flashcardMastery = useStore((state) => state.flashcardMastery);
  const adminCourses = useStore((state) => state.adminCourses);

  // Modals for elite features
  const [showCertVault, setShowCertVault] = useState(false);
  const [showOfflineVault, setShowOfflineVault] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const downloadedCoursesList = adminCourses.filter(c => offlineCourses.includes(c.id));
  const earnedCertsList = adminCourses.filter(c => certificates.includes(c.id));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Scholar Profile & Vault</Text>
      </View>

      {/* User Card */}
      <View style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>Alex Student</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>alex.student@edupro.io</Text>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>Elite Pro Scholar 🌟</Text>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/quiz')}>
          <Flame color="#F59E0B" size={22} fill="#F59E0B" />
          <Text style={[styles.statValue, { color: colors.text }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowCertVault(true)}>
          <Award color={colors.success} size={22} />
          <Text style={[styles.statValue, { color: colors.text }]}>{certificates.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Certificates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowOfflineVault(true)}>
          <Download color={colors.primary} size={22} />
          <Text style={[styles.statValue, { color: colors.text }]}>{offlineCourses.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Offline Vault</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Toggle */}
      <View style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
          <Sun color="#D97706" size={20} />
        </View>
        <Text style={[styles.menuText, { color: colors.text }]}>Dark Mode Engine</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: '#CBD5E1', true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Menu Options */}
      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Elite Learning Hub</Text>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowCertVault(true)}>
          <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
            <Award color={colors.primary} size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>My Certificates Vault ({certificates.length})</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowOfflineVault(true)}>
          <View style={[styles.iconBox, { backgroundColor: '#D1FAE5' }]}>
            <Download color={colors.success} size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Downloaded Offline Courses ({offlineCourses.length})</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowStatsModal(true)}>
          <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
            <Zap color="#D97706" size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>SM-2 Quiz Mastery Analytics</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/admin')}>
          <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
            <Shield color="#7C3AED" size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Admin Master Portal</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/onboarding')}>
        <LogOut color={colors.error} size={20} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Certificates Vault Modal */}
      <Modal visible={showCertVault} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>🎓 Earned Certificates Vault</Text>
              <TouchableOpacity onPress={() => setShowCertVault(false)}>
                <X color={colors.text} size={22} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ gap: 10 }}>
              {earnedCertsList.map(c => (
                <View key={c.id} style={[styles.vaultItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Award color={colors.primary} size={24} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.vaultItemTitle, { color: colors.text }]}>{c.title}</Text>
                    <Text style={[styles.vaultItemSub, { color: colors.success }]}>Verified Coursera Distinction</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Offline Vault Modal */}
      <Modal visible={showOfflineVault} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>📥 Downloaded Offline Courses</Text>
              <TouchableOpacity onPress={() => setShowOfflineVault(false)}>
                <X color={colors.text} size={22} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ gap: 10 }}>
              {downloadedCoursesList.map(c => (
                <View key={c.id} style={[styles.vaultItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Download color={colors.success} size={24} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.vaultItemTitle, { color: colors.text }]}>{c.title}</Text>
                    <Text style={[styles.vaultItemSub, { color: colors.textSecondary }]}>Available offline • {c.duration}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SM-2 Quiz Analytics Modal */}
      <Modal visible={showStatsModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>⚡ SM-2 Memory Analytics</Text>
              <TouchableOpacity onPress={() => setShowStatsModal(false)}>
                <X color={colors.text} size={22} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>
              Your spaced repetition memory retention score is in the top 5% of active scholars!
            </Text>
            {Object.keys(flashcardMastery).length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No quizzes taken yet. Start a practice quiz to build your SM-2 profile.</Text>
            ) : (
              Object.entries(flashcardMastery).map(([quizId, grade]) => (
                <View key={quizId} style={[styles.vaultItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Zap color="#F59E0B" size={22} fill="#F59E0B" />
                  <Text style={[styles.vaultItemTitle, { color: colors.text, marginLeft: 10, flex: 1 }]}>Quiz {quizId}</Text>
                  <Text style={{ fontWeight: '800', color: colors.primary }}>Grade: {grade}/5</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </Modal>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  userCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 14,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '800',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    maxHeight: '80%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  modalDesc: {
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  vaultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  vaultItemTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  vaultItemSub: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
});
