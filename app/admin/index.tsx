import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { ShieldCheck, Lock, User, Plus, Trash2, ArrowLeft, BookOpen, Users, Award, LogOut, CheckCircle } from 'lucide-react-native';

export default function AdminScreen() {
  const router = useRouter();
  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);
  const adminLogin = useStore((state) => state.adminLogin);
  const adminLogout = useStore((state) => state.adminLogout);
  const adminCourses = useStore((state) => state.adminCourses);
  const addCourse = useStore((state) => state.addCourse);
  const deleteCourse = useStore((state) => state.deleteCourse);

  // Login form state
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');

  // New course form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newInstructor, setNewInstructor] = useState('');
  const [newPrice, setNewPrice] = useState('Free');

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

  if (!isAdminLoggedIn) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.loginContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={22} />
        </TouchableOpacity>

        <View style={styles.lockBadge}>
          <ShieldCheck color={Colors.primary} size={40} />
        </View>

        <Text style={styles.loginTitle}>Admin Portal</Text>
        <Text style={styles.loginSubtitle}>Enter administrator credentials to access platform controls and course management.</Text>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Admin ID</Text>
            <View style={styles.inputWrapper}>
              <User color={Colors.textSecondary} size={18} />
              <TextInput
                style={styles.input}
                placeholder="Enter admin ID (admin)"
                placeholderTextColor={Colors.textSecondary}
                value={adminId}
                onChangeText={setAdminId}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Lock color={Colors.textSecondary} size={18} />
              <TextInput
                style={styles.input}
                placeholder="Enter password (admin123)"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry
                value={adminPass}
                onChangeText={setAdminPass}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login as Admin</Text>
          </TouchableOpacity>

          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>Demo Credentials:</Text>
            <Text style={styles.hintText}>ID: <Text style={styles.bold}>admin</Text></Text>
            <Text style={styles.hintText}>Password: <Text style={styles.bold}>admin123</Text></Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={adminLogout}>
          <LogOut color={Colors.error} size={20} />
        </TouchableOpacity>
      </View>

      {/* Platform Analytics Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <BookOpen color={Colors.primary} size={22} />
          <Text style={styles.statNumber}>{adminCourses.length}</Text>
          <Text style={styles.statText}>Active Courses</Text>
        </View>
        <View style={styles.statBox}>
          <Users color="#059669" size={22} />
          <Text style={styles.statNumber}>1,420</Text>
          <Text style={styles.statText}>Enrolled Students</Text>
        </View>
      </View>

      {/* Add New Course Section */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>Add New Course</Text>

        <TextInput
          style={styles.formInput}
          placeholder="Course Title"
          placeholderTextColor={Colors.textSecondary}
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Category (e.g., Computer Science)"
          placeholderTextColor={Colors.textSecondary}
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Instructor Name"
          placeholderTextColor={Colors.textSecondary}
          value={newInstructor}
          onChangeText={setNewInstructor}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Price (e.g., Free or $49.99)"
          placeholderTextColor={Colors.textSecondary}
          value={newPrice}
          onChangeText={setNewPrice}
        />

        <TouchableOpacity style={styles.addBtn} onPress={handleAddCourseSubmit}>
          <Plus color="#FFFFFF" size={18} />
          <Text style={styles.addBtnText}>Publish Course</Text>
        </TouchableOpacity>
      </View>

      {/* Course Management List */}
      <View style={styles.managementSection}>
        <Text style={styles.sectionHeading}>Manage Platform Courses</Text>
        {adminCourses.map((course) => (
          <View key={course.id} style={styles.courseItem}>
            <Image source={{ uri: course.image }} style={styles.courseThumb} />
            <View style={styles.courseDetails}>
              <Text style={styles.courseTitle} numberOfLines={1}>{course.title}</Text>
              <Text style={styles.courseCategory}>{course.category} • {course.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteCourse(course.id)}
            >
              <Trash2 color={Colors.error} size={18} />
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
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  lockBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  hintBox: {
    marginTop: 20,
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  hintText: {
    fontSize: 13,
    color: Colors.text,
  },
  bold: {
    fontWeight: '800',
    color: Colors.primary,
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
    color: Colors.text,
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
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 2,
  },
  statText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
  },
  formInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    color: Colors.text,
    marginBottom: 12,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  courseThumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.border,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
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
