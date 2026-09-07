import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Modal, TextInput } from 'react-native';
import { useThemeColors } from '../../src/constants/Colors';
import { useStore } from '../../src/store/useStore';
import { MessageSquare, Heart, Share2, Plus, X } from 'lucide-react-native';

export default function CommunityScreen() {
  const colors = useThemeColors();
  const discussions = useStore((state) => state.discussions);
  const addDiscussion = useStore((state) => state.addDiscussion);
  const likeDiscussion = useStore((state) => state.likeDiscussion);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;
    const newDisc = {
      id: `disc-${Date.now()}`,
      author: 'Alex Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      title,
      content,
      likes: 1,
      replies: 0,
      time: 'Just now',
    };
    addDiscussion(newDisc);
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#090D16' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Student Community</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Ask questions, discuss topics, and help peers</Text>
        </View>
        <TouchableOpacity style={[styles.newPostBtn, { backgroundColor: colors.primary }]} onPress={() => setShowModal(true)}>
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {discussions.map((disc) => (
          <View key={disc.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.authorRow}>
              <Image source={{ uri: disc.avatar }} style={styles.avatar} />
              <View style={styles.authorInfo}>
                <Text style={[styles.authorName, { color: colors.text }]}>{disc.author}</Text>
                <Text style={[styles.timeText, { color: colors.textSecondary }]}>{disc.time}</Text>
              </View>
            </View>

            <Text style={[styles.discTitle, { color: colors.text }]}>{disc.title}</Text>
            <Text style={[styles.discContent, { color: colors.textSecondary }]}>{disc.content}</Text>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.footerAction} onPress={() => likeDiscussion(disc.id)}>
                <Heart color={colors.primary} size={16} fill={colors.primary} />
                <Text style={[styles.footerText, { color: colors.text }]}>{disc.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerAction}>
                <MessageSquare color={colors.textSecondary} size={16} />
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>{disc.replies} Replies</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerAction}>
                <Share2 color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* New Discussion Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Start Discussion</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X color={colors.text} size={22} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Discussion Title"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.inputArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="What would you like to share with the community?"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              value={content}
              onChangeText={setContent}
            />

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handlePost}>
              <Text style={styles.submitBtnText}>Post Discussion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  newPostBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    gap: 16,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 12,
  },
  discTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  discContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 24,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    marginBottom: 12,
  },
  inputArea: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
    height: 120,
    fontSize: 15,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  submitBtn: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
