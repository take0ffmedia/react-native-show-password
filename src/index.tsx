import React, { useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

const LINKING_ERROR =
  `The package '@takeoffmedia/react-native-show-password' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';
export type ReactNativeShowPasswordMethods = {};

type ReactNativeShowPasswordProps = {
  color: string;
  style: ViewStyle;
  isVisible?: boolean;
  onChange?: (event: any) => void;
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
      color,
      style,
      onChange: onChangeText,
      ...props
    }: ReactNativeShowPasswordProps,
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //   console.log({ isVisible });
    // }, [isVisible]);

    return (
      <>
        <ReactNativeShowPasswordView
          {...{ color, style, ...props }}
          isVisible={isVisible}
          onChange={({ nativeEvent }) =>
            onChangeText ? onChangeText(nativeEvent.value) : {}
          }
        />
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={{
            width: 30,
            height: 40,
            marginRight: 40,
            backgroundColor: 'red',
            alignSelf: 'flex-end',
            zIndex: 2,
          }}
        />
      </>
    );
  }
);
