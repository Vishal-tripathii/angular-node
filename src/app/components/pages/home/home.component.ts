import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods!: Food[];

  constructor(private _foodService: FoodService, private _activatedRoutes: ActivatedRoute, private _router: Router) {
    this._activatedRoutes.params.subscribe((params: any) => {

      if(params.searchTerm) {
        this.foods = this._foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if(params.tag) {
        this.foods = this._foodService.getAllFoodsByTag(params.tag);
      }
      else {
        this.foods =this._foodService.getAll();
      }
      console.log(this.foods, "tuyebfulyvweuygfu");
    });
  }

  ngOnInit(): void { }

  goto(id: string) {
    this._router.navigate([`food/${id}`]);
  }


}
