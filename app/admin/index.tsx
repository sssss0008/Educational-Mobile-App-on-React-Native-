import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { ShieldCheck, Lock, User, Plus, Trash2, ArrowLeft, BookOpen, Users, LogOut, Megaphone, Award, CheckCircle } from 'lucide-react-native';

export default function AdminScreen() {
  const router = useRouter();
  const colors = useThemeColors();

  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);
  const adminLogin = useStore((state) => state.adminLogin);
  const adminLogout = useStore((state) => state.adminLogout);

  const adminCourses = useStore((state) => state.adminCourses);
  const addCourse = useStore((state) => state.addCourse);
  const deleteCourse = useStore((state) => state.deleteCourse);

  const adminTutors = useStore((state) => state.adminTutors);
  const addTutor = useStore((state) => state.addTutor);
  const deleteTutor = useStore((state) => state.deleteTutor);

  const adminAnnouncements = useStore((state) => state.adminAnnouncements);
  const addAnnouncement = useStore((state) => state.addAnnouncement);

  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'tutors' | 'announcements'>('courses');

  // Course Form State with Strict Validation
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseInstructor, setCourseInstructor] = useState('');
  const [coursePrice, setCoursePrice] = useState('Free');
  const [courseDuration, setCourseDuration] = useState('10 hours');
  const [courseDesc, setCourseDesc] = useState('');

  // Tutor Form State
  const [tutorName, setTutorName] = useState('');
  const [tutorSubject, setTutorSubject] = useState('');
  const [tutorRate, setTutorRate] = useState('50');
  const [tutorBio, setTutorBio] = useState('');

  // Announcement State
  const [announcementMsg, setAnnouncementMsg] = useState('');

  const handleLogin = () => {
    if (!adminId.trim() || !adminPass.trim()) {
      Alert.alert('Validation Error', 'Please enter both Admin ID and Password.');
      return;
    }
    const success = adminLogin(adminId, adminPass);
    if (!success) {
      Alert.alert('Authentication Failed', 'Invalid Admin ID or Password.\n\nUse ID: admin | Password: admin123');
    } else {
      setAdminId('');
      setAdminPass('');
    }
  };

  const handleCreateCourse = () => {
    if (!courseTitle.trim() || !courseCategory.trim() || !courseInstructor.trim() || !courseDesc.trim()) {
      Alert.alert('Validation Error', 'All course fields (Title, Category, Instructor, Description) are required.');
      return;
    }
    const newCourse = {
      id: `course-${Date.now()}`,
      title: courseTitle.trim(),
      category: courseCategory.trim(),
      instructor: courseInstructor.trim(),
      rating: 5.0,
      reviewsCount: 1,
      lessonsCount: 12,
      duration: courseDuration.trim() || '10 hours',
      price: coursePrice.trim() || 'Free',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      description: courseDesc.trim(),
      progress: 0,
    };
    const success = addCourse(newCourse);
    if (success) {
      setCourseTitle('');
      setCourseCategory('');
      setCourseInstructor('');
      setCourseDesc('');
      Alert.alert('Success!', 'Course successfully published to the platform.');
    } else {
      Alert.alert('Error', 'Failed to publish course. Please check input values.');
    }
  };

  const handleCreateTutor = () => {
    if (!tutorName.trim() || !tutorSubject.trim() || !tutorBio.trim()) {
      Alert.alert('Validation Error', 'Tutor Name, Subject, and Bio are required.');
      return;
    }
    const newTutor = {
      id: `t-${Date.now()}`,
      name: tutorName.trim(),
      subject: tutorSubject.trim(),
      rating: 5.0,
      hourlyRate: Number(tutorRate) || 50,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: tutorBio.trim(),
    };
    addTutor(newTutor);
    setTutorName('');
    setTutorSubject('');
    setTutorBio('');
    Alert.alert('Success!', 'Tutor profile successfully added.');
  };

  const handleBroadcast = () => {
    if (!announcementMsg.trim()) {
      Alert.alert('Validation Error', 'Announcement message cannot be empty.');
      return;
    }
    addAnnouncement(announcementMsg.trim());
    setAnnouncementMsg('');
    Alert.alert('Success!', 'Announcement broadcasted to all enrolled students.');
  };

  if (!isAdminLoggedIn) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.loginContainer}>
        <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={22} />
        </TouchableOpacity>

        <View style={[styles.lockBadge, { backgroundColor: colors.primaryLight }]}>
          <ShieldCheck color={colors.primary} size={40} />
        </View>

        <Text style={[styles.loginTitle, { color: colors.text }]}>Admin Master Portal</Text>
        <Text style={[styles.loginSubtitle, { color: colors.textSecondary }]}>Enter verified administrator credentials to access complete platform management controls.</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Admin ID</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <User color={colors.textSecondary} size={18} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter admin ID (admin)"
                placeholderTextColor={colors.textSecondary}
                value={adminId}
                onChangeText={setAdminId}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Lock color={colors.textSecondary} size={18} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter password (admin123)"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={adminPass}
                onChangeText={setAdminPass}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.loginButton, { backgroundColor: colors.primary }]} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login as Admin</Text>
          </TouchableOpacity>

          <View style={[styles.hintBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.hintTitle, { color: colors.textSecondary }]}>Verified Admin Credentials:</Text>
            <Text style={[styles.hintText, { color: colors.text }]}>ID: <Text style={[styles.bold, { color: colors.primary }]}>admin</Text></Text>
            <Text style={[styles.hintText, { color: colors.text }]}>Password: <Text style={[styles.bold, { color: colors.primary }]}>admin123</Text></Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={22} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Admin Master Control</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={adminLogout}>
          <LogOut color={colors.error} size={20} />
        </TouchableOpacity>
      </View>

      {/* Analytics Overview */}
      <View style={styles.statsGrid}>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <BookOpen color={colors.primary} size={22} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{adminCourses.length}</Text>
          <Text style={[styles.statText, { color: colors.textSecondary }]}>Total Courses</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Users color={colors.success} size={22} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{adminTutors.length}</Text>
          <Text style={[styles.statText, { color: colors.textSecondary }]}>Active Tutors</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'courses' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('courses')}
        >
          <Text style={[styles.tabText, activeTab === 'courses' && { color: '#FFFFFF' }]}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'tutors' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('tutors')}
        >
          <Text style={[styles.tabText, activeTab === 'tutors' && { color: '#FFFFFF' }]}>Tutors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'announcements' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('announcements')}
        >
          <Text style={[styles.tabText, activeTab === 'announcements' && { color: '#FFFFFF' }]}>Announcements</Text>
        </TouchableOpacity>
      </View>

      {/* TAB 1: COURSES MANAGEMENT & VALIDATION */}
      {activeTab === 'courses' && (
        <View>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Add & Validate New Course</Text>

            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Course Title (Required)"
              placeholderTextColor={colors.textSecondary}
              value={courseTitle}
              onChangeText={setCourseTitle}
            />
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Category (e.g., Computer Science)"
              placeholderTextColor={colors.textSecondary}
              value={courseCategory}
              onChangeText={setCourseCategory}
            />
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Instructor Name"
              placeholderTextColor={colors.textSecondary}
              value={courseInstructor}
              onChangeText={setCourseInstructor}
            />
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Price (e.g., Free or $49.99)"
              placeholderTextColor={colors.textSecondary}
              value={coursePrice}
              onChangeText={setCoursePrice}
            />
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Duration (e.g., 12 hours)"
              placeholderTextColor={colors.textSecondary}
              value={courseDuration}
              onChangeText={setCourseDuration}
            />
            <TextInput
              style={[styles.formArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Detailed Course Description"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
              value={courseDesc}
              onChangeText={setCourseDesc}
            />

            <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={handleCreateCourse}>
              <Plus color="#FFFFFF" size={18} />
              <Text style={styles.addBtnText}>Validate & Publish Course</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.managementSection}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Manage Platform Courses</Text>
            {adminCourses.map((course) => (
              <View key={course.id} style={[styles.courseItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Image source={{ uri: course.image }} style={styles.courseThumb} />
                <View style={styles.courseDetails}>
                  <Text style={[styles.courseTitle, { color: colors.text }]} numberOfLines={1}>{course.title}</Text>
                  <Text style={[styles.courseCategory, { color: colors.textSecondary }]}>{course.category} • {course.price}</Text>
                </View>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteCourse(course.id)}>
                  <Trash2 color={colors.error} size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* TAB 2: TUTORS MANAGEMENT */}
      {activeTab === 'tutors' && (
        <View>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Add Expert Tutor</Text>
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Tutor Full Name"
              placeholderTextColor={colors.textSecondary}
              value={tutorName}
              onChangeText={setTutorName}
            />
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Subject Specialization"
              placeholderTextColor={colors.textSecondary}
              value={tutorSubject}
              onChangeText={setTutorSubject}
            />
            <TextInput
              style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Hourly Rate ($)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={tutorRate}
              onChangeText={setTutorRate}
            />
            <TextInput
              style={[styles.formArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Professional Bio & Credentials"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
              value={tutorBio}
              onChangeText={setTutorBio}
            />

            <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.success }]} onPress={handleCreateTutor}>
              <Plus color="#FFFFFF" size={18} />
              <Text style={styles.addBtnText}>Register Tutor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.managementSection}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Registered Tutors</Text>
            {adminTutors.map((tutor) => (
              <View key={tutor.id} style={[styles.courseItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Image source={{ uri: tutor.image }} style={styles.courseThumb} />
                <View style={styles.courseDetails}>
                  <Text style={[styles.courseTitle, { color: colors.text }]}>{tutor.name}</Text>
                  <Text style={[styles.courseCategory, { color: colors.textSecondary }]}>{tutor.subject} • ${tutor.hourlyRate}/hr</Text>
                </View>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTutor(tutor.id)}>
                  <Trash2 color={colors.error} size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* TAB 3: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <View>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Broadcast Announcement</Text>
            <TextInput
              style={[styles.formArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Type platform announcement..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              value={announcementMsg}
              onChangeText={setAnnouncementMsg}
            />
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.secondary }]} onPress={handleBroadcast}>
              <Megaphone color="#FFFFFF" size={18} />
              <Text style={styles.addBtnText}>Broadcast to All Students</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.managementSection}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Active Announcements</Text>
            {adminAnnouncements.map((ann, idx) => (
              <View key={idx} style={[styles.annCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Megaphone color={colors.primary} size={18} />
                <Text style={[styles.annText, { color: colors.text }]}>{ann}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

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
  loginContainer: {
    paddingVertical: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  lockBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  loginButton: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  hintBox: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 13,
  },
  bold: {
    fontWeight: '800',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 2,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(100,116,139,0.1)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  formInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    marginBottom: 12,
  },
  formArea: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
    height: 100,
    fontSize: 15,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  addBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  managementSection: {
    marginTop: 10,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    gap: 12,
  },
  courseThumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  annCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  annText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
