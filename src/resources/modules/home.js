import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';

@inject(Router)
export class Home {
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
    this.loginError = '';
    this.message = 'Home';
  }


  login() {
    return this.auth.login(this.email, this.password)
      .then(response => {
        this.userObj = response.user;
        sessionStorage.setItem('userObj', JSON.stringify(this.userObj));
        this.loginError = '';
        this.authenticated = this.auth.isAuthenticated();
        this.router.navigate('home');
      })
      .catch(error => {
        console.log(error);
        this.authenticated = false;
        this.loginError = 'Invalid credentials.';
      });
  }
}

