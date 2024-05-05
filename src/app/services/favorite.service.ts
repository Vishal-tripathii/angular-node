import { Injectable } from '@angular/core';
import { Favorite } from '../shared/models/favorite';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { FavoriteItem } from '../shared/models/favoriteItem';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  // private favorite: Favorite = new Favorite();
  private favorite: Favorite = this.getFavoriteFromLocalStorage(); // now fetching from local storage

  private favoriteSub: BehaviorSubject<Favorite> = new BehaviorSubject(this.favorite)

  constructor() { }

  addToFavorite(food: Food): void {
    let favoriteItem = this.favorite.items
    .find(item => item.food.id === food.id);

    if (favoriteItem) { // if item is already present in list, i.e time to remove it
      const index = this.favorite.items.indexOf(favoriteItem);
      if (index !== -1) {
          this.favorite.items.splice(index, 1); // Remove from favorites
          food.favorite = false; // Set favorite status to false
      }
  } else {
      // If the food is not in favorites, add it to favorites and set favorite status to true
      food.favorite = true; // Set favorite status to true
      this.favorite.items.push(new FavoriteItem(food)); // Add it to favorites
  }

    this.setFavoriteToLocalStorage();
  }

  clearFavorites(){
    this.favorite = new Favorite(); // claering all data
    this.setFavoriteToLocalStorage();
  }

  getFavoriteObservable(): Observable<Favorite> {
    return this.favoriteSub.asObservable();
  }
  private setFavoriteToLocalStorage(): void {
    const favJSON = JSON.stringify(this.favorite); // string representtaon
    localStorage.setItem('Favorite', favJSON);
    this.favoriteSub.next(this.favorite);
  }

  private getFavoriteFromLocalStorage(): Favorite {
    const favJSON = localStorage.getItem('Favorite');
    return favJSON ? JSON.parse(favJSON): new Favorite();
  }
}
