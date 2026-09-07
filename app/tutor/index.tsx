import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { TUTORS } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { ArrowLeft, Star, Calendar, MessageSquare, Check } from 'lucide-react-native';

export default function TutorScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const bookedTutors = useStore((state) => state.bookedTutors);
  const bookTutor = useStore((state) => state.bookTutor);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>Expert Tutors</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Book 1-on-1 private tutoring sessions with top professors and industry experts.</Text>

        {TUTORS.map((tutor) => {
          const isBooked = bookedTutors.includes(tutor.id);
          return (
            <View key={tutor.id} style={[styles.tutorCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Image source={{ uri: tutor.image }} style={styles.tutorImage} />
              <View style={styles.tutorInfo}>
                <View style={styles.tutorTopRow}>
                  <Text style={[styles.tutorName, { color: colors.text }]}>{tutor.name}</Text>
                  <View style={styles.ratingBadge}>
                    <Star color="#F59E0B" size={12} fill="#F59E0B" />
                    <Text style={styles.ratingText}>{tutor.rating}</Text>
                  </View>
                </View>
                <Text style={[styles.tutorSubject, { color: colors.primary }]}>{tutor.subject}</Text>
                <Text style={[styles.tutorBio, { color: colors.textSecondary }]} numberOfLines={2}>{tutor.bio}</Text>

                <View style={styles.tutorFooter}>
                  <Text style={[styles.tutorRate, { color: colors.text }]}>${tutor.hourlyRate}<Text style={[styles.rateUnit, { color: colors.textSecondary }]}> / hr</Text></Text>
                  <TouchableOpacity
                    style={[styles.bookBtn, { backgroundColor: isBooked ? colors.success : colors.primary }]}
                    onPress={() => bookTutor(tutor.id)}
                  >
                    <Text style={styles.bookBtnText}>{isBooked ? 'Session Booked ✓' : 'Book Session'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
    paddingBottom: 40,
    paddingTop: 10,
    gap: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  tutorCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
  },
  tutorImage: {
    width: 80,
    height: 100,
    borderRadius: 12,
  },
  tutorInfo: {
    flex: 1,
    marginLeft: 14,
  },
  tutorTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  tutorSubject: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  tutorBio: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 16,
  },
  tutorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tutorRate: {
    fontSize: 16,
    fontWeight: '800',
  },
  rateUnit: {
    fontSize: 11,
    fontWeight: '600',
  },
  bookBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
});
