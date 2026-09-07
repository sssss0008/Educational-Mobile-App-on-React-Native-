import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { QUIZ_QUESTIONS } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { ArrowLeft, CheckCircle2, XCircle, Award, Zap } from 'lucide-react-native';

export default function QuizDetailScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { id } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const updateFlashcardMastery = useStore((state) => state.updateFlashcardMastery);

  const question = QUIZ_QUESTIONS[currentIndex] || QUIZ_QUESTIONS[0];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      if (id) {
        updateFlashcardMastery(id as string, Math.round((score / QUIZ_QUESTIONS.length) * 5));
      }
    }
  };

  if (isCompleted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
        <View style={styles.successCard}>
          <Award color={colors.primary} size={64} style={{ marginBottom: 16 }} />
          <Text style={[styles.successTitle, { color: colors.text }]}>Quiz Completed & SM-2 Updated!</Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            You scored {score} out of {QUIZ_QUESTIONS.length} correct. Spaced repetition schedule adjusted.
          </Text>
          <TouchableOpacity style={[styles.finishBtn, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
            <Text style={styles.finishBtnText}>Back to Practice</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.questionText, { color: colors.text }]}>{question.question}</Text>

        <View style={styles.optionsList}>
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctIndex;
            let optionStyle = [styles.optionCard, { backgroundColor: colors.surface, borderColor: colors.border }];
            if (selectedOption !== null) {
              if (isCorrect) optionStyle = [styles.optionCard, { backgroundColor: '#D1FAE5', borderColor: '#34D399' }];
              else if (isSelected) optionStyle = [styles.optionCard, { backgroundColor: '#FEE2E2', borderColor: '#F87171' }];
            }

            return (
              <TouchableOpacity
                key={idx}
                style={optionStyle}
                onPress={() => handleSelectOption(idx)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                {selectedOption !== null && isCorrect && <CheckCircle2 color={colors.success} size={20} />}
                {selectedOption !== null && isSelected && !isCorrect && <XCircle color={colors.error} size={20} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOption !== null && (
          <View style={[styles.explanationBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.expTitle, { color: colors.primary }]}>Explanation & SM-2 Insight:</Text>
            <Text style={[styles.expText, { color: colors.textSecondary }]}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {selectedOption !== null && (
        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity style={[styles.nextBtn, { backgroundColor: colors.primary }]} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  iconButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  topBarTitle: { fontSize: 16, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 },
  questionText: { fontSize: 20, fontWeight: '800', marginBottom: 24, lineHeight: 28 },
  optionsList: { gap: 12, marginBottom: 20 },
  optionCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 16, padding: 16, borderWidth: 1 },
  optionText: { fontSize: 15, fontWeight: '600', flex: 1 },
  explanationBox: { borderRadius: 16, padding: 16, borderWidth: 1, marginTop: 10 },
  expTitle: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  expText: { fontSize: 13, lineHeight: 18 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1 },
  nextBtn: { borderRadius: 14, height: 50, justifyContent: 'center', alignItems: 'center' },
  nextBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  successCard: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  successTitle: { fontSize: 24, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  successSub: { fontSize: 15, marginBottom: 24, textAlign: 'center' },
  finishBtn: { width: '100%', height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  finishBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
