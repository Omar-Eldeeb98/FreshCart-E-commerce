import { AuthService } from './../../shared/service/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  errorMessage!: string;
  isLoading: boolean = false;

  //^ FormGroup create ...
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.rePasswordConfirmation
  );

  handleForm(): void {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.registerForm.valid == true) {
      // console.log(this.registerForm.value); //& just for testing
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response); //& just for testing
          this.isLoading = false;

          //^ programming routing (routing to login component if register is success )
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          // console.log(error.error.message); //& just for testing
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  //^  re-password confirmation function
  rePasswordConfirmation(g: any) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { ay7aga: true };
    }
  }
}
