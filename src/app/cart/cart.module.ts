import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';

import { CartRoutingModule } from './cart-routing.module';
import { CartShippingFormComponent } from './cart-shipping-form/cart-shipping-form.component';
import { CartComponent } from './cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductItemCheckoutComponent } from './product-item-checkout/product-item-checkout.component';
import { CartCountControlsModule } from '../core/cart-count-controls/cart-count-controls.module';

@NgModule({
  declarations: [
    CartComponent,
    ProductItemCheckoutComponent,
    CartShippingFormComponent,
    OrderSummaryComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CartCountControlsModule,
    MatProgressSpinnerModule,
  ],
  exports: [CartComponent],
})
export class CartModule {}
