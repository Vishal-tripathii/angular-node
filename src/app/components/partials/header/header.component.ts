import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/food';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity: number = 0;
  favoriteQuantity: number = 0;
  user!: User

  constructor(
    private _cartServices: CartService,
    private _favoriteService: FavoriteService,
    private _foodService: FoodService, 
    private _userService: UserService
  ) {

    this._userService.userObservable.subscribe(newUser => {
      this.user = newUser
    })
    this._favoriteService.getFavoriteObservable().subscribe((resp: any) => {
      this.favoriteQuantity = resp.items?.length;
    });
    this._cartServices.getCartObservable().subscribe((resp: any) => {
      this.cartQuantity = resp.totalCount;
    });
  }

  ngOnInit(): void {
  }

}
