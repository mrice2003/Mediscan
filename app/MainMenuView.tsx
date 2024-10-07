import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import ViewWrapper from './components/ViewWrapper';

type MainMenuNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuView: React.FC = () => {
  const navigation = useNavigation<MainMenuNavigationProp>();

  // This is a placeholder function. In a real app, you'd check the user's role from your auth system.
  const isAdmin = () => {
    // Replace this with actual role checking logic
    return true; // For now, we'll assume all users are admins
  };

  const navigateToUserManagement = () => {
    if (isAdmin()) {
      navigation.navigate('UserManagement');
    } else {
      Alert.alert('Acceso Denegado', 'Solo los administradores pueden acceder a la gestión de usuarios.');
    }
  };

  return (
    <ViewWrapper>
      <View style={styles.content}>
        <Image source={require('../assets/mediscan-logo.png')} style={styles.logo} />
        <Text style={styles.title}>MENÚ PRINCIPAL</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductManagement')}
        >
          <Text style={styles.buttonText}>GESTIÓN DE PRODUCTOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PriceManagement')}
        >
          <Text style={styles.buttonText}>GESTIÓN DE PRECIOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductTypeManagement')}
        >
          <Text style={styles.buttonText}>GESTIÓN TIPO DE PRODUCTOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToUserManagement}
        >
          <Text style={styles.buttonText}>GESTIÓN DE USUARIOS</Text>
        </TouchableOpacity>
      </View>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FA5F55',
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainMenuView;