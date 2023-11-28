import DefaultPreference from 'react-native-default-preference';

import {Dimensions} from 'react-native';

import {initialWindowMetrics} from 'react-native-safe-area-context';

class ApplicationDimensions {
    constructor() {
        this.initialWindowMetrics = initialWindowMetrics;

        this.window = Dimensions.get('window');
        this.screen = Dimensions.get('screen');
    }

    initialize() {
       
        this.initialWindowMetrics = initialWindowMetrics;

        this.window = Dimensions.get('window');
        this.screen = Dimensions.get('screen');

        if (
            this.initialWindowMetrics &&
            !(
                this.initialWindowMetrics.insets.top === 0 &&
                this.initialWindowMetrics.insets.bottom === 0
            )
        ) {
            DefaultPreference.set(
                'WINDOW_METRICS',
                JSON.stringify(initialWindowMetrics)
            );
        } else {
            DefaultPreference.get('WINDOW_METRICS').then((val) => {
                if (!val) return;

                try {
                    this.initialWindowMetrics = JSON.parse(val);
                    console.log('Restored metrics', this.initialWindowMetrics);
                } catch (err) {
                    console.log('Erroring restoring metrics', err);
                }
            });
        }

        Dimensions.addEventListener('change', this.onChange);
    }

    uninitialize() {
        console.log('Uninitializing AppDimensions');
        Dimensions.removeEventListener('change', this.onChange);
    }

    onChange({window, screen}) {
        if (this) {
            this.window = window;
            this.screen = screen;
        }
    }

    get fullHeightHardware() {
       
        const {width, height} = this.window;
        return width > height ? width : height;
    }

    get SCREEN_HEIGHT() {
        return this.screen.height;
    }

    get FULL_HEIGHT() {
        const {width, height} = this.window;
        return width > height ? width : height;
    }

    get FULL_WIDTH() {
       
        const {width, height} = this.window;
        return width > height ? height : width;
    }

    get NAVBAR_HEIGHT() {
        return 56;
    }

    get TABBAR_HEIGHT() {
        return 62;
    }

    get ANDROID_NAVBAR() {
        if (!this.initialWindowMetrics) return 0;
        return this.initialWindowMetrics.frame.y;
    }

    

    get insets() {
        if (!this.initialWindowMetrics)
            return {bottom: 0, left: 0, right: 0, top: 0};
        return this.initialWindowMetrics.insets;
    }
}


export const AppDimensions = new ApplicationDimensions();

export default {AppDimensions};
