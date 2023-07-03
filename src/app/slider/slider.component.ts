import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent implements ControlValueAccessor {

  @Input() disabled: boolean
  @Input() max: number
  @Input() min: number
  @Input() step: number
  @Input() thumbLabel: any
  @Input() showTicks: any


  control!: FormControl;

  constructor() {
  }
value
  ngOnInit(): void {
    this.control = new FormControl();
    console.log(this.control.value)
    this.control.valueChanges.subscribe((value) => {
      console.log('value',value)
      ////emit
    });
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
