import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  jwt:string="";
  user:any;
  constructor( private route:Router, private userservice : UserService){

  }
  
ngOnInit(): void {
  
    let jwt = sessionStorage.getItem("jwt");
    if(jwt){
      let usr:any  = this.decodeToken(jwt);
     this.user =usr;
    }else{
      console.log("error");
      
    }
}
decodeToken(token: string) {
  return jwt_decode(token);
}
deleteUser() {
  this.userservice.deleteUser().subscribe(
    (response) => {
      console.log('User deleted successfully.', response.msg);
      sessionStorage.removeItem("jwt");

      this.route.navigate([''])
      // Optionally, update your UI or perform additional actions after deletion.
    }
    
  );
}
editProfile(id:any){
  this.route.navigate([`updateProfile/${id}`]);
}
}
