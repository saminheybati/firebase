import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-savebar',
  templateUrl: './savebar.component.html',
  styleUrls: ['./savebar.component.scss']
})
export class SavebarComponent implements OnInit {

  @Output() save = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  saveButton() {
    this.save.emit(true)
  }

  cancelButton() {
    this.save.emit(false)
  }
}
