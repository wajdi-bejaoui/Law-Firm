import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lates-news',
  templateUrl: './lates-news.component.html',
  styleUrls: ['./lates-news.component.css']
})
export class LatesNewsComponent implements OnInit {
  Lates:any=[];
  constructor(){}
  ngOnInit(): void {
      this.Lates=[{id:1,title:"Legal Documents Every Landlord Needs", Date: "JUNE / 20/ 2019", admin:"admin"},
      {id:1,title:"Legal Documents Every Landlord Needs", Date: "JUNE / 20/ 2019", admin:"admin"},
      {id:1,title:"Legal Documents Every Landlord Needs", Date: "JUNE / 20/ 2019", admin:"admin"},]
  }

}
