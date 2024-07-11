import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/orders';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order(); //  this would contain all the fields mentioned in the class
  checkoutForm!: FormGroup;

  constructor(private _userService: UserService, private _cartService: CartService, private _fb: FormBuilder) {
    const cart = this._cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let {name, address} = this._userService.currentUser; // deconstructing
    
    this.checkoutForm = this._fb.group({
      name: [name, [Validators.required]], // getting the default values on the form
      address: [address, [Validators.required]]// same here for address
    })
   }

   get fc() {
    return this.checkoutForm.controls;
   }

   createOrder() {
    if(this.checkoutForm.invalid) {
      console.log("Please fill proper inputs");
      return;
    }

    this.order.name = this.fc.name.value; // we can edit this and save
    this.order.address = this.fc.address.value;// same here too

    console.log(this.order, "thsi is my checkout page orders");
    
   }





}
