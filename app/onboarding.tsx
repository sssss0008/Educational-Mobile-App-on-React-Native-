import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { useStore } from '../src/store/useStore';
import { ArrowRight, BookOpen, Award, Sparkles } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'World-Class Expert Courses',
    description: 'Learn computer science, quantum physics, advanced mathematics, and history from elite instructors.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    icon: BookOpen,
  },
  {
    id: '2',
    title: 'Smart Spaced Repetition & Quizzes',
    description: 'Optimize long-term memory retention with built-in SM-2 spaced repetition algorithms and interactive quizzes.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    icon: Award,
  },
  {
    id: '3',
    title: 'AI Tutor & Active Community',
    description: 'Get instant 24/7 answers from your personal AI tutor and collaborate with global learners.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    icon: Sparkles,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const completeOnboarding = useStore((state) => state.completeOnboarding);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const slide = SLIDES[currentIndex];
  const IconComponent = slide.icon;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Image source={{ uri: slide.image }} style={styles.image} />
      <View style={styles.gradientOverlay} />

      <View style={styles.topBar}>
        <View style={styles.logoBadge}>
          <Sparkles color={Colors.primary} size={16} />
          <Text style={styles.logoText}>EduPro AI</Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <IconComponent color={Colors.primary} size={28} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          <ArrowRight color="#FFFFFF" size={20} />
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
  image: {
    position: 'absolute',
    width: width,
    height: height * 0.58,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: height * 0.58,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  logoText: {
    fontWeight: '800',
    color: Colors.primary,
    fontSize: 13,
  },
  skipText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.46,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
