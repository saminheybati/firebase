import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @Input() disable: boolean;
  @Input() label: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() acceptableMaxNextDay: number;
  @Input() acceptableMaxPreviousDay: number;
  @Input() minAcceptableNumberOfDays: number;
  @Input() maxAcceptableNumberOfDays: number;

  @Output() selectedRangeDate = new EventEmitter<any>();


  maxDate: Date
  minDate: Date

  startDateControl!: FormControl;
  endDateControl!: FormControl;

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.startDateControl = new FormControl(this.startDate);
    this.endDateControl = new FormControl(this.endDate);
    this.endDateControl.valueChanges.subscribe((value) => {
      if (value !== null) {
        if (this.checkValidation()) {
          console.log(value)
          //////////////emit
        }
      }
    });
    let dateMin = new Date()
    let dateMax = new Date()
    this.minDate = new Date(dateMin.setDate(dateMin.getDate() - this.acceptableMaxPreviousDay));
    this.maxDate = new Date(dateMax.setDate(dateMax.getDate() + this.acceptableMaxNextDay));
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  checkValidation() {
    let m = Math.floor((Date.UTC(this.endDateControl.value.getFullYear(), this.endDateControl.value.getMonth(), this.endDateControl.value.getDate()) - Date.UTC(this.startDateControl.value.getFullYear(), this.startDateControl.value.getMonth(), this.startDateControl.value.getDate())) / (1000 * 60 * 60 * 24));
    if (this.minAcceptableNumberOfDays <= m) {
      if (m <= this.maxAcceptableNumberOfDays) {
        return true
      } else {
        this.openSnackBar('Number of selected date must be less than ' + this.maxAcceptableNumberOfDays + ' days', 'ok')
        return false
      }
    } else
      this.openSnackBar('Number of selected date must be more than ' + this.minAcceptableNumberOfDays + ' days', 'ok')
    return false
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10 * 1000,
    });
  }
}
