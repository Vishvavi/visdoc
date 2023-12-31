import * as React from 'react';
import { StyleProp, TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import type { IconSource } from './Icon';
export declare type Props = React.ComponentPropsWithRef<typeof TextInput> & {
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    clearAccessibilityLabel?: string;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    searchAccessibilityLabel?: string;
    /**
     * Hint text shown when the input is empty.
     */
    placeholder?: string;
    /**
     * The value of the text input.
     */
    value: string;
    /**
     * Icon name for the left icon button (see `onIconPress`).
     */
    icon?: IconSource;
    /**
     * Callback that is called when the text input's text changes.
     */
    onChangeText?: (query: string) => void;
    /**
     * Callback to execute if we want the left icon to act as button.
     */
    onIconPress?: () => void;
    /**
     * Set style of the TextInput component inside the searchbar
     */
    inputStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    /**
     * Custom color for icon, default will be derived from theme
     */
    iconColor?: string;
    /**
     * Custom icon for clear button, default will be icon close
     */
    clearIcon?: IconSource;
};
declare type TextInputHandles = Pick<TextInput, 'setNativeProps' | 'isFocused' | 'clear' | 'blur' | 'focus'>;
declare const _default: React.ComponentType<Pick<Pick<Props, "icon" | "key" | "theme" | keyof TextInputProps | "clearAccessibilityLabel" | "clearIcon" | "iconColor" | "inputStyle" | "onIconPress" | "searchAccessibilityLabel"> & React.RefAttributes<TextInputHandles>, "icon" | keyof TextInputProps | "clearAccessibilityLabel" | "clearIcon" | "iconColor" | "inputStyle" | "onIconPress" | "searchAccessibilityLabel" | keyof React.RefAttributes<TextInputHandles>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<Pick<Props, "icon" | "key" | "theme" | keyof TextInputProps | "clearAccessibilityLabel" | "clearIcon" | "iconColor" | "inputStyle" | "onIconPress" | "searchAccessibilityLabel"> & React.RefAttributes<TextInputHandles>> & React.ForwardRefExoticComponent<Pick<Props, "icon" | "key" | "theme" | keyof TextInputProps | "clearAccessibilityLabel" | "clearIcon" | "iconColor" | "inputStyle" | "onIconPress" | "searchAccessibilityLabel"> & React.RefAttributes<TextInputHandles>>, {}>;
export default _default;
