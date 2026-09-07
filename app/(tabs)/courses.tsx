import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { COURSES } from '../../src/data/mockData';
import { Search, Star, Clock, BookOpen } from 'lucide-react-native';

export default function CoursesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Computer Science', 'Mathematics', 'Physics', 'History'];

  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCat === 'All' || c.category === selectedCat;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Explore Courses</Text>
        <Text style={styles.subtitle}>Expand your knowledge with expert-led courses</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color={Colors.textSecondary} size={20} style={{ marginRight: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search subjects, instructors..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll} style={styles.catContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, selectedCat === cat && styles.catChipActive]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {filteredCourses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.card}
            onPress={() => router.push(`/course/${course.id}`)}
          >
            <Image source={{ uri: course.image }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardCat}>{course.category}</Text>
                <View style={styles.ratingBadge}>
                  <Star color="#F59E0B" size={12} fill="#F59E0B" />
                  <Text style={styles.ratingText}>{course.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardTitle} numberOfLines={2}>{course.title}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.metaRow}>
                  <Clock color={Colors.textSecondary} size={12} />
                  <Text style={styles.metaText}>{course.duration}</Text>
                </View>
                <Text style={styles.cardPrice}>{course.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
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
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  catText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },
  catTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 16,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardImage: {
    width: 110,
    height: '100%',
    backgroundColor: Colors.border,
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
    color: Colors.primary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  cardInstructor: {
    fontSize: 12,
    color: Colors.textSecondary,
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
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.success,
  },
});
