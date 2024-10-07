import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ViewWrapper from './components/ViewWrapper';
import BarcodeScanner from './barCodeScanner'; // Ensure the path is correct

const ProductManagementView: React.FC = () => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Producto 1' },
    { id: '2', name: 'Producto 2' },
    { id: '3', name: 'Producto 3' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    barcode: '',
    name: '',
    description: '',
    type: '',
    price: '',
    expirationDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isScannerVisible, setIsScannerVisible] = useState(false); // State for scanner visibility

  const handleAddProduct = () => {
    setIsAddProductModalVisible(true);
  };

  const handleSaveProduct = () => {
    const newProductWithId = { ...newProduct, id: Date.now().toString() };
    setProducts([...products, newProductWithId]);
    setIsAddProductModalVisible(false);
    setNewProduct({ barcode: '', name: '', description: '', type: '', price: '', expirationDate: new Date() });
    Alert.alert('Éxito', 'Producto agregado exitosamente');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleScanBarcode = () => {
    setIsScannerVisible(true); // Show the barcode scanner
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewProduct({ ...newProduct, expirationDate: selectedDate });
    }
  };

  // This function will handle the scanned value from the BarcodeScanner
  const handleBarcodeScanned = (scannedValue: string) => {
    setNewProduct({ ...newProduct, barcode: scannedValue });
    setIsScannerVisible(false); // Close the scanner modal after a successful scan
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ViewWrapper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>GESTIÓN DE PRODUCTOS</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Producto"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddProduct}
        >
          <Text style={styles.buttonText}>AGREGAR PRODUCTO</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isAddProductModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddProductModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NUEVO PRODUCTO</Text>
            <TextInput
              style={styles.input}
              placeholder="Nuevo Texto Aquí" // Change this text as needed
              placeholderTextColor="#999"
              value={newProduct.barcode}
              onChangeText={(text) => setNewProduct({ ...newProduct, barcode: text })}
            />
            <TouchableOpacity style={styles.scanButton} onPress={handleScanBarcode}>
              <Text style={styles.buttonText}>ESCANEAR CÓDIGO</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Nombre Producto"
              placeholderTextColor="#999"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción Producto"
              placeholderTextColor="#999"
              value={newProduct.description}
              onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
            />
            <Picker
              selectedValue={newProduct.type}
              onValueChange={(itemValue) => setNewProduct({ ...newProduct, type: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Tipo Producto" value="" />
              <Picker.Item label="Tipo 1" value="tipo1" />
              <Picker.Item label="Tipo 2" value="tipo2" />
              <Picker.Item label="Tipo 3" value="tipo3" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Precio Producto"
              placeholderTextColor="#999"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {newProduct.expirationDate.toLocaleDateString() || 'Fecha de Caducidad'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={newProduct.expirationDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
                <Text style={styles.buttonText}>GUARDAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAddProductModalVisible(false)}>
                <Text style={styles.buttonText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Barcode Scanner Modal */}
      {isScannerVisible && (
        <Modal
          visible={isScannerVisible}
          animationType="slide"
          onRequestClose={() => setIsScannerVisible(false)}
        >
          <BarcodeScanner 
            onClose={() => setIsScannerVisible(false)} 
            onScan={handleBarcodeScanned} // Pass the scanned value to handleBarcodeScanned
          />
        </Modal>
      )}
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
    padding: 10,
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    color: '#000',
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  picker: {
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default ProductManagementView;
