import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    });
  }

  private createForm() {
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
    if (this.form.valid) {
      alert('sucesso');
    } else {
      alert('epa');
    }
  }

  get phonesArray(): FormArray {
    return this.fb.array([]) && (this.form.get('phones') as FormArray);
  }

  get control() {
    return this.form.controls;
  }
}
