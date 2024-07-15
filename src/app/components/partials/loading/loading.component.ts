import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  isLoading!: boolean;

  constructor(private _loadingService: LoadingService) {
    this._loadingService.isLoading.subscribe((load: any) => {
      this.isLoading = load;
    });

    this._loadingService.showLoading();

  }
  ngOnInit(): void {
  }

}
