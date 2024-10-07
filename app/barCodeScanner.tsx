import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { BrowserMultiFormatReader } from '@zxing/library'; // For Web
import { BarCodeScanner } from 'expo-barcode-scanner'; // For Mobile

const BarcodeScanner: React.FC<{ onClose: () => void; onScan: (value: string) => void }> = ({ onClose, onScan }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Web scanner setup
      const scanner = new BrowserMultiFormatReader();
      const decodeFromVideoDevice = async () => {
        try {
          const result = await scanner.decodeOnceFromVideoDevice(null, 'video');
          onScan(result.text);
          onClose(); // Close scanner after successful scan
        } catch (err) {
          console.error(err);
        }
      };

      decodeFromVideoDevice();

      return () => {
        scanner.reset();
      };
    } else {
      // Mobile scanner setup
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };

      getBarCodeScannerPermissions();
    }
  }, [onClose, onScan]);

  // Web Rendering
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.scannerTitle}>Escanear Código de Barras</Text>
        <video id="video" style={{ width: '100%' }} />
        <Button title="Cerrar" onPress={onClose} />
      </View>
    ); 
  }

  // Mobile Rendering
  if (Platform.OS !== 'web') {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission...</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={({ data }) => {
            onScan(data);
            onClose(); // Close scanner after successful scan
          }}
          style={{ height: 400, width: 400 }}
        />
        <Button title="Cerrar" onPress={onClose} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default BarcodeScanner;
