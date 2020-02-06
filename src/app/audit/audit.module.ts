import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { AuditPageRoutingModule } from './audit-routing.module';

import { AuditPage } from './audit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditPageRoutingModule,
	SharedModule
  ],
  declarations: [AuditPage]
})
export class AuditPageModule {}
