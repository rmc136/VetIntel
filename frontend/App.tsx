import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({ base64: false });
    if (!result.canceled) setImage(result.assets[0]);
  };

  const sendToAPI = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'xray.jpg',
    } as any);

    const res = await axios.post('http://localhost:8000/diagnose/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setResult(res.data.result);
  };

  return (
    <View style={{ marginTop: 60, padding: 20 }}>
      <Button title="Pick an X-ray Image" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
      <Button title="Diagnose" onPress={sendToAPI} />
      {result && <Text>Diagnosis: {result}</Text>}
    </View>
  );
}
