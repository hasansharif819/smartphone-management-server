export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  operatingSystem: string;
  screenSize: number;
  storageCapacity: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
  img?: string;
};
