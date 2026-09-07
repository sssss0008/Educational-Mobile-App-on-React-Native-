import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { Award, ArrowRight, CheckCircle2, Clock } from 'lucide-react-native';

export default function QuizScreen() {
  const router = useRouter();
  const quizzes = [
    { id: 'q-1', title: 'React Native & Expo Mastery Quiz', questions: 10, time: '15 mins', category: 'Computer Science', score: '85%' },
    { id: 'q-2', title: 'Calculus & Derivatives Practice', questions: 12, time: '20 mins', category: 'Mathematics', score: 'Not Taken' },
    { id: 'q-3', title: 'Quantum Mechanics Concepts', questions: 8, time: '10 mins', category: 'Physics', score: '92%' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Practice & Quizzes</Text>
        <Text style={styles.subtitle}>Test your knowledge and earn achievement badges</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {quizzes.map((q) => (
          <TouchableOpacity
            key={q.id}
            style={styles.card}
            onPress={() => router.push(`/quiz/${q.id}`)}
          >
            <View style={styles.iconBox}>
              <Award color={Colors.primary} size={24} />
            </View>
            <View style={styles.info}>
              <Text style={styles.cat}>{q.category}</Text>
              <Text style={styles.titleCard}>{q.title}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <CheckCircle2 color={Colors.textSecondary} size={12} />
                  <Text style={styles.metaText}>{q.questions} Questions</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock color={Colors.textSecondary} size={12} />
                  <Text style={styles.metaText}>{q.time}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rightSide}>
              <Text style={[styles.scoreText, q.score !== 'Not Taken' && styles.scoreDone]}>{q.score}</Text>
              <ArrowRight color={Colors.textSecondary} size={18} />
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
    marginBottom: 20,
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
  listContainer: {
    gap: 14,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
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
    color: Colors.primary,
    marginBottom: 2,
  },
  titleCard: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
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
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  rightSide: {
    alignItems: 'flex-end',
    gap: 6,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  scoreDone: {
    color: Colors.success,
  },
});
