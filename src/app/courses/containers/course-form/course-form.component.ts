import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => {
        this.onSuccess();
        console.log(result);
      },
      error: (error) => {
        console.error(error);
        this.onError();
      },
    });
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Error on saving course', '', { duration: 3000 });
  }

  private onSuccess() {
    this.snackBar.open('Course save successfully', '', { duration: 3000 });
    this.onCancel();
  }
}
