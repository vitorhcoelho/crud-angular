import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [ErrorDialogComponent, CategoryPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule
  ],
  exports: [ErrorDialogComponent, CategoryPipe],
})
export class SharedModule {}
