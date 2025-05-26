import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { DiagnosisScreen } from '../screens/DiagnosisScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'rgba(255, 255, 255, 0.9)',
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 16,
          paddingTop: 16,
        },
        drawerStyle: {
          backgroundColor: 'rgba(20, 20, 20, 0.98)',
          width: 250,
        },
        drawerLabelStyle: {
          color: '#FFFFFF',
          fontFamily: 'System',
          fontSize: 16,
        },
        drawerActiveBackgroundColor: 'rgba(40, 40, 40, 0.9)',
        drawerInactiveBackgroundColor: 'transparent',
      }}
    >
      <Drawer.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={({ navigation }) => ({
          drawerLabel: 'Home',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={28}
                color="rgba(255, 255, 255, 0.9)"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name="Diagnosis" 
        component={DiagnosisScreen}
        options={({ navigation }) => ({
          drawerLabel: 'X-ray Diagnosis',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={28}
                color="rgba(255, 255, 255, 0.9)"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}; 