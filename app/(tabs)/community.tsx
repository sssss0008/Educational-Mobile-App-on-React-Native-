import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import { DISCUSSIONS } from '../../src/data/mockData';
import { MessageSquare, Heart, Share2, Plus } from 'lucide-react-native';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Student Community</Text>
          <Text style={styles.subtitle}>Ask questions, discuss topics, and help peers</Text>
        </View>
        <TouchableOpacity style={styles.newPostBtn} onPress={() => alert('Create discussion post')}>
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {DISCUSSIONS.map((disc) => (
          <View key={disc.id} style={styles.card}>
            <View style={styles.authorRow}>
              <Image source={{ uri: disc.avatar }} style={styles.avatar} />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{disc.author}</Text>
                <Text style={styles.timeText}>{disc.time}</Text>
              </View>
            </View>

            <Text style={styles.discTitle}>{disc.title}</Text>
            <Text style={styles.discContent}>{disc.content}</Text>

            <View style={styles.divider} />

            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.footerAction}>
                <Heart color={Colors.textSecondary} size={16} />
                <Text style={styles.footerText}>{disc.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerAction}>
                <MessageSquare color={Colors.textSecondary} size={16} />
                <Text style={styles.footerText}>{disc.replies} Replies</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerAction}>
                <Share2 color={Colors.textSecondary} size={16} />
              </TouchableOpacity>
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
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  newPostBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    gap: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
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
    backgroundColor: Colors.border,
  },
  authorInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  discTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  discContent: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
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
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
