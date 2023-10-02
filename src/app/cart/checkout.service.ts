import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CartService } from './cart.service';
import { ProductCheckout } from '../products/product.interface';
import { ProductsService } from '../products/products.service';


@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService
  ) {}

  getProductsForCheckout(): Observable<ProductCheckout[]> {
    return this.cartService.cart$.pipe(
      switchMap((cart) =>
        this.productsService.getProductsForCheckout(Object.keys(cart)).pipe(
          map((products) =>
            products.map((product) => ({
              ...product,
              orderedCount: cart[product.id],
              totalPrice: Number((cart[product.id] * product.price).toFixed(2)),
            }))
          )
        )
      )
    );
  }
}
