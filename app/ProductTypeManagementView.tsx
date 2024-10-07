import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Image, Modal } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import ViewWrapper from './components/ViewWrapper';

type ProductTypeManagementNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductTypeManagement'>;

const ProductTypeManagementView: React.FC = () => {
  const [productTypes, setProductTypes] = useState([
    { id: '1', name: 'Tipo 1' },
    { id: '2', name: 'Tipo 2' },
    { id: '3', name: 'Tipo 3' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTypeModalVisible, setIsAddTypeModalVisible] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');

  const handleAddProductType = () => {
    setIsAddTypeModalVisible(true);
  };

  const handleSaveProductType = () => {
    if (newTypeName.trim()) {
      const newType = { id: Date.now().toString(), name: newTypeName.trim() };
      setProductTypes([...productTypes, newType]);
      setIsAddTypeModalVisible(false);
      setNewTypeName('');
      Alert.alert('Éxito', 'Tipo de producto agregado exitosamente');
    } else {
      Alert.alert('Error', 'Por favor, ingrese un nombre para el tipo de producto');
    }
  };

  const handleDeleteProductType = (id: string) => {
    setProductTypes(productTypes.filter(type => type.id !== id));
  };

  const filteredProductTypes = productTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ViewWrapper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>GESTIÓN TIPO DE PRODUCTOS</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Tipo de Productos"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <FlatList
          data={filteredProductTypes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.typeItem}>
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => handleDeleteProductType(item.id)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddProductType}
        >
          <Text style={styles.buttonText}>AGREGAR TIPO DE PRODUCTO</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isAddTypeModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddTypeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NUEVO TIPO DE PRODUCTO</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Tipo de Producto"
              value={newTypeName}
              onChangeText={setNewTypeName}
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProductType}>
                <Text style={styles.buttonText}>GUARDAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAddTypeModalVisible(false)}>
                <Text style={styles.buttonText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FA5F55',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'black',
  },
  typeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
});

export default ProductTypeManagementView;