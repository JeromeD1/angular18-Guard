import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new BehaviorSubject<User[]>([]);
  currentUsers = this.users.asObservable();

  constructor(private http: HttpClient) { 
    this.getUsers().subscribe(data => this.users.next(data));
    //getUsers() est appelé dans le constructeur afin qu'il soit exécuté dès que le service est instancié.
    //sans cela, la fonction ne serait pas appellée et currentUsers ne serait pas rempli
  }
  //on a ainsi créé un observable currentUsers qui contient initialement les données de users.json
  //mais qu'on peut modifier et partager

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>('assets/users.json');
  }

  setCurrentUsers(newUsers: User[]) {
    this.users.next(newUsers);
  }

  
}
