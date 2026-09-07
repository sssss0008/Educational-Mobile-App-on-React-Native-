import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { Flame, Bell, Search, BookOpen, Award, Users, Play, ShieldAlert, Sparkles, Clock, CheckCircle2, Bookmark, X } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const streak = useStore((state) => state.streak);
  const adminAnnouncements = useStore((state) => state.adminAnnouncements);
  const savedCourses = useStore((state) => state.savedCourses);
  const adminCourses = useStore((state) => state.adminCourses);

  // Feature: Notification Modal
  const [showNotifModal, setShowNotifModal] = useState(false);
  const notifications = useStore((state) => state.notifications);
  const markNotificationRead = useStore((state) => state.markNotificationRead);

  // Feature: Pomodoro Timer Modal
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: colors.text }]}>Alex Student 👋</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.streakBadge}>
            <Flame color="#F59E0B" size={16} fill="#F59E0B" />
            <Text style={styles.streakText}>{streak} Days</Text>
          </View>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setShowNotifModal(true)}>
            <Bell color={colors.text} size={20} />
            {notifications.some(n => !n.read) && <View style={styles.notifDot} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Feature: Admin Announcement Banner */}
      {adminAnnouncements.length > 0 && (
        <View style={[styles.announcementBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Sparkles color={colors.primary} size={18} />
          <Text style={[styles.announcementText, { color: colors.text }]} numberOfLines={1}>
            📢 {adminAnnouncements[0]}
          </Text>
        </View>
      )}

      {/* Search Bar */}
      <TouchableOpacity style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/courses')}>
        <Search color={colors.textSecondary} size={20} style={{ marginRight: 10 }} />
        <Text style={[styles.searchPlaceholder, { color: colors.textSecondary }]}>Search courses, subjects, tutors...</Text>
      </TouchableOpacity>

      {/* Continue Learning Banner */}
      <View style={[styles.banner, { backgroundColor: colors.primary }]}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTag}>CONTINUE LEARNING</Text>
          <Text style={styles.bannerTitle}>Advanced React Native</Text>
          <Text style={styles.bannerSub}>Lesson 3: State Management with Zustand</Text>
          <TouchableOpacity style={styles.resumeBtn} onPress={() => router.push('/course/course-1')}>
            <Play color={colors.primary} size={16} fill={colors.primary} />
            <Text style={[styles.resumeText, { color: colors.primary }]}>Resume Course</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions (Features 3-7) */}
      <View style={styles.quickGrid}>
        <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/courses')}>
          <View style={[styles.quickIcon, { backgroundColor: colors.primaryLight }]}>
            <BookOpen color={colors.primary} size={22} />
          </View>
          <Text style={[styles.quickTitle, { color: colors.text }]}>Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/(tabs)/quiz')}>
          <View style={[styles.quickIcon, { backgroundColor: '#FEF3C7' }]}>
            <Award color="#D97706" size={22} />
          </View>
          <Text style={[styles.quickTitle, { color: colors.text }]}>Quizzes & SM2</Text>
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
          <Text style={[styles.quickTitle, { color: colors.text }]}>Pomodoro</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Courses</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/courses')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.coursesScroll}>
        {adminCourses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[styles.courseCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  announcementBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 10,
  },
  announcementText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
  },
  searchPlaceholder: {
    fontSize: 14,
  },
  banner: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  bannerContent: {
    maxWidth: '90%',
  },
  bannerTag: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginBottom: 16,
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  resumeText: {
    fontWeight: '700',
    fontSize: 13,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  quickCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  coursesScroll: {
    gap: 16,
    paddingBottom: 10,
  },
  courseCard: {
    width: 240,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  courseImage: {
    width: '100%',
    height: 130,
  },
  courseInfo: {
    padding: 14,
  },
  courseCategory: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    height: 40,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  courseRating: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  notifItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  notifTime: {
    fontSize: 11,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: '900',
    marginVertical: 10,
  },
  timerSub: {
    fontSize: 13,
    marginBottom: 20,
  },
  timerBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  timerBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
