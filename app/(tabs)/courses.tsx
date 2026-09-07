import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { Search, Star, Clock, Bookmark, Download } from 'lucide-react-native';

export default function CoursesScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const adminCourses = useStore((state) => state.adminCourses);
  const savedCourses = useStore((state) => state.savedCourses);
  const toggleSaveCourse = useStore((state) => state.toggleSaveCourse);
  const offlineCourses = useStore((state) => state.offlineCourses);
  const toggleOfflineCourse = useStore((state) => state.toggleOfflineCourse);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = [
    'All',
    'Computer Science',
    'Artificial Intelligence',
    'Mathematics',
    'Physics',
    'Cybersecurity',
    'Economics',
    'Design',
    'Chemistry',
    'Medicine',
    'Engineering',
    'Business',
    'Psychology',
    'History',
  ];

  const filteredCourses = adminCourses.filter((c) => {
    const matchesCat = selectedCat === 'All' || c.category === selectedCat;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Explore {adminCourses.length} Master Courses</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Expand your knowledge with expert-led Coursera-grade programs</Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Search color={colors.textSecondary} size={20} style={{ marginRight: 10 }} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search across all 20+ courses..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll} style={styles.catContainer}>
        {categories.map((cat) => {
          const isActive = selectedCat === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catChip,
                { backgroundColor: isActive ? colors.primary : colors.surface, borderColor: colors.border },
              ]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text style={[styles.catText, { color: isActive ? '#FFFFFF' : colors.textSecondary }]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Courses List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {filteredCourses.map((course) => {
          const isSaved = savedCourses.includes(course.id);
          const isOffline = offlineCourses.includes(course.id);
          return (
            <TouchableOpacity
              key={course.id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => router.push(`/course/${course.id}`)}
            >
              <Image source={{ uri: course.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardTopRow}>
                  <Text style={[styles.cardCat, { color: colors.primary }]}>{course.category}</Text>
                  <View style={styles.badgeRow}>
                    <TouchableOpacity onPress={() => toggleOfflineCourse(course.id)} style={styles.actionIcon}>
                      <Download color={isOffline ? colors.success : colors.textSecondary} size={16} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleSaveCourse(course.id)} style={styles.actionIcon}>
                      <Bookmark color={isSaved ? colors.primary : colors.textSecondary} size={16} fill={isSaved ? colors.primary : 'transparent'} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>{course.title}</Text>
                <Text style={[styles.cardInstructor, { color: colors.textSecondary }]}>By {course.instructor}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.metaRow}>
                    <Clock color={colors.textSecondary} size={12} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{course.duration}</Text>
                  </View>
                  <Text style={[styles.cardPrice, { color: colors.success }]}>{course.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  catContainer: {
    maxHeight: 46,
    marginBottom: 16,
  },
  catScroll: {
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  catText: {
    fontWeight: '600',
    fontSize: 13,
  },
  listContainer: {
    gap: 16,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  cardImage: {
    width: 110,
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    padding: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardCat: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcon: {
    padding: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardInstructor: {
    fontSize: 12,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
});
