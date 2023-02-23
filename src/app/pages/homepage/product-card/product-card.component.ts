import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor() {}

  @Input() product: Product | undefined;
  @Output() addItem = new EventEmitter();

  ngOnInit(): void {

  }

  // Button Function to Add Product into User Cart
  onAddItem(id: number): void{
    this.addItem.emit(id);
  }
}
