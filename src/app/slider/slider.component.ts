import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
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
  @Input() vertical: boolean
  @Input() invert: boolean
  @Input() max: number
  @Input() min: number
  @Input() step: number
  @Input() thumbLabel: any
  @Input() defaultValue: number;
  @Output() value = new EventEmitter<number>();


  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };



  control!: FormControl;

  constructor() {
  }
  ngOnInit(): void {
    this.control = new FormControl(this.defaultValue);
    console.log(this.control.value)
    this.control.valueChanges.subscribe((value) => {
      console.log('value',value)
      this.onChange(value);
      this.onTouched();
      this.value.emit(value)
    });
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
}
