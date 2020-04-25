import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent implements OnInit {

  signInForm: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private autherService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }
initForm() {
  this.signInForm = this.formBuilder.group(
    {
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }
  );
}
OnSubmit() {
  const email = this.signInForm.get('email').value;
  const password = this.signInForm.get('password').value;
  this.autherService.signInUser(email, password).then(
    () => {
      this.route.navigate(['/books']);
    },
    (error) => {
this.error = error;

    }
  );
}

}
