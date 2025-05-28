import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/diagnosisScreen';
import { useNavigation } from '@react-navigation/native';

interface DiagnosisScreenProps {
  type: 'general' | 'xray' | 'ultrasound' | 'mri' | 'ct' | 'endoscopy' | 'dental';
}
const typeTitles: Record<DiagnosisScreenProps['type'], string> = {
  general: 'General Diagnosis',
  xray: 'X-Ray Diagnosis',
  ultrasound: 'Ultrasound Diagnosis',
  mri: 'MRI Diagnosis',
  ct: 'CT Scan Diagnosis',
  endoscopy: 'Endoscopy Diagnosis',
  dental: 'Dental Diagnosis',
};


export const DiagnosisScreen: React.FC<DiagnosisScreenProps> = ({ type }) => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({ base64: false });
    if (!result.canceled) {
      setImage(result.assets[0]);
      console.log('Image selected:', result.assets[0]);
    }
  };
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const sendToAPI = async () => {
    try {
      setIsLoading(true);
      if (!image) return;
  
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `${type}.jpg`,
      } as any);
  
      // Construct the endpoint based on the type
      const endpoint = `http://192.168.1.69:8000/api/diagnose/${type}/upload/`;
      console.log('Sending to:', endpoint);
      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Response from server:', response.data);

    // Store AI analysis text from the response
      if (response.data) {
        // Navigate to DiagnosisDetailsScreen and pass diagnosis data
        navigation.navigate('History', {
          screen: 'DiagnosisDetails',
          params: {
            diagnosis: {
              id: response.data.id,
              date: response.data.created_at,
              image: response.data.image_url || response.data.image,
              ai_analysis: response.data.ai_analysis || "No analysis available",
              created_at: response.data.created_at,
            },
          },
        });
      }
    } catch (error) {
      // error handling...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={[styles.content, { zIndex: 1 }]}>
        <Text style={styles.screenTitle}>{typeTitles[type]}</Text>
        <AnimatedButton title="Upload Image" onPress={pickImage} />
  
        {image && (
          <>
            <Image source={{ uri: image.uri }} style={styles.image} />
  
            <AnimatedButton
              title={isLoading ? "Diagnosing..." : "Diagnose"}
              onPress={sendToAPI}
              disabled={isLoading}
            />
          </>
        )}
      </View>
    </View>
  );
};