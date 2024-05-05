import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage(); // getting previous values from localStorage
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)

  constructor() { }

  addToCart(food: Food): void {
    console.log("currentFood", food);
    console.log(this.cart.items, "this is cartItems");


    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    console.log(cartItem, "this is cart Items");

    if (cartItem) {
      return ;
    }
    this.cart.items.push(new CartItem(food));
    console.log(this.cart.items, "RIYAAL");

    this.setCartToLocalStorage();


  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.setCartToLocalStorage(); // updateing

  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItems = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItems) return;
    cartItems.quantity = quantity;
    cartItems.price = quantity * cartItems.food.price;
    this.setCartToLocalStorage(); // updateing

  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage(); // updateing

  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void { //setting to localStorage
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentSum) => prevSum + currentSum.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevCount, currentCount) => prevCount + currentCount.quantity, 0);
    const cartJSON = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJSON);
    this.cartSubject.next(this.cart); // notifyh the listners
  }

  private getCartFromLocalStorage(): Cart{
    const cartJSON = localStorage.getItem('Cart');
    return cartJSON ? JSON.parse(cartJSON) : new Cart()
 }


}
