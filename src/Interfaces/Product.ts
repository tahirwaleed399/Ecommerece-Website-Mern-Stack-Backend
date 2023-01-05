export interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  images: image[] ;
  category: string;
  stock: number;
  numOfReviews: number;
  reviews: Array<review>;
  createdAt: Date;
  quantity? : any;
  image? : string ;
}

interface image {
  public_id: string;
  url: string;
  _id?: string;
}

interface review {
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id?: string;
}
