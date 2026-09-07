import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { LESSONS } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { ArrowLeft, Play, CheckCircle2, ChevronRight, ChevronLeft, FileText, Check } from 'lucide-react-native';

export default function LessonScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { id } = useLocalSearchParams();
  const lesson = LESSONS.find((l) => l.id === id) || LESSONS[0];

  const notes = useStore((state) => state.notes);
  const saveNote = useStore((state) => state.saveNote);
  const [currentNote, setCurrentNote] = useState(notes[lesson.id] || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveNote = () => {
    saveNote(lesson.id, currentNote);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]} numberOfLines={1}>{lesson.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Video Player Simulation Box */}
        <View style={styles.videoPlayer}>
          <View style={[styles.playCircle, { backgroundColor: colors.primary }]}>
            <Play color="#FFFFFF" size={32} fill="#FFFFFF" />
          </View>
          <Text style={styles.videoDuration}>{lesson.duration}</Text>
        </View>

        <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
        <Text style={[styles.lessonCategory, { color: colors.primary }]}>Module 1 • {lesson.type.toUpperCase()}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          In this comprehensive lesson, we dive deep into the fundamental architecture and principles. You will learn step-by-step how to structure your code, handle asynchronous events, and optimize rendering performance.
        </Text>

        {/* Feature: Personal Lesson Notes */}
        <View style={[styles.notesCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.notesHeader}>
            <FileText color={colors.primary} size={18} />
            <Text style={[styles.notesTitle, { color: colors.text }]}>My Study Notes</Text>
          </View>
          <TextInput
            style={[styles.notesInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
            placeholder="Type your personal notes for this lesson here..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
            value={currentNote}
            onChangeText={setCurrentNote}
          />
          <TouchableOpacity style={[styles.saveNoteBtn, { backgroundColor: colors.primary }]} onPress={handleSaveNote}>
            {savedSuccess ? <Check color="#FFFFFF" size={16} /> : null}
            <Text style={styles.saveNoteText}>{savedSuccess ? 'Saved!' : 'Save Note'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={20} />
          <Text style={[styles.navBtnText, { color: colors.text }]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.nextBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/(tabs)/quiz')}>
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
    fontSize: 16,
    fontWeight: '700',
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
    marginBottom: 4,
  },
  lessonCategory: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  notesCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  notesTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  notesInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    height: 90,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  saveNoteBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    gap: 6,
  },
  saveNoteText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
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
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  nextBtn: {
    borderWidth: 0,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  nextText: {
    color: '#FFFFFF',
  },
});
