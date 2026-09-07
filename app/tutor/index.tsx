import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { TUTORS } from '../../src/data/mockData';
import { ArrowLeft, Star, Calendar, MessageSquare, Send, Sparkles, Check } from 'lucide-react-native';

export default function TutorScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const bookedTutors = useStore((state) => state.bookedTutors);
  const bookTutor = useStore((state) => state.bookTutor);
  const adminTutors = useStore((state) => state.adminTutors);

  // AI Tutor Chat state
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ai', text: 'Hello! I am your 24/7 EduPro AI Assistant. Ask me anything about mathematics, science, or programming!' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    const userText = inputMsg.trim();
    const newMsg = { id: `${Date.now()}`, sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Simulate AI response
    setTimeout(() => {
      let reply = "That's a great academic question! Breaking it down into core principles helps clarify the mechanism. Let's review the step-by-step formula.";
      if (userText.toLowerCase().includes('react native') || userText.toLowerCase().includes('expo')) {
        reply = "React Native with Expo provides file-system routing via Expo Router and high performance with the Hermes engine.";
      } else if (userText.toLowerCase().includes('calculus') || userText.toLowerCase().includes('math')) {
        reply = "In calculus, derivatives represent instantaneous rates of change, computed using limits and power rules.";
      }
      setMessages(prev => [...prev, { id: `${Date.now() + 1}`, sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>AI Tutor & Expert Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* AI Tutor Chat Section */}
        <View style={[styles.aiCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.aiHeader}>
            <Sparkles color={colors.primary} size={20} />
            <Text style={[styles.aiHeaderTitle, { color: colors.text }]}>EduPro AI Assistant</Text>
          </View>

          <View style={styles.chatBox}>
            {messages.map((m) => (
              <View
                key={m.id}
                style={[
                  styles.msgBubble,
                  m.sender === 'user' ? [styles.userMsg, { backgroundColor: colors.primary }] : [styles.aiMsg, { backgroundColor: colors.background, borderColor: colors.border }]
                ]}
              >
                <Text style={[styles.msgText, m.sender === 'user' ? { color: '#FFFFFF' } : { color: colors.text }]}>{m.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.chatInputRow}>
            <TextInput
              style={[styles.chatInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Ask your AI tutor a question..."
              placeholderTextColor={colors.textSecondary}
              value={inputMsg}
              onChangeText={setInputMsg}
            />
            <TouchableOpacity style={[styles.sendBtn, { backgroundColor: colors.primary }]} onPress={handleSend}>
              <Send color="#FFFFFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Expert Tutors Booking Section */}
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Verified 1-on-1 Expert Tutors</Text>

        {adminTutors.map((tutor) => {
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
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  aiCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  aiHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  chatBox: {
    gap: 10,
    marginBottom: 14,
    maxHeight: 220,
  },
  msgBubble: {
    padding: 12,
    borderRadius: 14,
    maxWidth: '85%',
  },
  userMsg: {
    alignSelf: 'flex-end',
  },
  aiMsg: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 18,
  },
  chatInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chatInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  tutorCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
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
