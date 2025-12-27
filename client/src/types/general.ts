export type LandlordType = {
  id: string;
  name: string;
  avatar_url: string;
  email?: string;
  properties?: PropertyType[];
};

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
  email?: string;
  properties?: PropertyType[];
};

export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
};

export type PropertyDetailType = PropertyType & {
  description: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  landlord: LandlordType;
};
