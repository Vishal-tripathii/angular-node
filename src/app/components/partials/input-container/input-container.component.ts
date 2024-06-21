import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent implements OnInit {

  @Input() label!: string
  @Input() bgColor = 'white'
  ngOnInit(): void { }


}
