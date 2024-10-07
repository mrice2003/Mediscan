import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';

type DropdownMenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<DropdownMenuNavigationProp>();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => navigateTo('MainMenu')} style={styles.dropdownItem}>
              <Text>Menú Principal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('ProductManagement')} style={styles.dropdownItem}>
              <Text>Gestión de Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('ProductTypeManagement')} style={styles.dropdownItem}>
              <Text>Gestión Tipo de Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('PriceManagement')} style={styles.dropdownItem}>
              <Text>Gestión de Precios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('UserManagement')} style={styles.dropdownItem}>
              <Text>Gestión de Usuarios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Login')} style={styles.dropdownItem}>
              <Text>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    elevation: 1000,
  },
  menuButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
  },
  menuButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    marginTop: 60,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 8,
  },
});

export default DropdownMenu;