import {Component, DoCheck, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {combineLatest, pairwise} from "rxjs";
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
export class DatePickerComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() disable: boolean;
  @Input() acceptableMaxNextDay: number;
  @Input() acceptableMaxPreviousDay: number;
  @Input() defaultValue: any;
  @Output() selectedDate = new EventEmitter<Date>();

  maxDate: Date
  minDate: Date

  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };

  now: any

  constructor(private _dateAdapter: DateAdapter<any>) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  control!: FormControl;

  ngOnInit(): void {
    this.control = new FormControl();
    console.log(this.control.value)
    this.control.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
      console.log(value)
      this.selectedDate.emit(value);
    });
    let dateMin = new Date()
    let dateMax = new Date()
    this.minDate = new Date(dateMin.setDate(dateMin.getDate() - this.acceptableMaxPreviousDay));
    this.maxDate = new Date(dateMax.setDate(dateMax.getDate() + this.acceptableMaxNextDay));


  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }


  //
  // private onChange: any = () => {};
  // private onTouched: any = () => {};
  //
  // setDisabledState?(isDisabled: boolean): void {
  //   if (isDisabled) {
  //     this.control.disable();
  //   } else {
  //     this.control.enable();
  //   }
  // }
  //

  // ngDoCheck(): void {
  //   this.setDisabledState(this.disable)
  // }


  // private _onChange = (value: any | null) => undefined;
  //
  //
  // registerOnChange(fn: Function) {
  //   this.dateForm.valueChanges.subscribe((val) => fn(val));
  //   console.log(fn)
  // }
  //
  // private _onTouched = () => undefined;
  //
  // public registerOnTouched(fn: () => void): void {
  //   this._onTouched = fn;
  // }
  //
  // dateForm = new FormGroup({})
  //
  // public ngOnInit(): void {
  //   this.dateForm = new FormGroup({
  //     date: new FormControl({value:null, disabled:false}),
  //   });
  //   combineLatest([
  //     this.dateForm.get('date').valueChanges,
  //   ]).pipe(pairwise()).subscribe(([date]) => {
  //     this._onChange(date);
  //     this._onTouched();
  //     console.log("date", date)
  //     console.log('contr', this.dateForm.value.date)
  //     // this.change.emit(value); // Emit the value changes to the parent component
  //   });
  //
  //   this.maxDate = this._dateAdapter.addCalendarDays(this.now, this.acceptableMaxNextDay)
  //   let previous = -1 * this.acceptableMaxPreviousDay
  //   this.minDate = this._dateAdapter.addCalendarDays(this.now, previous)
  //   // this.writeValue(this.defaultValue)
  // }
  //
  // public writeValue(value: Date | null): void {
  //   // console.log('default value', value as Date)
  //   value = value ?? new Date();
  //   this.dateForm.patchValue({date: value})
  //   // this.date = value
  // }
  //
  // date: Date = new Date()
  //
  // public now: Date = new Date();
  //
  // ngOnChanges(changes: SimpleChanges): void {
  // }

  // private exitChecker: boolean=false;


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
