import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { QUIZ_QUESTIONS } from '../../src/data/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react-native';

export default function QuizDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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
    }
  };

  if (isCompleted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.successCard}>
          <Award color={Colors.primary} size={64} style={{ marginBottom: 16 }} />
          <Text style={styles.successTitle}>Quiz Completed!</Text>
          <Text style={styles.successSub}>
            You scored {score} out of {QUIZ_QUESTIONS.length} correct.
          </Text>
          <TouchableOpacity style={styles.finishBtn} onPress={() => router.back()}>
            <Text style={styles.finishBtnText}>Back to Practice</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={20} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsList}>
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctIndex;
            let optionStyle = styles.optionCard;
            if (selectedOption !== null) {
              if (isCorrect) optionStyle = [styles.optionCard, styles.optionCorrect];
              else if (isSelected) optionStyle = [styles.optionCard, styles.optionIncorrect];
            }

            return (
              <TouchableOpacity
                key={idx}
                style={optionStyle}
                onPress={() => handleSelectOption(idx)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionText}>{option}</Text>
                {selectedOption !== null && isCorrect && <CheckCircle2 color={Colors.success} size={20} />}
                {selectedOption !== null && isSelected && !isCorrect && <XCircle color={Colors.error} size={20} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOption !== null && (
          <View style={styles.explanationBox}>
            <Text style={styles.expTitle}>Explanation:</Text>
            <Text style={styles.expText}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {selectedOption !== null && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
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
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  topBarTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 },
  questionText: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 24, lineHeight: 28 },
  optionsList: { gap: 12, marginBottom: 20 },
  optionCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.border },
  optionCorrect: { backgroundColor: '#D1FAE5', borderColor: '#34D399' },
  optionIncorrect: { backgroundColor: '#FEE2E2', borderColor: '#F87171' },
  optionText: { fontSize: 15, fontWeight: '600', color: Colors.text, flex: 1 },
  explanationBox: { backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.border, marginTop: 10 },
  expTitle: { fontSize: 14, fontWeight: '800', color: Colors.primary, marginBottom: 4 },
  expText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.surface, paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: Colors.border },
  nextBtn: { backgroundColor: Colors.primary, borderRadius: 14, height: 50, justifyContent: 'center', alignItems: 'center' },
  nextBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  successCard: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, backgroundColor: Colors.background },
  successTitle: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 8 },
  successSub: { fontSize: 15, color: Colors.textSecondary, marginBottom: 24, textAlign: 'center' },
  finishBtn: { backgroundColor: Colors.primary, width: '100%', height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  finishBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
