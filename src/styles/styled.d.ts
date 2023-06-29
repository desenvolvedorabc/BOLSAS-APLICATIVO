/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import { parc } from './themes';

type Theme = typeof parc;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
  // export interface DefaultTheme {
  //   title: string;
  //   colors: {
  //     primary: string;
  //     dark: string;
  //   };
  //   buttons: {
  //     default: string;
  //     defaultActive: string;
  //     defaultDisable: string;
  //     alert: string;
  //     alertActive: string;
  //     alertDisable: string;
  //     warning: string;
  //     warningActive: string;
  //     warningDisable: string;
  //   };
  //   gradients: {
  //     gradientVertical: string;
  //     gradientHorizontal: string;
  //   };
  // }
}
