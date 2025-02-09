import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ElementDescription } from '../data/elementDescriptions';

interface ElementModalProps {
  isVisible: boolean;
  element: ElementDescription | null;
  onClose: () => void;
}

const ElementModal: React.FC<ElementModalProps> = ({ isVisible, element, onClose }) => {
  if (!element) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.modalTitle}>{element.name}</Text>
            <View style={styles.elementInfo}>
              <View style={styles.symbolContainer}>
                <Text style={styles.symbol}>{element.symbol}</Text>
                <Text style={styles.atomicNumber}>#{element.atomicNumber}</Text>
              </View>
              
              <View style={styles.detailsContainer}>
                <DetailRow label="Category" value={element.category} />
                <DetailRow label="Atomic Mass" value={element.atomicMass} />
                <DetailRow label="Electron Configuration" value={element.electronConfiguration} />
                {element.electronegativity && (
                  <DetailRow label="Electronegativity" value={element.electronegativity} />
                )}
                {element.discoveredBy && (
                  <DetailRow label="Discovered By" value={element.discoveredBy} />
                )}
                {element.yearDiscovered && (
                  <DetailRow label="Year Discovered" value={element.yearDiscovered} />
                )}
              </View>

              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{element.description}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '90%',
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
  scrollView: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2196F3',
  },
  elementInfo: {
    width: '100%',
    alignItems: 'center',
  },
  symbolContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  symbol: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  atomicNumber: {
    fontSize: 20,
    color: '#3B82F6',
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexWrap: 'nowrap',
  },
  detailLabel: {
    fontSize: 11,
    color: '#4B5563',
    flex: 1,
    marginRight: 10,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    flex: 2,
    textAlign: 'right',
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#374151',
    flexWrap: 'wrap',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    minWidth: 100,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 4,
    whiteSpace: 'nowrap',
  },
  propertyContainer: {
    marginBottom: 12,
    width: '100%',
  },
});

export default ElementModal;
