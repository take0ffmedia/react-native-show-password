import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { ReactNativeShowPasswordView } from '@takeoffmedia/react-native-show-password';

export default function App() {
  return (
    <View style={styles.container}>
      <ReactNativeShowPasswordView
        style={(styles.box, { height: 50, width: 300, backgroundColor: 'red' })}
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
    width: 360,
    height: 60,
    marginVertical: 20,
  },
});
