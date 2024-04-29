import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService  {

  constructor() { }

  getAll(): Food[] {
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(item=> item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags() {
    return sample_tags
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === 'All' ? this.getAll() : this.getAll().filter(item=> item.tags?.includes(tag))
  }

  getFoodById(foodId: string) {
    return this.getAll().filter(item => item.id === foodId);
  }


}
