import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSiteRoutingModule } from './admin-site-routing.module';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdminSiteRoutingModule
  ],
  declarations: [AdminLandingPageComponent]
})
export class AdminSiteModule { }
