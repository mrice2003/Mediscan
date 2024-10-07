import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import ViewWrapper from './components/ViewWrapper';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'User' | 'Admin';
}

type UserManagementNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;

const UserManagementView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'user1', email: 'user1@example.com', role: 'User' },
    { id: '2', username: 'admin1', email: 'admin1@example.com', role: 'Admin' },
    { id: '3', username: 'user2', email: 'user2@example.com', role: 'User' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<'User' | 'Admin'>('User');
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ username: '', email: '', role: 'User' });

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangeRole = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...user, role: selectedRole } : user
      );
      setUsers(updatedUsers);
      Alert.alert('Éxito', `Rol actualizado para ${selectedUser.username}`);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      Alert.alert('Éxito', `Usuario ${selectedUser.username} eliminado`);
      setSelectedUser(null);
    }
  };

  const handleAddUser = () => {
    if (newUser.username && newUser.email) {
      const newUserWithId: User = { ...newUser, id: Date.now().toString() };
      setUsers([...users, newUserWithId]);
      setIsAddUserModalVisible(false);
      setNewUser({ username: '', email: '', role: 'User' });
      Alert.alert('Éxito', 'Usuario agregado exitosamente');
    } else {
      Alert.alert('Error', 'Por favor, complete todos los campos');
    }
  };

  return (
    <ViewWrapper>
      <View style={styles.content}>
        <Text style={styles.title}>GESTIÓN DE USUARIOS</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios por nombre o correo"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.userItem,
                selectedUser?.id === item.id && styles.selectedUserItem
              ]}
              onPress={() => setSelectedUser(item)}
            >
              <Text>{item.username}</Text>
              <Text>{item.email}</Text>
              <Text>{item.role}</Text>
            </TouchableOpacity>
          )}
        />
        {selectedUser && (
          <View style={styles.userActions}>
            <Picker
              selectedValue={selectedRole}
              onValueChange={(itemValue: 'User' | 'Admin') => setSelectedRole(itemValue)}
              style={styles.rolePicker}
            >
              <Picker.Item label="Usuario" value="User" />
              <Picker.Item label="Administrador" value="Admin" />
            </Picker>
            <TouchableOpacity style={styles.actionButton} onPress={handleChangeRole}>
              <Text style={styles.buttonText}>CAMBIAR ROL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDeleteUser}>
              <Text style={styles.buttonText}>ELIMINAR USUARIO</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.addButton} onPress={() => setIsAddUserModalVisible(true)}>
          <Text style={styles.buttonText}>AGREGAR USUARIO</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isAddUserModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddUserModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NUEVO USUARIO</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de Usuario"
              value={newUser.username}
              onChangeText={(text) => setNewUser({ ...newUser, username: text })}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={newUser.email}
              onChangeText={(text) => setNewUser({ ...newUser, email: text })}
              placeholderTextColor="#999"
            />
            <Picker
              selectedValue={newUser.role}
              onValueChange={(itemValue: 'User' | 'Admin') => setNewUser({ ...newUser, role: itemValue })}
              style={styles.rolePicker}
            >
              <Picker.Item label="Usuario" value="User" />
              <Picker.Item label="Administrador" value="Admin" />
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddUser}>
                <Text style={styles.buttonText}>GUARDAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAddUserModalVisible(false)}>
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
  content: {
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
  userItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  selectedUserItem: {
    backgroundColor: '#e5e7eb',
  },
  userActions: {
    marginTop: 16,
  },
  rolePicker: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButton: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
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
    marginBottom: 8,
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

export default UserManagementView;