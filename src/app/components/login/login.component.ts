import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode = 0;
  constructor( private authService: AuthenticationService , private router: Router) { }

  ngOnInit() {
  }

  onLogin(user: any) {
    this.authService.login(user)
    .subscribe(resp => {
      const jwtToken = resp.headers.get('authorization');
      // le jwt est récupéré de m'entête de resp. Cela suppose de onnaitre le nome de l'entête dans lequel est rangé le jwt
      // console.log(resp.headers.get('authorization')); // retourne le jwt
      this.authService.saveToken(jwtToken);
      this.router.navigateByUrl('/tasks');
    }, error => {
      this.mode = 1;
      console.log(error);
    });
  }
  onRegister(data: any) {
    console.log(data);
  }
}
