import { OktaAuth } from '@okta/okta-auth-js';
import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
    isAuthenticated: boolean = false;
    userFullName: string = ' ';
    storage: Storage= sessionStorage;


  constructor(private oktaAuthService : OktaAuthStateService , @Inject(OKTA_AUTH) private OktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result)=>{
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
   if(this.isAuthenticated){
     this.OktaAuth.getUser().then(
       (res)=> {
        this.userFullName = res.name as string;

        const theEmail= res.email;
        this.storage.setItem('userEmail',JSON.stringify(theEmail));
       }
     )
   }
  }
   logout(){
     this.OktaAuth.signOut
   }
}
