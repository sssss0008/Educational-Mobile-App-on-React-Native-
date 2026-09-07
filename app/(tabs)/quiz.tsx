import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { Award, ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react-native';

export default function QuizScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const flashcardMastery = useStore((state) => state.flashcardMastery);

  const quizzes = [
    { id: 'q-1', title: 'React Native & Expo Mastery Quiz', questions: 10, time: '15 mins', category: 'Computer Science' },
    { id: 'q-2', title: 'Calculus & Derivatives Practice', questions: 12, time: '20 mins', category: 'Mathematics' },
    { id: 'q-3', title: 'Quantum Mechanics Concepts', questions: 8, time: '10 mins', category: 'Physics' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Practice & SM-2 Review</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Boost long-term memory retention with spaced repetition</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {quizzes.map((q) => {
          const masteryGrade = flashcardMastery[q.id];
          return (
            <TouchableOpacity
              key={q.id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => router.push(`/quiz/${q.id}`)}
            >
              <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
                <Award color={colors.primary} size={24} />
              </View>
              <View style={styles.info}>
                <Text style={[styles.cat, { color: colors.primary }]}>{q.category}</Text>
                <Text style={[styles.titleCard, { color: colors.text }]}>{q.title}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <CheckCircle2 color={colors.textSecondary} size={12} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{q.questions} Questions</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock color={colors.textSecondary} size={12} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{q.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightSide}>
                {masteryGrade !== undefined ? (
                  <View style={styles.masteryBadge}>
                    <Zap color="#F59E0B" size={14} fill="#F59E0B" />
                    <Text style={styles.masteryText}>SM-2: {masteryGrade}/5</Text>
                  </View>
                ) : (
                  <Text style={[styles.scoreText, { color: colors.textSecondary }]}>Start Quiz</Text>
                )}
                <ArrowRight color={colors.textSecondary} size={18} />
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
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  listContainer: {
    gap: 14,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  cat: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  titleCard: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  rightSide: {
    alignItems: 'flex-end',
    gap: 6,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
  },
  masteryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  masteryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
});
