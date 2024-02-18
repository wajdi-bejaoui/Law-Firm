import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
FormInput!:FormGroup;
password1: string = '';
password2: string = '';
imagePreview: any;
  constructor( private FB:FormBuilder){}
ngOnInit(): void {
  this.FormInput = this.FB.group({
    fullName:['',[Validators.required,Validators.minLength(3)]],
    Username:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    phoneNumber:['',[  Validators.required,
      Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),  // Longueur minimale
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/), // Complexité
    ]],
    confirmPassword:['',[ Validators.required,
      Validators.minLength(8),  // Longueur minimale
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/), // Complexité
    ]],
    gender: ['', [
      Validators.required,
      Validators.pattern(/^(male|female|other)$/i),  // Vous pouvez ajouter d'autres options si nécessaire
    ]]
  }) 
    
}
passwordMatchValidator() {
  const password1 = this.FormInput.controls['password'].value;
  const password2 = this.FormInput.controls['confirmPassword'].value;

  if (password1 === password2) {
    return null; // Aucune erreur
  } else {
    return { passwordMismatch: true };
  }
}
signup(){
  console.log("sign up complet", this.FormInput.value);

}
onImageSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];

    // Assuming this.FormInput is an instance of FormGroup
    this.FormInput.patchValue({ img: file });
    this.FormInput.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      // Assuming this.imagePreview is a property to store the image preview
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    console.error('No file selected'); // Handle the case where no file is selected
  }
}

}
