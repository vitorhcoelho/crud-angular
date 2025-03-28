import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  ngOnInit(): void {}

  refresh() {
    this.courses$ = this.coursesService.listCourses().pipe(
      catchError((error) => {
        this.onError('Error loading courses.' + error);
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {
      relativeTo: this.activatedRoute,
    });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure to remove this course?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe(
          () => {
            this.snackBar.open('Course removed successfully', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            this.refresh();
          },
          () => {
            this.onError('Error during removing course');
          }
        );
      }
    });
  }
}
