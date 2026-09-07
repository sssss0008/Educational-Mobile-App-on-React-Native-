import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { LESSONS } from '../../src/data/mockData';
import { ArrowLeft, Play, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react-native';

export default function LessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const lesson = LESSONS.find((l) => l.id === id) || LESSONS[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={20} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>{lesson.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Video Player Simulation Box */}
        <View style={styles.videoPlayer}>
          <View style={styles.playCircle}>
            <Play color="#FFFFFF" size={32} fill="#FFFFFF" />
          </View>
          <Text style={styles.videoDuration}>{lesson.duration}</Text>
        </View>

        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonCategory}>Module 1 • {lesson.type.toUpperCase()}</Text>

        <View style={styles.divider} />

        <Text style={styles.paragraph}>
          In this comprehensive lesson, we dive deep into the fundamental architecture and principles. You will learn step-by-step how to structure your code, handle asynchronous events, and optimize rendering performance.
        </Text>
        <Text style={styles.paragraph}>
          Follow along with the code examples and practice exercises provided below to solidify your understanding before taking the module quiz.
        </Text>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navBtn}>
          <ChevronLeft color={Colors.text} size={20} />
          <Text style={styles.navBtnText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.nextBtn]} onPress={() => router.push('/(tabs)/quiz')}>
          <Text style={[styles.navBtnText, styles.nextText]}>Complete & Quiz</Text>
          <ChevronRight color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
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
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    maxWidth: '65%',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 10,
  },
  videoPlayer: {
    width: '100%',
    height: 220,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  videoDuration: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  lessonCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  nextText: {
    color: '#FFFFFF',
  },
});
