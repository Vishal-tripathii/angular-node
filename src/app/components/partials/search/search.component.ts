import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';

  constructor(private _activatedRoutes: ActivatedRoute, private _router: Router) {
    this._activatedRoutes.params.subscribe((params: any) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm
      }
    });
  }

  ngOnInit(): void {
  }

  search(term: string) {
    if(term) {
      this._router.navigateByUrl('/search/' + term)
    }
  }

}
