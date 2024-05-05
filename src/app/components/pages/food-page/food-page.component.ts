import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {

  food!: Food[];

  constructor(private _activatedRoutes: ActivatedRoute, private _foodService: FoodService, private _router: Router, private _cartService: CartService) {
    console.log(this.food, "this si shit");

    _activatedRoutes.params.subscribe((params: any) => {
      if (params.id) {
        this.food = this._foodService.getFoodById(params.id);
      }
    })
  }

  ngOnInit(): void {

  }

  addToCart(food: Food) {
    this._cartService.addToCart(food);
    this._router.navigateByUrl('/cart-page');
  }

}
