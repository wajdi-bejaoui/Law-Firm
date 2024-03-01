import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../Services/review.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment:string ="";
  idLawyer: any;
  listReviews !: any[];
  constructor(private reviewService : ReviewService,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.idLawyer = this.activateRoute.snapshot.paramMap.get('id');
    console.log("here id", this.idLawyer);
    this.getLawyerReviews();
    // this.FormInput = this.FB.group({
    //   fullName:['',[Validators.required,Validators.minLength(3)]],
    // })
  }



  addComment() {
    console.log(this.comment)
    this.reviewService.AddReview({
      comment : this.comment,
      lawyer : this.idLawyer,
    }).subscribe(
      (response: any) => {
        console.log("added",response)
        this.getLawyerReviews();
      }
    );
  }

  getLawyerReviews() {
    this.reviewService.getLawyerReviews(this.idLawyer).subscribe(
      (response: any) => {
        console.log("reviews",response)
        this.listReviews = response.reviews;
      }
    )
  }

}
