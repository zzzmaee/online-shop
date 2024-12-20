import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBoxComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogBoxComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(''),
    price: new FormControl(''),
    year: new FormControl(''),
    chip: new FormControl(''),
    SSD: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl('')
  });
  isNew: boolean = true;

  constructor() {
    if (this.data) this.isNew = false;
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  };

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      configure: {
        chip: this.myForm.value.chip,
        SSD: this.myForm.value.SSD,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display
      }
    };
    this.dialogRef.close(this.data);
  }
}
