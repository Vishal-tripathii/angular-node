import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cartItems';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart!: Cart

  constructor(private _cartServices: CartService) {
    this._cartServices.getCartObservable().subscribe((resp: any) => {
      this.cart = resp;
      console.log(this.cart, "Latest Cart Updated");
    })
  }

  ngOnInit(): void { }

  removeFromCart(cartItem: CartItem) {
    this._cartServices.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem: CartItem, quantity: string) {
    const quant = parseInt(quantity);
    this._cartServices.changeQuantity(cartItem.food.id, quant)

  }

}
