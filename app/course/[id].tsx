import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { COURSES, LESSONS } from '../../src/data/mockData';
import { ArrowLeft, Star, Clock, BookOpen, Play, CheckCircle2, Award } from 'lucide-react-native';

export default function CourseDetailScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { id } = useLocalSearchParams();
  const course = COURSES.find((c) => c.id === id) || COURSES[0];
  const courseLessons = LESSONS.filter((l) => l.courseId === course.id);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>Course Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: course.image }} style={styles.courseImage} />

        <View style={styles.headerInfo}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>{course.category}</Text>
          <Text style={[styles.titleText, { color: colors.text }]}>{course.title}</Text>
          <Text style={[styles.instructorText, { color: colors.textSecondary }]}>Instructor: {course.instructor}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Star color="#F59E0B" size={14} fill="#F59E0B" />
              <Text style={[styles.metaText, { color: colors.text }]}>{course.rating} ({course.reviewsCount} reviews)</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock color={colors.textSecondary} size={14} />
              <Text style={[styles.metaText, { color: colors.text }]}>{course.duration}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About This Course</Text>
          <Text style={[styles.descText, { color: colors.textSecondary }]}>{course.description}</Text>
        </View>

        {/* Lessons List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Course Curriculum ({courseLessons.length} Lessons)</Text>
          {courseLessons.map((lesson, idx) => (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
            >
              <View style={[styles.lessonNumBox, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.lessonNumText, { color: colors.primary }]}>{idx + 1}</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
                <Text style={[styles.lessonDuration, { color: colors.textSecondary }]}>{lesson.duration} • {lesson.type.toUpperCase()}</Text>
              </View>
              <Play color={colors.primary} size={18} fill={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Footer */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View>
          <Text style={[styles.footerPriceLabel, { color: colors.textSecondary }]}>Price</Text>
          <Text style={[styles.footerPriceAmount, { color: colors.success }]}>{course.price}</Text>
        </View>
        <TouchableOpacity style={[styles.enrollBtn, { backgroundColor: colors.primary }]} onPress={() => router.push(`/lesson/${courseLessons[0]?.id || 'lesson-1'}`)}>
          <Text style={styles.enrollBtnText}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: 10,
  },
  headerInfo: {
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  instructorText: {
    fontSize: 14,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
  },
  lessonCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonNumBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumText: {
    fontSize: 14,
    fontWeight: '800',
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 14,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  footerPriceLabel: {
    fontSize: 12,
  },
  footerPriceAmount: {
    fontSize: 20,
    fontWeight: '800',
  },
  enrollBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  enrollBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
