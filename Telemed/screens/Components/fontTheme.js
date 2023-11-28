import React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const fontConfig = {
    default: {
      regular: {
        fontFamily: 'SpaceGrotesk-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'SpaceGrotesk-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'SpaceGrotesk-Regular',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
  };

  export default Theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
  };