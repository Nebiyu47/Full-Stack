import { CartItem } from './cart-item';
export class OrdrItem {
    imageUrl: string;
    unitPrice:number;
    quanity:number;
    productId:string;

    constructor(CartItem :CartItem){
      this.imageUrl=CartItem.imageUrl;
      this.unitPrice=CartItem.unitPrice;
      this.quanity=CartItem.quantity;
      this.productId=CartItem.id;
    }
}
