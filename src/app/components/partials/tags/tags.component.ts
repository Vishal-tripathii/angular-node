import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags!: Tag[];
  selectedTag!: string;

  constructor(private _foodService: FoodService, private _router: Router) {
    this._foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {}

  goto(item: string) {
    this.selectedTag = item;
    this._router.navigate([`tag/${item}`]);
  }

}
