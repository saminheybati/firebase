import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() label: string;
  @Input() disable: boolean;
  @Input() acceptableMaxNextDay: number;
  @Input() acceptableMaxPreviousDay: number;
  @Input() defaultValue: any;
  @Output() selectedDate = new EventEmitter<Date>();

  date: Date=new Date()
  maxDate: Date
  minDate: Date
  public now: Date = new Date();

  constructor(private _dateAdapter: DateAdapter<any>) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.maxDate = this._dateAdapter.addCalendarDays(this.now, this.acceptableMaxNextDay)
    let previous = -1 * this.acceptableMaxPreviousDay
    this.minDate = this._dateAdapter.addCalendarDays(this.now, previous)
    this.date=new Date(this.defaultValue)
  }



  public onDate(event): void {
    // console.log('date', this.date)
    this.selectedDate.emit(this.date)

  }

}
