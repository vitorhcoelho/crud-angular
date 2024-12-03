import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  declarations: [ErrorDialogComponent, CategoryPipe],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [ErrorDialogComponent, CategoryPipe],
})
export class SharedModule {}
