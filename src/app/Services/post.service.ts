
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  submitPost(id,obj): Observable<any> {
    return this.http.post(environment.baseUrl + "api/post/"+id, obj);
  }

  getUserPosts(id): Observable<any> {
    return this.http.get(environment.baseUrl + "api/user-posts/" + id)
  }

  getPostById(id): Observable<any> {
    return this.http.get(environment.baseUrl + "api/post/" + id);
  }
  getAllBusinessPosts():Observable<any>{
    return this.http.get(environment.baseUrl+"api/business-posts")
  }

  deletePost(id):Observable<any>{
    return this.http.delete(environment.baseUrl+"api/post/delete-post/"+id);
  }

  editPost(id,obj):Observable<any>{
    return this.http.put(environment.baseUrl+"api/post/update-post/"+id,obj);
  }
}
