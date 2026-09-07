import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { Flame, Bell, Search, BookOpen, Award, Users, Play, Sparkles, Clock, CheckCircle2, Bookmark, X, ArrowRight, Zap } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const streak = useStore((state) => state.streak);
  const adminAnnouncements = useStore((state) => state.adminAnnouncements);
  const adminCourses = useStore((state) => state.adminCourses);

  const [showNotifModal, setShowNotifModal] = useState(false);
  const notifications = useStore((state) => state.notifications);
  const markNotificationRead = useStore((state) => state.markNotificationRead);

  const [showPomodoro, setShowPomodoro] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back, Scholar</Text>
          <Text style={[styles.userName, { color: colors.text }]}>Alex Student ✨</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.streakBadge, { shadowColor: colors.shadow }]}>
            <Flame color="#F59E0B" size={16} fill="#F59E0B" />
            <Text style={styles.streakText}>{streak} Days</Text>
          </View>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowNotifModal(true)}>
            <Bell color={colors.text} size={20} />
            {notifications.some(n => !n.read) && <View style={styles.notifDot} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Admin Announcement Banner */}
      {adminAnnouncements.length > 0 && (
        <View style={[styles.announcementBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.annIconBox, { backgroundColor: colors.primaryLight }]}>
            <Sparkles color={colors.primary} size={16} />
          </View>
          <Text style={[styles.announcementText, { color: colors.text }]} numberOfLines={1}>
            {adminAnnouncements[0]}
          </Text>
        </View>
      )}

      {/* Search Bar */}
      <TouchableOpacity style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]} onPress={() => router.push('/(tabs)/courses')}>
        <Search color={colors.textSecondary} size={20} style={{ marginRight: 10 }} />
        <Text style={[styles.searchPlaceholder, { color: colors.textSecondary }]}>Search 20+ master courses, subjects...</Text>
      </TouchableOpacity>

      {/* Continue Learning Banner */}
      <View style={[styles.banner, { backgroundColor: colors.primary }]}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerBadge}>
            <Zap color="#FFFFFF" size={12} fill="#FFFFFF" />
            <Text style={styles.bannerTag}>ACTIVE CURRICULUM</Text>
          </View>
          <Text style={styles.bannerTitle}>Advanced React Native</Text>
          <Text style={styles.bannerSub}>Module 3: State Management & Zustand Architecture</Text>
          <TouchableOpacity style={styles.resumeBtn} onPress={() => router.push('/course/course-1')}>
            <Play color={colors.primary} size={16} fill={colors.primary} />
            <Text style={[styles.resumeText, { color: colors.primary }]}>Resume Learning</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.quickGrid}>
        <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/courses')}>
          <View style={[styles.quickIcon, { backgroundColor: colors.primaryLight }]}>
            <BookOpen color={colors.primary} size={22} />
          </View>
          <Text style={[styles.quickTitle, { color: colors.text }]}>Master Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/quiz')}>
          <View style={[styles.quickIcon, { backgroundColor: '#FEF3C7' }]}>
            <Award color="#D97706" size={22} />
          </View>
          <Text style={[styles.quickTitle, { color: colors.text }]}>SM-2 Quizzes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/tutor')}>
          <View style={[styles.quickIcon, { backgroundColor: '#D1FAE5' }]}>
            <Users color="#059669" size={22} />
          </View>
          <Text style={[styles.quickTitle, { color: colors.text }]}>AI & Tutors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowPomodoro(true)}>
          <View style={[styles.quickIcon, { backgroundColor: '#EDE9FE' }]}>
            <Clock color="#7C3AED" size={22} />
          </View>
          <Text style={[styles.quickTitle, { color: colors.text }]}>Focus Timer</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Master Courses</Text>
        <TouchableOpacity style={styles.seeAllRow} onPress={() => router.push('/(tabs)/courses')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>Explore All</Text>
          <ArrowRight color={colors.primary} size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.coursesScroll}>
        {adminCourses.slice(0, 8).map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[styles.courseCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}
            onPress={() => router.push(`/course/${course.id}`)}
          >
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={[styles.courseCategory, { color: colors.primary }]}>{course.category}</Text>
              <Text style={[styles.courseTitle, { color: colors.text }]} numberOfLines={2}>{course.title}</Text>
              <View style={styles.courseFooter}>
                <Text style={[styles.coursePrice, { color: colors.success }]}>{course.price}</Text>
                <Text style={[styles.courseRating, { color: colors.text }]}>⭐ {course.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notification Modal */}
      <Modal visible={showNotifModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifModal(false)}>
                <X color={colors.text} size={22} />
              </TouchableOpacity>
            </View>
            {notifications.map((n) => (
              <TouchableOpacity key={n.id} style={[styles.notifItem, { backgroundColor: n.read ? colors.background : colors.primaryLight }]} onPress={() => markNotificationRead(n.id)}>
                <Text style={[styles.notifTitle, { color: colors.text }]}>{n.title}</Text>
                <Text style={[styles.notifTime, { color: colors.textSecondary }]}>{n.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Pomodoro Focus Timer Modal */}
      <Modal visible={showPomodoro} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border, alignItems: 'center' }]}>
            <Text style={[styles.modalTitle, { color: colors.text, marginBottom: 10 }]}>🍅 Pomodoro Focus Timer</Text>
            <Text style={[styles.timerDisplay, { color: colors.primary }]}>25:00</Text>
            <Text style={[styles.timerSub, { color: colors.textSecondary }]}>Stay focused on your study module.</Text>
            <TouchableOpacity style={[styles.timerBtn, { backgroundColor: colors.primary }]} onPress={() => setShowPomodoro(false)}>
              <Text style={styles.timerBtnText}>Close Timer</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
    elevation: 2,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
  },
  notifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  announcementBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
    elevation: 1,
  },
  annIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 2,
  },
  searchPlaceholder: {
    fontSize: 14,
    fontWeight: '600',
  },
  banner: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    elevation: 4,
  },
  bannerContent: {
    maxWidth: '90%',
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 8,
  },
  bannerTag: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginBottom: 18,
    lineHeight: 18,
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
    gap: 8,
    elevation: 3,
  },
  resumeText: {
    fontWeight: '800',
    fontSize: 14,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  quickCard: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 3,
    elevation: 2,
  },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
  },
  coursesScroll: {
    gap: 16,
    paddingBottom: 10,
  },
  courseCard: {
    width: 250,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 140,
  },
  courseInfo: {
    padding: 16,
  },
  courseCategory: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
    height: 40,
    lineHeight: 20,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: '900',
  },
  courseRating: {
    fontSize: 12,
    fontWeight: '800',
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
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  notifItem: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  notifTime: {
    fontSize: 11,
    fontWeight: '600',
  },
  timerDisplay: {
    fontSize: 52,
    fontWeight: '900',
    marginVertical: 10,
  },
  timerSub: {
    fontSize: 13,
    marginBottom: 24,
    textAlign: 'center',
  },
  timerBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  timerBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
