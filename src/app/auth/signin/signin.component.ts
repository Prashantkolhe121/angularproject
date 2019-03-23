import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
 
  constructor(private authService:AuthService){}
  onSignin(form:NgForm)
  {
     this.authService.signinUser(form.value.email,form.value.password);
  }
}
