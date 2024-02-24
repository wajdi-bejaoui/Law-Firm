import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  role:any;
  fullName:any;
  userName:any;
  constructor(private route : Router){

  }
ngOnInit(): void {
    
}
isConnected(){
  let token = sessionStorage.getItem("jwt");
  
 if(token){
   this.user = this.decodeToken(token);
   this.role = this.user.role;
   this.userName = this.user.userName;

   this.fullName = this.user.fullName;

 }
 

  return !!token;
}
logut(){
  sessionStorage.removeItem("jwt");
  this.route.navigate(['']);
  
}
decodeToken(token: string) {
  return jwt_decode(token);
}

}
