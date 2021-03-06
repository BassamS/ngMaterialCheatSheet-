import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// Table
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'material-demo';
  notifications = 0;
  showSpinner = false;

  // vav
  opened = false;

  // Table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  log(state) {
    console.log(state);
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }

  // Tabs
  // logChange(index) {
  //   console.log(index);
  // }

  // Select
  selectedValue: string;

  // Autocomplete
  options: string[] = ['Angular', 'React', 'Vue'];
  objectOptions = [
    { name: 'Angular' },
    { name: 'Angular Material' },
    { name: 'React' },
    { name: 'Vue' },
  ];

  myControl = new FormControl();

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    // // Data table sorting
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => {
      option.toLowerCase().includes(filterValue);
    });
  }

  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  // Date Picker
  minDate = new Date();
  maxDate = new Date(2020, 10, 28);

  dateFilter = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // Snack-Bar
  // constructor(private snackBar: MatSnackBar) {}

  // openSnackBar(message, action) {
  //   // this.snackBar.open(message, action);
  //   let snackBarRef = this.snackBar.open(message, action, { duration: 1000 });

  //   snackBarRef.afterDismissed().subscribe(() => {
  //     console.log('The snackbar was dismissed');
  //   });

  //   snackBarRef.onAction().subscribe(() => {
  //     console.log('The snackbar action was triggered!');
  //   });
  // }

  // openCustomSnackBar() {
  //   this.snackBar.openFromComponent(CustomSnackBarComponent, {
  //     duration: 2000,
  //   });
  // }

  // Dialog
  // constructor(public dialog: MatDialog) {}

  // Virtual Scrolling
  numbers = [];

  constructor() {
    for (let i = 0; i < 1000; i++) {
      this.numbers.push(i);
    }
  }

  // openDialog() {
  //   // let dialogRef = this.dialog.open(DialogExampleComponent);
  //   let dialogRef = this.dialog.open(DialogExampleComponent, {
  //     data: { name: 'Sam' },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  // openDialog() {
  //   this.dialog.open(DialogExampleComponent);
  // }
}

@Component({
  selector: 'custom-snackbar',
  template: `<span style="color: orange">Custom Snackbar</span>`,
})
export class CustomSnackBarComponent {}
