import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  public formFilter: FormGroup;
  public showAlert = false;
  public contactsList = new Array();
  private amarzenar = new Array();
  private listOk = false

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

    this.formFilter = this.fb.group({
      name: this.fb.control(''),
    });
  }

  private createPhones(): FormGroup {
    const itemGroup = this.fb.group({
      phone: ['', Validators.required],
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
      console.log(this.form);
      this.showAlert = false;
      this.contactsList.push(this.form.value);
      this.modalService.dismissAll();
      console.log(this.contactsList);
      setTimeout(() => {
        this.limpaForm();
      }, 1000 * 1);
    } else {
      this.showAlert = true;
    }
  }

  public filtrar() {
    if (this.amarzenar != undefined) {
      this.amarzenar = this.contactsList
      this.listOk = true
    }

    if (this.formFilter.value.name !== '' && this.listOk) {
      console.log(this.formFilter.value.name)
      this.contactsList =  this.amarzenar
      const filters = this.contactsList.filter(
        (i) => i.name === this.formFilter.value.name
      );
      if (filters.length > 0) {
        this.contactsList = filters;
      }
    }
  }

  private limpaForm() {
    return this.form.reset();
  }

  get phonesArray(): FormArray {
    return this.fb.array([]) && (this.form.get('phones') as FormArray);
  }

  get control() {
    return this.form.controls;
  }
  get controlFilter() {
    return this.formFilter.controls;
  }
}

export interface contact {
  name: string;
  email: string;
  telefones: string[];
}
