import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private host = 'http://localhost:8080';
private jwtToken: string;
private roles: Array<any>;
  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(this.host  + '/login', user, {observe: 'response'}); // {observe: 'response'} est un "options"
  }
  saveToken(jwt: string) {
    this.jwtToken = jwt;
    // Initialisation de la valeur du ytoken
    localStorage.setItem('token', jwt);
    // Permet d'enregistrer dans le local storage
    const jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    // Permet d'aller chercher les rôles dans le Token
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }
  getTasks(): Observable<[Task]> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get<[Task]>(this.host + '/tasks', {headers: new HttpHeaders({Authorization: this.jwtToken})});
    // il faut le faire à chaque fois qu'une requête est envoyée
  }
  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
  }
  isAdmin() {
    // on utilise Angular2-jwt
    for (const r of this.roles) {
      if (r.authority === 'ADMIN') {
        return true;
      }
    }
    return false;
  }
  saveTask(data: Task): Observable<Task> {
    // const headers = new HttpHeaders();
    // headers.append('authorization', this.jwtToken);
    return this.http.post<Task>(this.host + '/tasks', data, {headers: new HttpHeaders({authorization: this.jwtToken})});
  }
}

