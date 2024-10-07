import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';
import DropdownMenu from './DropdownMenu';

type ViewWrapperNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ViewWrapperProps {
  children: React.ReactNode;
}

const ViewWrapper: React.FC<ViewWrapperProps> = ({ children }) => {
  const navigation = useNavigation<ViewWrapperNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
            <Image source={require('../../assets/home.png')} style={styles.homeIcon} />
          </TouchableOpacity>
          <DropdownMenu />
        </View>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FA5F55',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 1000,
    elevation: 1000,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  homeIcon: {
    width: 24,
    height: 24,
  },
});

export default ViewWrapper;