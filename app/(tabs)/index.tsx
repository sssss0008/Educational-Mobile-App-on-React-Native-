import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { COURSES } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { Flame, Bell, Search, BookOpen, Award, Users, ChevronRight, Play } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const streak = useStore((state) => state.streak);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Alex Student 👋</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.streakBadge}>
            <Flame color="#F59E0B" size={16} fill="#F59E0B" />
            <Text style={styles.streakText}>{streak} Days</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={() => alert('Notifications')}>
            <Bell color={Colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(tabs)/courses')}>
        <Search color={Colors.textSecondary} size={20} style={{ marginRight: 10 }} />
        <Text style={styles.searchPlaceholder}>Search courses, subjects, tutors...</Text>
      </TouchableOpacity>

      {/* Continue Learning Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTag}>CONTINUE LEARNING</Text>
          <Text style={styles.bannerTitle}>Advanced React Native</Text>
          <Text style={styles.bannerSub}>Lesson 3: State Management with Zustand</Text>
          <TouchableOpacity style={styles.resumeBtn} onPress={() => router.push('/course/course-1')}>
            <Play color="#FFFFFF" size={16} fill="#FFFFFF" />
            <Text style={styles.resumeText}>Resume Course</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/courses')}>
          <View style={[styles.quickIcon, { backgroundColor: '#EEF2FF' }]}>
            <BookOpen color="#4F46E5" size={22} />
          </View>
          <Text style={styles.quickTitle}>All Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/quiz')}>
          <View style={[styles.quickIcon, { backgroundColor: '#FEF3C7' }]}>
            <Award color="#D97706" size={22} />
          </View>
          <Text style={styles.quickTitle}>Quizzes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/tutor')}>
          <View style={[styles.quickIcon, { backgroundColor: '#D1FAE5' }]}>
            <Users color="#059669" size={22} />
          </View>
          <Text style={styles.quickTitle}>Book Tutor</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Courses</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/courses')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.coursesScroll}>
        {COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => router.push(`/course/${course.id}`)}
          >
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseCategory}>{course.category}</Text>
              <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>{course.price}</Text>
                <Text style={styles.courseRating}>⭐ {course.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
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
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  searchPlaceholder: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  banner: {
    backgroundColor: Colors.primary,
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
    color: Colors.primary,
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
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 4,
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
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
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
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  coursesScroll: {
    gap: 16,
    paddingBottom: 10,
  },
  courseCard: {
    width: 240,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  courseImage: {
    width: '100%',
    height: 130,
    backgroundColor: Colors.border,
  },
  courseInfo: {
    padding: 14,
  },
  courseCategory: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
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
    color: Colors.success,
  },
  courseRating: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
});
