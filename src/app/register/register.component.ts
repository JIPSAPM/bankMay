import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  uname = ""
  acno = ""
  pswd = ""

  //form group
  registerForm = this.fb.group({
    acno:[''],
    pswd:[''],
    uname:['']
  })

  constructor(private ds: DataService, private router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    
    
    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd

    const result = this.ds.register(uname, acno, pswd)


    if (result) {
      alert("successfully register")
      this.router.navigateByUrl("")
    }
    else {
      alert("Already Existing customer...please Log In")
    }
  }
}
