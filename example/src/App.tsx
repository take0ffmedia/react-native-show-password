import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import ReactNativeShowPasswordView from '@takeoffmedia/react-native-show-password';

export default function App() {
  return (
    <View style={styles.container}>
      <ReactNativeShowPasswordView
        style={styles.box}
        onChange={(value) => console.log('change', value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    height: 50,
    // backgroundColor: '#D3D',
  },
});
