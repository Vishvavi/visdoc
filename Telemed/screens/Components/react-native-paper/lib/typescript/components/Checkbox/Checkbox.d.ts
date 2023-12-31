import * as React from 'react';
export declare type Props = {
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
declare const _default: React.ComponentType<Pick<Props, "color" | "onPress" | "testID" | "disabled" | "status" | "uncheckedColor"> & {
    /**
     * @optional
     */
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<Props> & ((props: Props) => JSX.Element), {}>;
export default _default;
declare const CheckboxWithTheme: React.ComponentType<Pick<Props, "color" | "onPress" | "testID" | "disabled" | "status" | "uncheckedColor"> & {
    /**
     * @optional
     */
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
}> & import("@callstack/react-theme-provider/typings/hoist-non-react-statics").NonReactStatics<React.ComponentType<Props> & ((props: Props) => JSX.Element), {}>;
export { CheckboxWithTheme as Checkbox };
