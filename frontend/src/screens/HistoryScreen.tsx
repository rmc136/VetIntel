import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Modal,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/historyScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface DiagnosisRecord {
  id: string;
  date: string;
  image: string;
  ai_analysis: string;
  result: string;
  created_at: string;
}

export const HistoryScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState<DiagnosisRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching diagnoses...');
      const response = await axios.get('http://192.168.1.69:8000/api/diagnoses/history/');
      console.log('Response:', response.data);
      setHistory(response.data);
    } catch (err) {
      console.error('Error fetching history:', err);
      if (axios.isAxiosError(err)) {
        console.error('API Error details:', err.response?.data);
        console.error('API Error status:', err.response?.status);
      }
      setError('Failed to load diagnosis history');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: DiagnosisRecord }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        // @ts-ignore - Ignore navigation typing issues for now
        navigation.navigate('DiagnosisDetails', { diagnosis: item });
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            setSelectedImage(item.image);
          }}
        >
          <Image 
            source={{ uri: item.image }} 
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Diagnosis:</Text>
          <Text style={styles.resultText}>{item.ai_analysis}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <AnimatedBackground />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading diagnoses...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={styles.content}>
        <Text style={styles.title}>Diagnosis History</Text>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            onRefresh={fetchHistory}
            refreshing={isLoading}
          />
        ) : (
          <Text style={styles.emptyText}>No diagnosis history yet</Text>
        )}
      </View>

      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
        animationType="fade"
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setSelectedImage(null)}
          >
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
}; 