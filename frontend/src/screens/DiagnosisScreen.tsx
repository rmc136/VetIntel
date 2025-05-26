import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { styles } from '../styles/screens/diagnosisScreen';

export const DiagnosisScreen = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [result, setResult] = useState(null);

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
      const res = await axios.post('http://192.168.1.69:8000/api/diagnose/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log('API Response:', res.data);
      setResult(res.data.result);
    } catch (error) {
      console.error('Error during diagnosis:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error details:', error.response?.data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={[styles.content, { zIndex: 1 }]}>
        <AnimatedButton title="Upload X-ray Image" onPress={pickImage} />

        {image && (
          <>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <AnimatedButton title="Diagnose" onPress={sendToAPI} />
          </>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultText, { 
              color: '#FFFFFF',
              fontFamily: 'System',
              fontSize: 18,
              fontWeight: '500'
            }]}>
              Diagnosis: {result}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}; 