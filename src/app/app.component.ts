import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'newContato';

  @ViewChild('modalNewContact', { static: true }) modalNewContact: any;
  public form: FormGroup;
  public showAlert = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createNewContact() {
    this.openModal();
  }

  private openModal() {
    this.modalService.open(this.modalNewContact, {
      animation: true,
      size: 'lg',
    });
  }

  public createForm() {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phones: this.fb.array([this.createPhones()]),
    });
  }

  private createPhones(): FormGroup {
    const itemGroup = this.fb.group({
      phone: this.fb.control('', [Validators.required]),
    });
    return itemGroup;
  }

  public addPhones(): FormArray {
    this.phonesArray.push(this.createPhones());
    return this.phonesArray;
  }

  public removeTelefone(index: number) {
    this.phonesArray.removeAt(index);
  }

  public criarContato() {
    console.log(this.form);
    if (this.form.valid) {
      this.showAlert = false;
      this.modalService.dismissAll();
    } else {
      this.showAlert = true;
    }
  }

  get phonesArray(): FormArray {
    return this.fb.array([]) && (this.form.get('phones') as FormArray);
  }

  get control() {
    return this.form.controls;
  }
}
