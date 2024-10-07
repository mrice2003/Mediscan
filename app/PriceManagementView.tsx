import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ViewWrapper from './components/ViewWrapper';

const PriceManagementView: React.FC = () => {
  const totalValue = 1000000; // Example value in MXN
  const pharmaceuticalTypes = [
    { name: 'Antibióticos', value: 250000 },
    { name: 'Analgésicos', value: 150000 },
    { name: 'Vitaminas', value: 100000 },
    { name: 'Antidepresivos', value: 200000 },
    { name: 'Otros', value: 300000 },
  ];

  return (
    <ViewWrapper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>GESTIÓN DE PRECIOS</Text>
        <Text style={styles.totalValue}>Valor Monetario Total: ${totalValue.toLocaleString()} MXN</Text>
        <Text style={styles.subtitle}>Tipos de Farmacéuticos:</Text>
        <ScrollView>
          {pharmaceuticalTypes.map((type, index) => (
            <View key={index} style={styles.typeItem}>
              <Text style={styles.typeName}>{type.name}</Text>
              <Text style={styles.typeValue}>${type.value.toLocaleString()} MXN</Text>
            </View>
          ))}
        </ScrollView>
      </View>
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
  totalValue: {
    fontSize: 18,
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  typeItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  typeName: {
    fontWeight: 'bold',
  },
  typeValue: {
    marginTop: 4,
  },
});

export default PriceManagementView;

