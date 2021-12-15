/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useImperativeHandle, useRef, useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
  TextStyle,
  StyleProp,
  NativeModules,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Underline from './lib/Underline';
import FloatingLabel from './lib/FloatingLabel';

type ReactNativeShowPasswordModuleMethodsType = {
  ReactNativeShowPasswordViewManager: {
    focus(): void;
  };
};

const {
  ReactNativeShowPasswordViewManager: ReactNativeShowPasswordModule,
}: ReactNativeShowPasswordModuleMethodsType = NativeModules as ReactNativeShowPasswordModuleMethodsType;

export { ReactNativeShowPasswordModule };

const LINKING_ERROR =
  `The package '@takeoffmedia/react-native-show-password' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';
export type ReactNativeShowPasswordMethods = {
  focus(): void;
};

type ReactNativeShowPasswordProps = {
  color?: string;
  errorColor?: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
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
      errorColor = '#ff0000',
      color = '#000',
      placeholder,
      icon,
      style,
      inputStyle,
      labelStyle,
      onChange: onChangeText,
      onBlur,
      returnKeyType,
      ...props
    }: ReactNativeShowPasswordProps,
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState('');
    const input = useRef(null);
    const underline = useRef(null);
    const floatingLabel = useRef(null);

    function focusAnimation() {
      if (floatingLabel.current) {
        (floatingLabel.current as any).floatLabel();
      }
      if (underline.current) {
        (underline.current as any).expandLine();
      }
    }

    function blurAnimation() {
      if (floatingLabel.current && value === '') {
        (floatingLabel.current as any).sinkLabel();
      }
      if (underline.current) {
        (underline.current as any).shrinkLine();
      }
      if (onBlur) {
        onBlur({});
      }
    }

    function focus(): any {
      ReactNativeShowPasswordModule.focus();
    }

    useImperativeHandle(ref, () => ({
      focus,
    }));

    return (
      <View
        style={[styles.container, style]}
        onStartShouldSetResponder={() =>
          ReactNativeShowPasswordModule.focus() as any
        }
      >
        <ReactNativeShowPasswordView
          {...{ color, ...props }}
          style={[style, error ? styles.inputError : {}, styles.input]}
          inputStyle={inputStyle}
          returnKeyTypeProp={returnKeyType}
          isVisible={isVisible}
          onChange={({ nativeEvent }) => {
            setValue(nativeEvent.value);
            onChangeText ? onChangeText(nativeEvent.value) : {};
          }}
          onFocus={() => focusAnimation()}
          onBlur={() => blurAnimation()}
          ref={input as any}
        />
        <FloatingLabel
          // isFocused={this.state.isFocused}
          ref={floatingLabel}
          focusHandler={() => focus()}
          label={placeholder || ''}
          labelColor={error ? errorColor : color}
          highlightColor={error ? errorColor : color}
          duration={150}
          dense={false}
          hasValue={value !== ''}
          style={[labelStyle, styles.labelStyle]}
        />
        <Underline
          ref={underline}
          highlightColor={error ? errorColor : color}
          duration={50}
          borderColor={error ? errorColor : color}
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
    width: 60,
    height: '100%',
    alignSelf: 'flex-end',
    zIndex: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {},
});
