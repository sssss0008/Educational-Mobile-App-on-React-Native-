import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { User, BookOpen, Award, Bell, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun, Flame, CheckCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const streak = useStore((state) => state.streak);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Student Profile</Text>
      </View>

      {/* User Card */}
      <View style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>Alex Student</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>alex.student@edupro.io</Text>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>Pro Scholar</Text>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Flame color="#F59E0B" size={22} fill="#F59E0B" />
          <Text style={[styles.statValue, { color: colors.text }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <BookOpen color={colors.primary} size={22} />
          <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Award color={colors.success} size={22} />
          <Text style={[styles.statValue, { color: colors.text }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Certificates</Text>
        </View>
      </View>

      {/* Theme Toggle */}
      <View style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
          <Sun color="#D97706" size={20} />
        </View>
        <Text style={[styles.menuText, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: '#CBD5E1', true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Menu Options */}
      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Learning & Settings</Text>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/courses')}>
          <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
            <BookOpen color={colors.primary} size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Saved Courses</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/tutor')}>
          <View style={[styles.iconBox, { backgroundColor: '#D1FAE5' }]}>
            <Award color={colors.success} size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>My Tutors & Bookings</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/admin')}>
          <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
            <Shield color="#7C3AED" size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Admin Portal</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => alert('Help & Support')}>
          <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
            <HelpCircle color={colors.textSecondary} size={20} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
          <ChevronRight color={colors.textSecondary} size={18} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/onboarding')}>
        <LogOut color={colors.error} size={20} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

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
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
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
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 14,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 16,
  },
});
