import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../Services/review.service';

@Component({
  selector: 'app-list-lawyers',
  templateUrl: './list-lawyers.component.html',
  styleUrls: ['./list-lawyers.component.css']
})
export class ListLawyersComponent implements OnInit{
  listLawyers :any;
  constructor(private reviewService : ReviewService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("here")
    this.reviewService.getAllLawyers().subscribe(
      (response: any) => {
        console.log(response)
        this.listLawyers=response.lawyers;
        console.log(this.listLawyers)
      }
    )
  }
}
