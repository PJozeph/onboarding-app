import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.css']
})
export class PriceCardComponent implements OnInit {

  @Input('price') price : string;

  constructor() { }

  ngOnInit(): void {
  }

}