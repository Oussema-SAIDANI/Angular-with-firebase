import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private autherService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }
initForm() {
  this.signUpForm = this.formBuilder.group(
    {
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }
  );
}
OnSubmit() {
  const email = this.signUpForm.get('email').value;
  const password = this.signUpForm.get('password').value;
  this.autherService.createUser(email, password).then(
    () => {
      this.route.navigate(['/books']);
    },
    (error) => {
this.error = error;

    }
  );
}
}
