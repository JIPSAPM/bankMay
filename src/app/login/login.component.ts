import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  //properties
 aim="perefect banking patner"
 accno="username please"
 acno=""
 pswd=""

  //form group
  loginForm = this.fb.group({
    acno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
   })

//dependancy injection
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  

//two way 
login(){
 var acno = this.loginForm.value.acno
  var pswd = this.loginForm.value.pswd

  if(this.loginForm.valid){
    const result = this.ds.login(acno,pswd)

    if(result){
       alert("login successful")
       this.router.navigateByUrl('dashboard')
     }
  
  }
  else{
    alert("Invalid Form")
  }
}
}
//template referencing variable
// login(a:any,p:any) {
//   console.log(a.value);
  
//   var acno = a.value
//   var pswd = p.value

//   let db = this.db
//   if(acno in db){
//    if(pswd ==db[acno]["password"]){
//      alert("login successfull")
//    }
//    else{
//      alert("incorrect password")
//    }
//  }  
//  else{
//    alert("user does not exist")
//  }
// }
// }


