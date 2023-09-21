interface PinImageDetail {
  id: number;
  imageUrl: string;
}

export interface Pin {
  id: number;
  name: string;
  address: string;
  description: string;
  creator: string;
  latitude: number;
  longitude: number;
  canUpdate: string;
  updatedAt: Date;
  images: PinImageDetail[];
}
