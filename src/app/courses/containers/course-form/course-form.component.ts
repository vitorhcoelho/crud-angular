import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    category: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const course: Course = this.activatedRoute.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: (result) => {
          this.onSuccess();
        },
        error: (error) => {
          console.error(error);
          this.onError();
        },
      });
    } else {
      this.form.markAllAsTouched();
      this.onError();
    }
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

  getErrorMessage(filedName: string) {
    const field = this.form.get(filedName);


    if(field?.hasError('required')){
      return 'Required field';
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;

      return `Minimum size expected must be ${requiredLength}`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;

      return `Maximum size expected must be ${requiredLength}`;
    }


    return 'Invalid field';
  }
}
