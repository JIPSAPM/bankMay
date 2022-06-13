import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //form group
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {

    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd

    if(this.registerForm.get('uname')?.errors){
    alert("Invalid username")
    }

  
    if (this.registerForm.valid) {

      const result = this.ds.register(uname, acno, pswd)


      if (result) {
        alert("successfully register")
        this.router.navigateByUrl("")
      }
    else {
          alert("Already Existing customer...please Log In")
        }
      }
      else {
        alert("invalid form")
      }
    }
  }