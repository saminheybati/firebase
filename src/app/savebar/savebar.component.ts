import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-savebar',
  templateUrl: './savebar.component.html',
  styleUrls: ['./savebar.component.scss']
})
export class SavebarComponent implements OnInit , OnChanges{
  @Input() enable:boolean
  @Output() save = new EventEmitter<boolean>();
  constructor() {
  }

  ngOnInit(): void {
    console.log('enable',this.enable)
  }

  saveButton() {
    this.save.emit(true)
  }

  cancelButton() {
    this.save.emit(false)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('enable',this.enable)
  }
}
