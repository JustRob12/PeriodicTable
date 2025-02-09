import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface CreditsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreditsModal: React.FC<CreditsModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Credits</Text>
          <Text style={styles.introduction}>
            Developed by Roberto M. Prisoris Jr. - Web and App Developer. I also want to thank my Girlfriend(Lady) for keep supporting me.
          </Text>
          <Text style={styles.socialMedia}>
            Follow me on:
          </Text>
          <Text style={styles.socialLink}>Facebook: Roberto Prisoris</Text>
          <Text style={styles.socialLink}>Instagram: me_robbb</Text>
          <Text style={styles.socialLink}>TikTok: me_robbb</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  introduction: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  socialMedia: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialLink: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CreditsModal; 