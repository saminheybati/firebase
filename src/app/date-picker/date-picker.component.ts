import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {combineLatest} from "rxjs";
import {DateAdapter} from "@angular/material/core";
import {CanDeactivateMyComponent} from "../../services/exit-confirm.guard";

@Component(
  {
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerComponent),
        multi: true,
      },
    ],
  })
export class DatePickerComponent implements ControlValueAccessor{
  dateControl = new FormControl(new Date());

  @Input() label: string;
  @Input() disable: boolean;
  @Input() acceptableMaxNextDay: number;
  @Input() acceptableMaxPreviousDay: number;
  @Input() defaultValue: any;
  @Output() selectedDate = new EventEmitter<Date>();

  maxDate: Date
  minDate: Date
  private _onChange = (value: Date | null) => undefined;

  public registerOnChange(fn: (value: Date | null) => void): void {
    this._onChange = fn;
  }

  private _onTouched = () => undefined;

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public ngOnInit(): void {
    this.dateControl = new FormControl(this.defaultValue)
    console.log('zzzzzzzzzz', this.dateControl.value)
    this.dateControl = new FormControl(this.defaultValue);
    // this.dateControl.setValue(('Thu Jun 22 2023 00:00:00 GMT+0330 (Iran Standard Time)'))

    combineLatest([
      this.dateControl.valueChanges,
    ]).subscribe(([date]) => {
      this._onChange(date);
      this._onTouched();
      console.log("date", date)
      // this.change.emit(value); // Emit the value changes to the parent component
    });

    this.maxDate = this._dateAdapter.addCalendarDays(this.now, this.acceptableMaxNextDay)
    let previous = -1 * this.acceptableMaxPreviousDay
    this.minDate = this._dateAdapter.addCalendarDays(this.now, previous)
    // this.writeValue(this.defaultValue)
  }

  public writeValue(value: Date | null): void {
    // console.log('default value', value as Date)
    value = value ?? new Date();
    this.dateControl.patchValue(value as Date)
    // this.date = value
  }

  date: Date = new Date()

  public now: Date = new Date();

  // private exitChecker: boolean=false;

  constructor(private _dateAdapter: DateAdapter<any>) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }




  // // ngOnInit(): void {
  // //   this.maxDate = this._dateAdapter.addCalendarDays(this.now, this.acceptableMaxNextDay)
  // //   let previous = -1 * this.acceptableMaxPreviousDay
  // //   this.minDate = this._dateAdapter.addCalendarDays(this.now, previous)
  // //   this.date=new Date(this.defaultValue)
  // // }
  // //
  // public ngOnInit(): void {
  //   combineLatest([
  //     this.dateControl.valueChanges,
  //   ]).subscribe(([date]) => {
  //     this._onChange(date);
  //   });
  // }
  //
  // public onDate(event): void {
  //   // console.log('date', this.date)
  //   // this.selectedDate.emit(this.date)
  //
  // }
  //

  //
  // exit(event: boolean) {
  //   this.exitChecker = event;
  // }
  //
  // private _onChange = (value: Date | null) => undefined;
  // public registerOnChange(fn: (value: Date | null) => void): void {
  //   this._onChange = fn;
  //   console.log(this.date)
  // }


}
