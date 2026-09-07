import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { COURSES, LESSONS } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { ArrowLeft, Star, Clock, BookOpen, Play, CheckCircle2, Award, Download, Share2, X } from 'lucide-react-native';

export default function CourseDetailScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { id } = useLocalSearchParams();
  const course = COURSES.find((c) => c.id === id) || COURSES[0];
  const courseLessons = LESSONS.filter((l) => l.courseId === course.id);

  const enrolledCourses = useStore((state) => state.enrolledCourses);
  const enrollCourse = useStore((state) => state.enrollCourse);
  const isEnrolled = enrolledCourses.includes(course.id);

  const certificates = useStore((state) => state.certificates);
  const claimCertificate = useStore((state) => state.claimCertificate);
  const hasCertificate = certificates.includes(course.id);

  const [showCertModal, setShowCertModal] = useState(false);

  const handleEnrollOrStart = () => {
    if (!isEnrolled) {
      enrollCourse(course.id);
    }
    router.push(`/lesson/${courseLessons[0]?.id || 'lesson-1'}`);
  };

  const handleClaim = () => {
    claimCertificate(course.id);
    setShowCertModal(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>Coursera Master Detail</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: course.image }} style={styles.courseImage} />

        <View style={styles.headerInfo}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>{course.category}</Text>
          <Text style={[styles.titleText, { color: colors.text }]}>{course.title}</Text>
          <Text style={[styles.instructorText, { color: colors.textSecondary }]}>Taught by: {course.instructor}</Text>

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

        {/* Certificate Claim Banner */}
        <View style={[styles.certBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Award color={colors.primary} size={28} />
          <View style={styles.certInfo}>
            <Text style={[styles.certTitle, { color: colors.text }]}>Official Certificate Included</Text>
            <Text style={[styles.certSub, { color: colors.textSecondary }]}>Earn a verifiable Coursera-grade certificate upon completion.</Text>
          </View>
          <TouchableOpacity style={[styles.certBtn, { backgroundColor: hasCertificate ? colors.success : colors.primary }]} onPress={handleClaim}>
            <Text style={styles.certBtnText}>{hasCertificate ? 'View Cert' : 'Claim Cert'}</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About This Course</Text>
          <Text style={[styles.descText, { color: colors.textSecondary }]}>{course.description}</Text>
        </View>

        {/* Lessons List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Course Syllabus ({courseLessons.length} Modules)</Text>
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
          <Text style={[styles.footerPriceLabel, { color: colors.textSecondary }]}>Enrollment Status</Text>
          <Text style={[styles.footerPriceAmount, { color: colors.success }]}>{isEnrolled ? 'Enrolled ✓' : course.price}</Text>
        </View>
        <TouchableOpacity style={[styles.enrollBtn, { backgroundColor: colors.primary }]} onPress={handleEnrollOrStart}>
          <Text style={styles.enrollBtnText}>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</Text>
        </TouchableOpacity>
      </View>

      {/* Certificate Modal */}
      <Modal visible={showCertModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border, alignItems: 'center' }]}>
            <TouchableOpacity style={styles.closeModal} onPress={() => setShowCertModal(false)}>
              <X color={colors.text} size={22} />
            </TouchableOpacity>

            <Award color={colors.primary} size={56} style={{ marginBottom: 12 }} />
            <Text style={[styles.modalCertHeading, { color: colors.text }]}>Certificate of Completion</Text>
            <Text style={[styles.modalCertSub, { color: colors.textSecondary }]}>This is proudly presented to</Text>
            <Text style={[styles.modalCertName, { color: colors.primary }]}>Alex Student</Text>
            <Text style={[styles.modalCertDesc, { color: colors.textSecondary }]}>for successfully mastering {course.title} with elite distinction.</Text>

            <TouchableOpacity style={[styles.shareCertBtn, { backgroundColor: colors.primary }]} onPress={() => alert('Certificate downloaded to device storage!')}>
              <Download color="#FFFFFF" size={16} />
              <Text style={styles.shareCertText}>Download PDF Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 16,
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
  certBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    marginBottom: 20,
    gap: 12,
  },
  certInfo: {
    flex: 1,
  },
  certTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  certSub: {
    fontSize: 11,
    lineHeight: 15,
  },
  certBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  certBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
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
    fontSize: 18,
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
  },
  closeModal: {
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  modalCertHeading: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalCertSub: {
    fontSize: 13,
    marginBottom: 6,
  },
  modalCertName: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  modalCertDesc: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  shareCertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    width: '100%',
  },
  shareCertText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
