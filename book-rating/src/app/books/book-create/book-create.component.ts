import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {


  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    })
  });

  isInvalid(controlName: keyof typeof this.bookForm.controls): boolean {
    const control = this.bookForm.controls[controlName];
    // const control = this.bookForm.get(controlName);

    return control.touched && control.invalid;
  }

  // Aufgabe: Diese Methode implementieren :-)
  hasError(controlName: keyof typeof this.bookForm.controls, errorCode: string): boolean {
    const control = this.bookForm.controls[controlName];

    // return (control.errors?.[errorCode]) && control.touched;
    // return !!control.getError(errorCode) && control.touched;
    return control.hasError(errorCode) && control.touched;

  }

}


/*
TODO
- Validierung
- Fehlermeldungen
  - "Die ISBN ist ungültig."
  - "Die ISBN ist zu kurz."
- Submit-Button
- abschicken
- HTTP
- bei Erfolg:
  - Meldung anzeigen
  - wegnavigieren, z. B. zur Detailseite
  - Formular zurücksetzen

*/
