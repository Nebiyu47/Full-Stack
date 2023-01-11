import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computCartTotal();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.CartItem.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    if (itemIndex > -1) {
      this.CartItem.splice(itemIndex, 1);
      this.computCartTotal();
    }
  }
  CartItem: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage : Storage = sessionStorage;
  //storage: Storage = localStorage;
  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems') || '{}');
    if (data != null) {
      this.CartItem = data;
      this.computCartTotal();
    }
  }

  addToCart(theCartItem: CartItem) {
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined as any;
    if (this.CartItem.length > 0) {
      for (let tempCartItem of this.CartItem) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.CartItem.push(theCartItem);
    }
    this.computCartTotal()
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.CartItem));
  }
  computCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.CartItem) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for (let tempCartItem of this.CartItem) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name : ${tempCartItem.name},quantiy : ${tempCartItem.quantity} , unitPrice : ${tempCartItem.unitPrice},subTotalPrice : ${subTotalPrice}`)
    }
    console.log(`totalPice:${totalPriceValue.toFixed(2)},totalQuantity:${totalQuantityValue}`)
  }
}
