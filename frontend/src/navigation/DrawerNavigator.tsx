import React, { useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DiagnosisScreen } from '../screens/DiagnosisScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { DiagnosisDetailsScreen } from '../screens/DiagnosisDetailsScreen';
import { MenuButton } from '../components/MenuButton';
import { View, TouchableOpacity, Text } from 'react-native';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, navigatorOptions } from '../styles/navigation/drawerNavigator';
import { useNavigation, useIsFocused, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Create separate screens for each type of diagnosis
const XRayDiagnosisScreen = () => <DiagnosisScreen type="xray" />;
const UltrasoundDiagnosisScreen = () => <DiagnosisScreen type="ultrasound" />;
const MRIDiagnosisScreen = () => <DiagnosisScreen type="mri" />;
const CTDiagnosisScreen = () => <DiagnosisScreen type="ct" />;
const EndoscopyDiagnosisScreen = () => <DiagnosisScreen type="endoscopy" />;
const DentalDiagnosisScreen = () => <DiagnosisScreen type="dental" />;

// Diagnosis Stack Navigator
const DiagnosisStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="XRayDiagnosis" 
        component={XRayDiagnosisScreen}
        options={{ title: 'X-Ray Diagnosis' }}
      />
      <Stack.Screen name="UltrasoundDiagnosis" 
        component={UltrasoundDiagnosisScreen}
        options={{ title: 'Ultrasound Diagnosis' }}
      />
      <Stack.Screen name="MRIDiagnosis" 
        component={MRIDiagnosisScreen}
        options={{ title: 'MRI Diagnosis' }}
      />
      <Stack.Screen name="CTDiagnosis" 
        component={CTDiagnosisScreen}
        options={{ title: 'CT Diagnosis' }}
      />
      <Stack.Screen name="EndoscopyDiagnosis" 
        component={EndoscopyDiagnosisScreen}
        options={{ title: 'Endoscopy Diagnosis' }}
      />
      <Stack.Screen name="DentalDiagnosis" 
        component={DentalDiagnosisScreen}
        options={{ title: 'Dental Diagnosis' }}
      />
    </Stack.Navigator>
  );
};

// Custom drawer content
const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const [isDiagnosisExpanded, setIsDiagnosisExpanded] = React.useState(false);

  const diagnosisOptions = [
    { name: 'XRayDiagnosis', title: 'X-Ray' },
    { name: 'UltrasoundDiagnosis', title: 'Ultrasound' },
    { name: 'MRIDiagnosis', title: 'MRI' },
    { name: 'CTDiagnosis', title: 'CT Scan' },
    { name: 'EndoscopyDiagnosis', title: 'Endoscopy' },
    { name: 'DentalDiagnosis', title: 'Dental' },
  ];

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.drawerItemText}>Welcome</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => setIsDiagnosisExpanded(!isDiagnosisExpanded)}
      >
        <View style={styles.drawerItemHeader}>
          <Text style={styles.drawerItemText}>Diagnose</Text>
          <Ionicons 
            name={isDiagnosisExpanded ? 'chevron-up' : 'chevron-down'} 
            size={24} 
            color="#fff" 
          />
        </View>
      </TouchableOpacity>

      {isDiagnosisExpanded && (
        <View style={styles.subMenu}>
          {diagnosisOptions.map((option) => (
            <TouchableOpacity
              key={option.name}
              style={styles.subMenuItem}
              onPress={() => navigation.navigate('DiagnosisStack', { screen: option.name })}
            >
              <Text style={styles.subMenuItemText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.drawerItemText}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

// Wrap History screen with stack navigator to add details screen
const HistoryStack = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const isInitialMount = useRef(true);
  const shouldResetOnFocus = useRef(false);
  const isFromDiagnosis = useRef(false);

  // Handle initial mount and focus changes
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isFocused) {
      if (shouldResetOnFocus.current && !isFromDiagnosis.current) {
        console.log('History tab focused - resetting to list view');
        navigation.getState().routes.forEach((route: any) => {
          if (route.name === 'History' && route.state?.routes) {
            const historyNavigation = navigation.getParent();
            if (historyNavigation) {
              historyNavigation.navigate('History', {
                screen: 'HistoryList'
              });
            }
          }
        });
        shouldResetOnFocus.current = false;
      } else if (isFromDiagnosis.current) {
        console.log('Coming from diagnosis - navigating to details');
        const historyNavigation = navigation.getParent();
        if (historyNavigation) {
          historyNavigation.navigate('History', {
            screen: 'DiagnosisDetails'
          });
        }
        isFromDiagnosis.current = false;
      }
    }
  }, [isFocused, navigation]);

  // Monitor navigation state changes
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e: any) => {
      const currentRoute = e.data.state?.routes[e.data.state?.index];
      const prevRoute = e.data.state?.routes[e.data.state?.index - 1];
      
      console.log('Navigation State Change in History Stack:');
      console.log('Current Route:', currentRoute?.name);
      console.log('Previous Route:', prevRoute?.name);
      console.log('Is History Focused:', isFocused);

      // Coming from Diagnosis screen
      if (prevRoute?.name === 'Diagnose' && currentRoute?.name === 'History') {
        console.log('Setting diagnosis flag');
        isFromDiagnosis.current = true;
        shouldResetOnFocus.current = false;
      }
      
      // Leaving History tab
      if (currentRoute?.name !== 'History' && prevRoute?.name === 'History') {
        console.log('Left History tab - marking for reset');
        shouldResetOnFocus.current = true;
        isFromDiagnosis.current = false;
      }
    });

    return unsubscribe;
  }, [navigation, isFocused]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="HistoryList" 
        component={HistoryScreen}
        listeners={{
          focus: () => {
            console.log('HistoryList focused');
          },
          blur: () => {
            console.log('HistoryList blurred');
          }
        }}
      />
      <Stack.Screen 
        name="DiagnosisDetails" 
        component={DiagnosisDetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Diagnosis Details',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => {
                console.log('Back button pressed in details');
                const parentNavigation = navigation.getParent();
                if (parentNavigation) {
                  parentNavigation.navigate('History', {
                    screen: 'HistoryList'
                  });
                }
              }}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
        listeners={{
          focus: () => {
            console.log('DiagnosisDetails focused');
          },
          blur: () => {
            console.log('DiagnosisDetails blurred');
          }
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <Drawer.Navigator
        initialRouteName="Welcome"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerBackground: () => (
            <LinearGradient
              colors={navigatorOptions.headerBackground.colors}
              style={{ flex: 1 }}
              start={navigatorOptions.headerBackground.start}
              end={navigatorOptions.headerBackground.end}
            />
          ),
          headerStyle: navigatorOptions.headerStyle,
          headerTitle: '',
          headerTitleStyle: navigatorOptions.headerTitleStyle,
          headerLeft: () => <MenuButton />,
          drawerStyle: navigatorOptions.drawerStyle,
          drawerActiveTintColor: navigatorOptions.drawerActiveTintColor,
          drawerInactiveTintColor: navigatorOptions.drawerInactiveTintColor,
          swipeEnabled: navigatorOptions.swipeEnabled,
          swipeEdgeWidth: navigatorOptions.swipeEdgeWidth,
          headerLeftContainerStyle: navigatorOptions.headerLeftContainerStyle,
        }}
      >
        <Drawer.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerTitle: '' }}
        />
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerTitle: '' }}
        />
        <Drawer.Screen 
          name="DiagnosisStack" 
          component={DiagnosisStackNavigator}
          options={{ 
            headerTitle: '',
            drawerLabel: () => null // Hide from drawer since we're using custom drawer content
          }}
        />
        <Drawer.Screen 
          name="History" 
          component={HistoryStack}
          options={{ headerTitle: '' }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNavigator; 