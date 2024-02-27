import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  errorMessage!: string;
  isLoading: boolean = false;
  forgetPasswordMessageSuccess!: string;
  forgetPasswordMessageError!: string;

  //! flags for (3) forms   3chan azhr w a5fy elform ely ana 3ayzha   =========
  forgetFlag: boolean = true;
  verifyFlag: boolean = false;
  newPasswordflag: boolean = false;

  //^ FormGroup create ...
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  //^ create forgetForm    (1)  ===> first form //
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  //^ create verifyForm    (2)  ===> second form //
  verifyForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  //^ create newPasswordForm    (3)  ===> third form //
  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  handleForm(): void {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.loginForm.valid == true) {
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response); //& just for testing
          this.isLoading = false;
          if (response.message == 'success') {
            //^ programming routing (routing to home component if login is success )

            //* steps ...
            //!  (1) localstorage
            localStorage.setItem('userToken', response.token);
            //!  (2) token ===> encode ====> decode 👉🏻
            this._AuthService.saveUserDataMethod();
            //!  (3) navigate to home page
            this._Router.navigate(['/home']);
          }
        },
        error: (error) => {
          // console.log(error); //& just for testing
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  forgetPasswordMethod(): void {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.forgetForm.valid == true) {
      this._AuthService.forgetPasswordAPI(this.forgetForm.value).subscribe({
        next: (response) => {
          // console.log(response); //& just for testing
          this.isLoading = false;
          if (response.message) {
            // console.log(response); //& just for testing
            //^hide first form  , and show verify form
            this.forgetFlag = false;
            this.verifyFlag = true;
            this.forgetPasswordMessageSuccess = response.message;
          }
        },
        error: (error) => {
          // console.log(error); //& just for testing
          this.forgetPasswordMessageError = error.error.message;

          this.isLoading = false;
        },
      });
    }
  }

  verifyCodeMethod(): void {
    this.isLoading = true;
    this._AuthService.verifyCodeAPI(this.verifyForm.value).subscribe({
      next: (response) => {
        // console.log(response); //& just for testing
        this.isLoading = false;
        if (response.status == 'Success') {
          console.log('فل الفل '); //& just for testing
          //^ hide verify form  , and show new password form
          this.verifyFlag = false;
          this.newPasswordflag = true;
        }
      },
      error: (error) => {
        console.log('زي الخرااا ');
        console.log(error); //& just for testing
        this.isLoading = false;
      },
    });
  }

  newPasswordMethod(): void {
    this.isLoading = true;
    this._AuthService.newPasswordAPI(this.newPasswordForm.value).subscribe({
      next: (response) => {
        // console.log(response); //& just for testing
        this.isLoading = false;
        if (response.token) {
          console.log(response); //& just for testing
          console.log('الرقم السري زي الفل '); //& just for testing
          this._Router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.log('زي الخرااا '); //& just for testing
        console.log(error); //& just for testing
        this.isLoading = false;
      },
    });
  }
}
