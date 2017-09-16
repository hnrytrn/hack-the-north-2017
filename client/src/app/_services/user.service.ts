import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  private userEndpoint = 'http://127.0.0.1:8080/api/user/';

  create(user: User) {
      let headers = new Headers({ 'Content-Type': 'application/json', });
      let options = new RequestOptions({ headers: headers});
      
      return this.http.post(this.userEndpoint, user, options)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  login(email: String, password: String) {
    let headers = new Headers({ 'Content-Type': 'application/json', });
    let options = new RequestOptions({ headers: headers});
    
    return this.http.post(this.userEndpoint, {"email": email, "password": password}, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
