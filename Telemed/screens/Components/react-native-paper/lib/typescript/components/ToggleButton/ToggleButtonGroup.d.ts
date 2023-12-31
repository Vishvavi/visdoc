import * as React from 'react';
export declare type Props = {
    /**
     * Function to execute on selection change.
     */
    onValueChange: (value: string) => void | null;
    /**
     * Value of the currently selected toggle button.
     */
    value: string | null;
    /**
     * React elements containing toggle buttons.
     */
    children: React.ReactNode;
};
declare type ToggleButtonContextType = {
    value: string | null;
    onValueChange: (item: string) => void | null;
};
export declare const ToggleButtonGroupContext: React.Context<ToggleButtonContextType>;
/**
 * Toggle group allows to control a group of toggle buttons.</br>
 * It doesn't change the appearance of the toggle buttons. If you want to group them in a row, check out <a href="toggle-button-row.html">`ToggleButton.Row`</a>.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/toggle-button-group.gif" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ToggleButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = React.useState('left');
 *
 *   return (
 *     <ToggleButton.Group
 *       onValueChange={value => setValue(value)}
 *       value={value}>
 *       <ToggleButton icon="format-align-left" value="left" />
 *       <ToggleButton icon="format-align-right" value="right" />
 *     </ToggleButton.Group>
 *   );
 * };
 *
 * export default MyComponent;
 *```
 */
declare const ToggleButtonGroup: {
    ({ value, onValueChange, children }: Props): JSX.Element;
    displayName: string;
};
export default ToggleButtonGroup;
export { ToggleButtonGroup };
