import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface SettingsProps {
  isVisible: boolean;
  onClose: () => void;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  isVisible, 
  onClose, 
  volume, 
  onVolumeChange 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.label}>Volume</Text>
            <View style={styles.sliderContainer}>
              <Ionicons name="volume-low" size={20} color="black" />
              <Slider
                style={styles.slider}
                value={volume}
                onValueChange={onVolumeChange}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                minimumTrackTintColor="#2196F3"
                maximumTrackTintColor="#000000"
              />
              <Ionicons name="volume-high" size={20} color="black" />
            </View>
          </View>
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
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  settingItem: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
});
