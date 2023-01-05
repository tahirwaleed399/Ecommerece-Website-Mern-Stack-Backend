export default interface OrderInterface {
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number | string;
    phoneNo: string | number;
  };
  paymentInfo: {
    id: string;
    status: string;
  };
  _id: string;
  orderItems: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: string;
    _id: string;
  }[];
  user: string;
  paidAt: Date;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  createdAt: Date;
}

// "shippingInfo": {
//     "address": "Nasheman Iqbal",
//     "city": "Lahore",
//     "state": "Punjab",
//     "country": "America",
//     "pinCode": 574300,
//     "phoneNo": 3044309883
// },
// "paymentInfo": {
//     "id": "fa",
//     "status": "compte"
// },
// "_id": "62dc6080edbbdf024f9ed974",
// "orderItems": [
//     {
//         "name": "charger",
//         "price": 400,
//         "quantity": 1,
//         "image": "i am image",
//         "product": "62da87d1c4e430841b74dd82",
//         "_id": "62dc6080edbbdf024f9ed975"
//     }
// ],
// "user": "62da9687424418df80753cae",
// "paidAt": "2022-07-23T20:56:32.286Z",
// "itemsPrice": 2200,
// "taxPrice": 200,
// "shippingPrice": 100,
// "totalPrice": 800,
// "orderStatus": "shipped",
// "createdAt": "2022-07-23T20:56:32.297Z",
// "__v": 0
