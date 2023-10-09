import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApiService } from 'app/core/api.service';
import { Product, ProductsResponse } from './product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService extends ApiService {
    public createNewProduct(product: Product): Observable<Product> {
        if (!this.endpointEnabled('bff')) {
            console.warn('Endpoint "bff" is disabled. To enable change your environment.ts config');
            return EMPTY;
        }

        const url = this.getUrl('bff', 'products');
        return this.http.post<Product>(url, product);
    }

    public editProduct(id: string, changedProduct: Product): Observable<Product> {
        if (!this.endpointEnabled('bff')) {
            console.warn('Endpoint "bff" is disabled. To enable change your environment.ts config');
            return EMPTY;
        }

        const url = this.getUrl('bff', `products/${id}`);
        return this.http.put<Product>(url, changedProduct);
    }

    public getProductById(id: string): Observable<Product | null> {
        const url = this.buildGetProductByIdUrl(id);

        return this.http
            .get<{ product: Product }>(url)
            .pipe(map((resp) => resp.product));
    }

    public getProducts(): Observable<Product[]> {
        const url = this.buildGetProductsUrl();

        return this.http.get<ProductsResponse>(url).pipe(map(res => res.products));
    }

    public getProductsForCheckout(ids: string[]): Observable<Product[]> {
        if (!ids.length) {
            return of([]);
        }

        return this.getProducts()
            .pipe(map((products) => products.filter((product) => ids.includes(product.id))));
    }

    private buildGetProductsUrl(): string {
        return this.getUrl('bff', 'products');
    }

    private buildGetProductByIdUrl(id: string): string {
        return this.getUrl('bff', `products/${id}`);
    }
}
