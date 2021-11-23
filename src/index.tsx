import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@takeoffmedia/react-native-show-password' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type ReactNativeShowPasswordProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReactNativeShowPasswordView';

export const ReactNativeShowPasswordView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeShowPasswordProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
