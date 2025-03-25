import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent, ConfirmationDialogComponent, CategoryPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule
  ],
  exports: [ErrorDialogComponent, ConfirmationDialogComponent, CategoryPipe],
})
export class SharedModule {}
