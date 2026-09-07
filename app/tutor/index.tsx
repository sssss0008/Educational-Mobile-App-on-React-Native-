import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { TUTORS } from '../../src/data/mockData';
import { ArrowLeft, Star, Calendar, MessageSquare } from 'lucide-react-native';

export default function TutorScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={20} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Expert Tutors</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerSubtitle}>Book 1-on-1 private tutoring sessions with top professors and industry experts.</Text>

        {TUTORS.map((tutor) => (
          <View key={tutor.id} style={styles.tutorCard}>
            <Image source={{ uri: tutor.image }} style={styles.tutorImage} />
            <View style={styles.tutorInfo}>
              <View style={styles.tutorTopRow}>
                <Text style={styles.tutorName}>{tutor.name}</Text>
                <View style={styles.ratingBadge}>
                  <Star color="#F59E0B" size={12} fill="#F59E0B" />
                  <Text style={styles.ratingText}>{tutor.rating}</Text>
                </View>
              </View>
              <Text style={styles.tutorSubject}>{tutor.subject}</Text>
              <Text style={styles.tutorBio} numberOfLines={2}>{tutor.bio}</Text>

              <View style={styles.tutorFooter}>
                <Text style={styles.tutorRate}>${tutor.hourlyRate}<Text style={styles.rateUnit}> / hr</Text></Text>
                <TouchableOpacity style={styles.bookBtn} onPress={() => alert(`Booking request sent to ${tutor.name}!`)}>
                  <Text style={styles.bookBtnText}>Book Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    gap: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  tutorCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
  },
  tutorImage: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: Colors.border,
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
    color: Colors.text,
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
    color: Colors.primary,
    marginBottom: 6,
  },
  tutorBio: {
    fontSize: 12,
    color: Colors.textSecondary,
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
    color: Colors.text,
  },
  rateUnit: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  bookBtn: {
    backgroundColor: Colors.primary,
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
