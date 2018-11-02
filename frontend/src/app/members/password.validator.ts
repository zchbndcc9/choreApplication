import { FormGroup } from '@angular/forms';

export class PasswordValidator {
  static match(passwordForm: FormGroup) {
    const password = passwordForm.controls.password.value;
    const confirmPassword = passwordForm.controls.confirmPassword.value;

    if (password !== confirmPassword) {
      return {'passwordsMustMatch': true};
    }
    return null;
  }
}
