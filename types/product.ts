import { ImageSourcePropType } from 'react-native';

export interface ProductVariant {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
  describe:string;
  sold:string;
}
