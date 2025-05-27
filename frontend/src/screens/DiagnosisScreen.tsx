import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/diagnosisScreen';
import { useNavigation } from '@react-navigation/native';

interface DiagnosisScreenProps {
  type: 'xray' | 'ultrasound' | 'mri' | 'ct' | 'endoscopy' | 'dental';
}

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

  const sendToAPI = async () => {
    try {
      setIsLoading(true);
      console.log('Starting diagnosis...');
      if (!image) {
        console.error('No image selected');
        return;
      }
      
      console.log('Preparing form data with image:', image.uri);
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'xray.jpg',
      } as any);

      console.log('Sending request to API...');
      const response = await axios.post('http://192.168.1.69:8000/api/diagnose/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log('API Response:', response.data);
      
      // Add the base URL to the image path
      const diagnosisData = {
        ...response.data,
        image: `http://192.168.1.69:8000${response.data.image}`
      };
      
      // Clear the image and navigate to diagnosis details
      setImage(null);
      navigation.navigate('History', {
        screen: 'DiagnosisDetails',
        initial: false,
        params: { diagnosis: diagnosisData }
      });
      
    } catch (error) {
      console.error('Error during diagnosis:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error details:', error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={[styles.content, { zIndex: 1 }]}>
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