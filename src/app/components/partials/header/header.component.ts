import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity: number = 0;

  constructor(private _cartServices: CartService) {
    this._cartServices.getCartObservable().subscribe((resp: any) => {
      console.log(resp, "FOR HEADER");
      this.cartQuantity = resp.totalCount;
    });
  }

  ngOnInit(): void {
  }

}
