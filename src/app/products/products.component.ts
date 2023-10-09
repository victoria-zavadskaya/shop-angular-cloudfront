import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './product.interface';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    public products$: Observable<Product[]>;

    constructor(private readonly productsService: ProductsService) {}

    public ngOnInit(): void {
        this.products$ = this.productsService.getProducts();
    }
}
