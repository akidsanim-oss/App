declare module '@expo/vector-icons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export const Ionicons: ComponentType<IconProps> & { font: Record<string, any> };
  export const FontAwesome: ComponentType<IconProps>;
  export const MaterialIcons: ComponentType<IconProps>;
}

declare module '@expo/vector-icons/Ionicons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  const Ionicons: ComponentType<IconProps> & { font: Record<string, any> };
  export default Ionicons;
}
