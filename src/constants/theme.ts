import type { StatusBarStyle } from 'react-native';

import type { BaseColors, CustomTheme, ThemeConstants } from '@/types/theme';
import { DefaultTheme } from '@react-navigation/native';

const BASE_COLORS: BaseColors = {
  greyPressed: '#646466',
  primary: '#E77917',
  primaryPressed: '#AF5B11',
  whitePressed: '#A6A6A6',
};

const THEME_CONSTANTS: ThemeConstants = {
  borderRadius: {
    sm: 5,
    md: 10,
    lg: 15,
    xl: 25,
  },
  opacity: {
    sm: 0.5,
    md: 0.8,
    lg: 1,
  },
  fontSize: {
    sm: 12,
    md: 16,
    lg: 18,
    xl: 22,
    xl2: 30,
    xl3: 50,
  },
  gap: {
    sm: 5,
    md: 10,
    lg: 15,
    xl: 30,
  },
  borderWidth: {
    sm: 0.5,
    md: 1,
    lg: 2,
  },
  padding: {
    xs: 2,
    xs2: 5,
    sm: 10,
    md: 20,
    lg: 30,
    xl: 70,
  },
  margin: {
    xs: 2,
    sm: 5,
    md: 10,
    lg: 20,
  },
  headerLogoSize: 40,
  largeListItemHeight: 50,
};

export const LIGHT_THEME: CustomTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
    greyBackground: '#f0f0f0',
    grey: '#717175',
    greyDark: '#ebebeb',
    ...BASE_COLORS,
  },
  constants: THEME_CONSTANTS,
};

export const DARK_THEME: CustomTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
    text: 'white',
    greyBackground: '#434344',
    grey: '#aeaeb2',
    greyDark: '#171717',
    ...BASE_COLORS,
  },
  constants: THEME_CONSTANTS,
};

export enum ColorMode {
  Light = 'light',
  Dark = 'dark',
}

export const Theme = {
  [ColorMode.Dark]: DARK_THEME,
  [ColorMode.Light]: LIGHT_THEME,
} as const;

export const StatusBarColor: Record<ColorMode, StatusBarStyle> = {
  [ColorMode.Dark]: 'light-content',
  [ColorMode.Light]: 'dark-content',
} as const;
