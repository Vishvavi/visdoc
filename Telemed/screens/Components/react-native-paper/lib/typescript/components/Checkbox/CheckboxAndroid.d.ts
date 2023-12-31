import * as React from 'react';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import type { $RemoveChildren } from '../../types';
export declare type Props = $RemoveChildren<typeof TouchableRipple> & {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    /**
     * testID to be used on tests.
     */
    testID?: string;
};
declare const _default: React.ComponentType<Pick<$RemoveChildren<React.ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof React.RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}> & {
    ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../TouchableRipple/TouchableRipple").Props): JSX.Element;
    supported: boolean;
}, {}>> & {
    /**
     * Status of checkbox.
     */
    status: "checked" | "unchecked" | "indeterminate";
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Function to execute on press.
     */
    onPress?: (() => void) | undefined;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string | undefined;
    /**
     * Custom color for checkbox.
     */
    color?: string | undefined;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    /**
     * testID to be used on tests.
     */
    testID?: string | undefined;
}, "style" | "color" | "onLayout" | "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "testID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "hitSlop" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "disabled" | "onBlur" | "onFocus" | "pressRetentionOffset" | "touchSoundDisabled" | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | "status" | "uncheckedColor"> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<$RemoveChildren<React.ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof React.RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}> & {
    ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../TouchableRipple/TouchableRipple").Props): JSX.Element;
    supported: boolean;
}, {}>> & {
    /**
     * Status of checkbox.
     */
    status: "checked" | "unchecked" | "indeterminate";
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Function to execute on press.
     */
    onPress?: (() => void) | undefined;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string | undefined;
    /**
     * Custom color for checkbox.
     */
    color?: string | undefined;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    /**
     * testID to be used on tests.
     */
    testID?: string | undefined;
}> & {
    ({ status, theme, disabled, onPress, testID, ...rest }: Props): JSX.Element;
    displayName: string;
}, {}>;
export default _default;
declare const CheckboxAndroidWithTheme: React.ComponentType<Pick<$RemoveChildren<React.ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof React.RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}> & {
    ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../TouchableRipple/TouchableRipple").Props): JSX.Element;
    supported: boolean;
}, {}>> & {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Function to execute on press.
     */
    onPress?: (() => void) | undefined;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string | undefined;
    /**
     * Custom color for checkbox.
     */
    color?: string | undefined;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    /**
     * testID to be used on tests.
     */
    testID?: string | undefined;
}, "style" | "color" | "onLayout" | "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "testID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "hitSlop" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "disabled" | "onBlur" | "onFocus" | "pressRetentionOffset" | "touchSoundDisabled" | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | "status" | "uncheckedColor"> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<$RemoveChildren<React.ComponentType<Pick<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}, keyof import("react-native").TouchableWithoutFeedbackProps | "background" | "borderless" | "rippleColor" | "underlayColor" | "centered" | keyof React.RefAttributes<import("react-native").TouchableWithoutFeedback>> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<import("react-native").TouchableWithoutFeedbackProps & React.RefAttributes<import("react-native").TouchableWithoutFeedback> & {
    borderless?: boolean | undefined;
    background?: Object | undefined;
    centered?: boolean | undefined;
    disabled?: boolean | undefined;
    onPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onLongPress?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    rippleColor?: string | undefined;
    underlayColor?: string | undefined;
    children: React.ReactNode;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    theme: ReactNativePaper.Theme;
}> & {
    ({ style, background: _background, borderless, disabled: disabledProp, rippleColor, underlayColor: _underlayColor, children, theme, ...rest }: import("../TouchableRipple/TouchableRipple").Props): JSX.Element;
    supported: boolean;
}, {}>> & {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Function to execute on press.
     */
    onPress?: (() => void) | undefined;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string | undefined;
    /**
     * Custom color for checkbox.
     */
    color?: string | undefined;
    /**
     * @optional
     */
    theme: ReactNativePaper.Theme;
    /**
     * testID to be used on tests.
     */
    testID?: string | undefined;
}> & {
    ({ status, theme, disabled, onPress, testID, ...rest }: Props): JSX.Element;
    displayName: string;
}, {}>;
export { CheckboxAndroidWithTheme as CheckboxAndroid };
