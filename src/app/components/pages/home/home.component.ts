import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodsObservable: Observable<Food[]>
    this._activatedRoutes.params.subscribe((params: any) => {

      if(params.searchTerm) {
        foodsObservable = this._foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if(params.tag) {
        foodsObservable = this._foodService.getAllFoodsByTag(params.tag);
      }
      else {
        foodsObservable = this._foodService.getAll();
      }
      foodsObservable.subscribe((resp: any) => {
        this.foods = resp;
      });
    });
  }

  ngOnInit(): void { }

  goto(id: string) {
    this._router.navigate([`food/${id}`]);
  }


}
