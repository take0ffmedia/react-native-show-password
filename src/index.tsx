/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useRef, useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextInput,
  NativeModules,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Underline from './lib/Underline';
import FloatingLabel from './lib/FloatingLabel';

const ReactNativeShowPasswordModule =
  NativeModules.ReactNativeShowPasswordViewManager;

const LINKING_ERROR =
  `The package '@takeoffmedia/react-native-show-password' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';
export type ReactNativeShowPasswordMethods = {
  focus(): void;
};

type ReactNativeShowPasswordProps = {
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  isVisible?: boolean;
  error?: boolean;
  returnKeyType?:
    | 'default'
    | 'go'
    | 'google'
    | 'join'
    | 'next'
    | 'route'
    | 'search'
    | 'send'
    | 'yahoo'
    | 'done'
    | 'emergency-call';
  returnKeyTypeProp?: string;
  icon?: {
    visible: () => ReactNode;
    hidden: () => ReactNode;
  };
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  ref?: (ref: ReactNativeShowPasswordMethods) => void;
};

const ComponentName = 'ReactNativeShowPasswordView';

const ReactNativeShowPasswordView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeShowPasswordProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export default React.forwardRef<
  ReactNativeShowPasswordMethods,
  ReactNativeShowPasswordProps
>(
  (
    {
      error,
      placeholder,
      icon,
      style,
      inputStyle,
      onChange: onChangeText,
      returnKeyType,
      ...props
    }: ReactNativeShowPasswordProps,
    _ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const input = useRef(null);
    const underline = useRef(null);
    const floatingLabel = useRef(null);

    function focus() {
      if (floatingLabel.current) {
        (floatingLabel.current as any).floatLabel();
      }
      if (underline.current) {
        (underline.current as any).expandLine();
      }
    }

    function blur() {
      if (floatingLabel.current) {
        (floatingLabel.current as any).sinkLabel();
      }
      if (underline.current) {
        (underline.current as any).shrinkLine();
      }
    }

    return (
      <View
        style={[styles.container, style]}
        onStartShouldSetResponder={() => ReactNativeShowPasswordModule.focus()}
      >
        <TextInput
          style={[styles.container, { marginBottom: 40, height: 40 }]}
          returnKeyType="done"
        />
        <ReactNativeShowPasswordView
          {...{ ...props }}
          style={[style, error ? styles.inputError : {}, styles.input]}
          inputStyle={inputStyle}
          returnKeyTypeProp={returnKeyType}
          isVisible={isVisible}
          onChange={({ nativeEvent }) => {
            onChangeText ? onChangeText(nativeEvent.value) : {};
          }}
          onFocus={() => focus()}
          onBlur={() => blur()}
          ref={input as any}
        />
        <FloatingLabel
          // isFocused={this.state.isFocused}
          ref={floatingLabel}
          focusHandler={() => ReactNativeShowPasswordModule.focus()}
          label={placeholder || ''}
          labelColor={error ? 'red' : 'black'}
          highlightColor={error ? 'red' : 'black'}
          duration={150}
          dense={false}
          // hasValue={false}
          style={styles.labelStyle}
        />
        <Underline
          ref={underline}
          highlightColor={error ? 'red' : 'black'}
          duration={50}
          borderColor={error ? 'red' : 'black'}
        />
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.button}
        >
          {icon ? (
            !isVisible ? (
              icon.visible()
            ) : (
              icon.hidden()
            )
          ) : (
            <Icon
              name={!isVisible ? 'visibility' : 'visibility-off'}
              size={25}
              color="#000"
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'flex-end',
  },
  input: {
    fontSize: 12,
    height: 35,
  },
  inputError: {
    borderColor: 'red',
    fontSize: 12,
  },
  button: {
    width: 40,
    height: '100%',
    alignSelf: 'flex-end',
    zIndex: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    // backgroundColor: 'red',
    // fontSize: 12,
  },
});
