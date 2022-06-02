import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder } from '@angular/forms';



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
    acno:[''],
    pswd:['']
   })

//dependancy injection
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  //userdefind function
  acnoChange(event:any){
  this.acno = event.target.value
  console.log(this.acno);
  
}

pswdChange(event:any){
  this.pswd = event.target.value
  console.log(this.pswd);
  
}

//two way 
login(){
 var acno = this.acno
  var pswd = this.pswd

const result = this.ds.login(acno,pswd)

  if(result){
     alert("login successfull")
     this.router.navigateByUrl('dashboard')
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


