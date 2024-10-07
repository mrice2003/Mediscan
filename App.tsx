import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import LoginView from './app/LoginView';
import SignUpView from './app/SignUpView';
import MainMenuView from './app/MainMenuView';
import ProductManagementView from './app/ProductManagementView';
import ProductTypeManagementView from './app/ProductTypeManagementView';
import PriceManagementView from './app/PriceManagementView';
import UserManagementView from './app/UserManagementView';
import { RootStackParamList } from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="SignUp" component={SignUpView} />
          <Stack.Screen name="MainMenu" component={MainMenuView} />
          <Stack.Screen name="ProductManagement" component={ProductManagementView} />
          <Stack.Screen name="ProductTypeManagement" component={ProductTypeManagementView} />
          <Stack.Screen name="PriceManagement" component={PriceManagementView} />
          <Stack.Screen name="UserManagement" component={UserManagementView} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FA5F55', // Sunset Orange background color
  },
});
