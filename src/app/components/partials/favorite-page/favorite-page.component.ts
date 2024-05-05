import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Favorite } from 'src/app/shared/models/favorite';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {

  favorite!: Favorite | any;

  constructor(private _favoriteService: FavoriteService) {
    this._favoriteService.getFavoriteObservable().subscribe((resp: any) => {
      if(resp)
          this.favorite = resp.items;
      console.log(this.favorite);


    })
  }


  ngOnInit(): void {
  }

}
