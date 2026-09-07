import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { ShieldCheck, Lock, User, Plus, Trash2, ArrowLeft, BookOpen, Users, LogOut, Megaphone } from 'lucide-react-native';

export default function AdminScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);
  const adminLogin = useStore((state) => state.adminLogin);
  const adminLogout = useStore((state) => state.adminLogout);
  const adminCourses = useStore((state) => state.adminCourses);
  const addCourse = useStore((state) => state.addCourse);
  const deleteCourse = useStore((state) => state.deleteCourse);
  const addAnnouncement = useStore((state) => state.addAnnouncement);

  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newInstructor, setNewInstructor] = useState('');
  const [newPrice, setNewPrice] = useState('Free');

  const [announcementMsg, setAnnouncementMsg] = useState('');

  const handleLogin = () => {
    const success = adminLogin(adminId, adminPass);
    if (!success) {
      Alert.alert('Authentication Failed', 'Invalid Admin ID or Password.\nUse ID: admin | Password: admin123');
    } else {
      setAdminId('');
      setAdminPass('');
    }
  };

  const handleAddCourseSubmit = () => {
    if (!newTitle.trim() || !newCategory.trim() || !newInstructor.trim()) {
      Alert.alert('Error', 'Please fill in all course details.');
      return;
    }
    const newCourse = {
      id: `course-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      instructor: newInstructor,
      rating: 5.0,
      reviewsCount: 1,
      lessonsCount: 10,
      duration: '8 hours',
      price: newPrice,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      description: 'Newly created instructor course loaded via Admin Portal.',
      progress: 0,
    };
    addCourse(newCourse);
    setNewTitle('');
    setNewCategory('');
    setNewInstructor('');
    Alert.alert('Success', 'Course added successfully to platform database.');
  };

  const handleBroadcast = () => {
    if (!announcementMsg.trim()) return;
    addAnnouncement(announcementMsg);
    setAnnouncementMsg('');
    Alert.alert('Success', 'Announcement broadcasted to all students successfully.');
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

        <Text style={[styles.loginTitle, { color: colors.text }]}>Admin Portal</Text>
        <Text style={[styles.loginSubtitle, { color: colors.textSecondary }]}>Enter administrator credentials to access platform controls and course management.</Text>

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
            <Text style={[styles.hintTitle, { color: colors.textSecondary }]}>Demo Credentials:</Text>
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={adminLogout}>
          <LogOut color={colors.error} size={20} />
        </TouchableOpacity>
      </View>

      {/* Analytics Cards */}
      <View style={styles.statsGrid}>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <BookOpen color={colors.primary} size={22} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{adminCourses.length}</Text>
          <Text style={[styles.statText, { color: colors.textSecondary }]}>Active Courses</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Users color={colors.success} size={22} />
          <Text style={[styles.statNumber, { color: colors.text }]}>1,420</Text>
          <Text style={[styles.statText, { color: colors.textSecondary }]}>Enrolled Students</Text>
        </View>
      </View>

      {/* Broadcast Announcement */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Broadcast Announcement</Text>
        <TextInput
          style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Type announcement for all students..."
          placeholderTextColor={colors.textSecondary}
          value={announcementMsg}
          onChangeText={setAnnouncementMsg}
        />
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.secondary }]} onPress={handleBroadcast}>
          <Megaphone color="#FFFFFF" size={18} />
          <Text style={styles.addBtnText}>Publish Announcement</Text>
        </TouchableOpacity>
      </View>

      {/* Add New Course Section */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Add New Course</Text>

        <TextInput
          style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Course Title"
          placeholderTextColor={colors.textSecondary}
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Category (e.g., Computer Science)"
          placeholderTextColor={colors.textSecondary}
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TextInput
          style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Instructor Name"
          placeholderTextColor={colors.textSecondary}
          value={newInstructor}
          onChangeText={setNewInstructor}
        />
        <TextInput
          style={[styles.formInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Price (e.g., Free or $49.99)"
          placeholderTextColor={colors.textSecondary}
          value={newPrice}
          onChangeText={setNewPrice}
        />

        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={handleAddCourseSubmit}>
          <Plus color="#FFFFFF" size={18} />
          <Text style={styles.addBtnText}>Publish Course</Text>
        </TouchableOpacity>
      </View>

      {/* Course Management List */}
      <View style={styles.managementSection}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Manage Platform Courses</Text>
        {adminCourses.map((course) => (
          <View key={course.id} style={[styles.courseItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image source={{ uri: course.image }} style={styles.courseThumb} />
            <View style={styles.courseDetails}>
              <Text style={[styles.courseTitle, { color: colors.text }]} numberOfLines={1}>{course.title}</Text>
              <Text style={[styles.courseCategory, { color: colors.textSecondary }]}>{course.category} • {course.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteCourse(course.id)}
            >
              <Trash2 color={colors.error} size={18} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

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
    fontSize: 22,
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
    marginBottom: 24,
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
});
