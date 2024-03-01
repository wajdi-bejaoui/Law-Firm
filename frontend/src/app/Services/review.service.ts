import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewUrl:string  = "http://localhost:3000/api/v1/reviews";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    })
  };

  AddReview(obj : any): Observable<{msg:any}> {
    return this.httpclient.post<{msg:any}>(`${this.reviewUrl}`,obj, this.httpOptions);
  }

  getLawyerReviews(lawyerId : string): Observable<{msg:any}> {
  
    return this.httpclient.get<{msg:any}>(`${this.reviewUrl}/lawyer/${lawyerId}`, this.httpOptions);
  }

  getAllLawyers(): Observable<any[]> {
  
    return this.httpclient.get<any[]>(`${this.reviewUrl}/lawyers`);
  }

  constructor(private httpclient: HttpClient) { }
}
