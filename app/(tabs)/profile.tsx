import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { User, BookOpen, Award, Bell, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun, Flame, CheckCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const streak = useStore((state) => state.streak);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Student Profile</Text>
      </View>

      {/* User Card */}
      <View style={styles.userCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Alex Student</Text>
          <Text style={styles.userEmail}>alex.student@edupro.io</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Pro Scholar</Text>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Flame color="#F59E0B" size={22} fill="#F59E0B" />
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <BookOpen color={Colors.primary} size={22} />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Award color="#059669" size={22} />
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>
      </View>

      {/* Theme Toggle */}
      <View style={styles.menuItem}>
        <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
          <Sun color="#D97706" size={20} />
        </View>
        <Text style={styles.menuText}>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: '#CBD5E1', true: Colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Menu Options */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Learning & Settings</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => alert('Saved Courses')}>
          <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
            <BookOpen color={Colors.primary} size={20} />
          </View>
          <Text style={styles.menuText}>Saved Courses</Text>
          <ChevronRight color={Colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/tutor')}>
          <View style={[styles.iconBox, { backgroundColor: '#D1FAE5' }]}>
            <Award color="#059669" size={20} />
          </View>
          <Text style={styles.menuText}>My Tutors & Bookings</Text>
          <ChevronRight color={Colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => alert('Notifications')}>
          <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
            <Bell color="#D97706" size={20} />
          </View>
          <Text style={styles.menuText}>Notifications</Text>
          <ChevronRight color={Colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/admin')}>
          <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
            <Shield color="#7C3AED" size={20} />
          </View>
          <Text style={styles.menuText}>Admin Portal</Text>
          <ChevronRight color={Colors.textSecondary} size={18} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => alert('Help & Support')}>
          <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
            <HelpCircle color="#64748B" size={20} />
          </View>
          <Text style={styles.menuText}>Help & Support</Text>
          <ChevronRight color={Colors.textSecondary} size={18} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/')}>
        <LogOut color={Colors.error} size={20} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    color: Colors.text,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: Colors.border,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.text,
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
    color: Colors.error,
    fontWeight: '700',
    fontSize: 16,
  },
});
