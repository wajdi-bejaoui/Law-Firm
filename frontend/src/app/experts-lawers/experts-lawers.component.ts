import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experts-lawers',
  templateUrl: './experts-lawers.component.html',
  styleUrls: ['./experts-lawers.component.css']
})
export class ExpertsLawersComponent implements OnInit{
  Lawers:any=[];
  constructor(){


  }
  ngOnInit(): void {
   this.Lawers=[
    {id:1,email:"hjeiji@gmail.com", tel:27741552, pay:"tunis",nom:"nabil", prenom:"hjeij"},
   {id:2,email:"wajdi@gmail.com", tel:27741552, pay:"tunis",nom:"wajdi", prenom:"bejoui"},
   {id:3,email:"fakhri@gmail.com", tel:27741552, pay:"tunis",nom:"fakhri", prenom:"sakhri"},]   
  }

}
