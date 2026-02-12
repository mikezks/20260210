import { httpResource } from '@angular/common/http';
import { Component, input, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, schema, SchemaPath, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';


export function validateFirstname(
  firstnameField: SchemaPath<string>,
  validFirstnames: string[]
): void {
  validate(firstnameField, ({ value }) =>
    validFirstnames.includes(value())
      ? null
      : {
        kind: 'forbiddenFirstname',
        message: 'The entered Firstname is not valid. Please use one of the following: '
          + validFirstnames.join(', ')
      }
  )
}

// (3) Form Logic: validators, conditional disabled, field properties

export const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.firstName, {
    message: 'Enter FirstName or Name.',
    when: ({ valueOf }) => !valueOf(passengerPath.name)
  });
  required(passengerPath.name, {
    message: 'Enter FirstName or Name.',
    when: ({ valueOf }) => !valueOf(passengerPath.firstName)
  });
  validateFirstname(passengerPath.firstName, [
    'Emma', 'Mia', 'Hanna'
  ])
});

@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (4) UI Control: Template Binding
    FormField,
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  readonly id = input(0, { transform: numberAttribute });

  // (1) Data Model: Writable Signal
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });

  // (2) Form State: value, valid, dirty, touched, readonly, disabled, hidden, errors
  protected editForm = form(this.passengerResource.value, passengerSchema);

  protected save(event: Event): void {
    event.preventDefault();
    console.log(
      this.editForm().value(),
      this.passengerResource.value()
    );
  }
}
