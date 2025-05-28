import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { useRoute, useNavigation } from '@react-navigation/native';

interface DiagnosisDetailsParams {
  diagnosis: {
    id: string;
    ai_analysis: string;
    date: string;
    image: string;
    result: string;
    created_at: string;
  };
}

export const DiagnosisDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { diagnosis } = route.params as DiagnosisDetailsParams;
  const [isImageModalVisible, setIsImageModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <ScrollView style={styles.content}>
        <Text style={styles.date}>
          {new Date(diagnosis.created_at).toLocaleString()}
        </Text>
        
        <TouchableOpacity 
          onPress={() => setIsImageModalVisible(true)}
          style={styles.imageContainer}
        >
          <Image 
            source={{ uri: diagnosis.image }} 
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>Diagnosis Result:</Text>
          <Text style={styles.resultText}>{diagnosis.ai_analysis}</Text>
        </View>
      </ScrollView>

      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={() => setIsImageModalVisible(false)}
        animationType="fade"
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setIsImageModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: diagnosis.image }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultSection: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
    opacity: 0.8,
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    padding: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 