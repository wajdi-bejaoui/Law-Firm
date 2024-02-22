import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  FormInput!:FormGroup;
  errormsg:String=""
   
  constructor(private FB:FormBuilder, private userservice:UserService, private route: Router){

  }
  ngOnInit(): void {
    this.FormInput = this.FB.group({
      
      email:['',[Validators.required,Validators.email]],
      
      password: ['', [
        Validators.required,
        // Complexité
      ]]
    }) 
      
  }
  login() {
    console.log("Form input:", this.FormInput.value);

    // Check if the form is valid before making the login request
    if (this.FormInput.valid) {
      this.userservice.login( this.FormInput.value ).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Handle successful login, e.g., redirect to another page
          if(response.msg){
            this.route.navigate(['/'])
          }
          else{
            this.errormsg="please chek email/password"
          }
        }
      );
    } 

  }
}
