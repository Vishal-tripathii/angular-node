import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {

food!: Food[];

  constructor(private _activatedRoutes: ActivatedRoute, private _foodService: FoodService) {
    console.log(this.food, "this si shit");

    _activatedRoutes.params.subscribe((params: any) => {
      if(params.id) {
          this.food = this._foodService.getFoodById(params.id);
      }
    })
  }

  ngOnInit(): void {

   }

}
