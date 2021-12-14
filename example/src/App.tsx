import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StyleSheet, View } from 'react-native';
import ReactNativeShowPasswordView from '@takeoffmedia/react-native-show-password';

export default function App() {
  return (
    <View style={styles.container}>
      <ReactNativeShowPasswordView
        style={styles.box}
        inputStyle={styles.input}
        icon={{
          visible: () => <Icon name={'visibility'} size={25} color={'black'} />,
          hidden: () => (
            <Icon name={'visibility-off'} size={25} color={'black'} />
          ),
        }}
        placeholder="Password"
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
    padding: 20,
  },
  box: {
    width: '100%',
    height: 50,
  },
  input: {
    fontSize: 8,
  },
});
