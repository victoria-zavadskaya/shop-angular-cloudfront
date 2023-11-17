import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from '../../core/api.service';

@Injectable()
export class ManageProductsService extends ApiService {
    constructor(injector: Injector) {
        super(injector);
    }

    public uploadProductsCSV(file: File): Observable<unknown> {
        if (!this.endpointEnabled('import')) {
            console.warn('Endpoint "import" is disabled. To enable change your environment.ts config');
            return EMPTY;
        }

        return this.getPreSignedUrl(file.name).pipe(
            // switchMap((url) =>
            //     this.http.put(url, file, {
            //         headers: { 'Content-Type': 'text/csv' },
            //     })
            // )
        );
    }

    private getPreSignedUrl(fileName: string): Observable<any> {
        const url = this.getUrl('import', 'import');
        const token = localStorage.getItem('authorizationToken');

        return this.http.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Basic ${token}`,
            },
            params: { name: fileName },
            responseType: 'text',
        });
    }
}
