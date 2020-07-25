import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit, OnDestroy {

  userSubject = new BehaviorSubject<SocialUser>(null);

  socialLoginSub: Subscription;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private snackBar: SnackBarService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.socialLoginSub.unsubscribe();
  }

  ngOnInit(): void {
    this.socialLoginSub = this.authService.authState.subscribe(result => this.userSubject.next(result));
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => this.loginOnApiWithGoogleToken(user.idToken));
  }

  continueLoginWithUser() {
    this.loginOnApiWithGoogleToken(this.userSubject.getValue().idToken);
  }

  private loginOnApiWithGoogleToken(idToken: string) {
    this.authenticationService.signInWithGoogle(idToken)
      .subscribe(
        response => this.router.navigate(['/']),
        (error: HttpErrorResponse) => this.handleOauthError(error));
  }

  private handleOauthError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.snackBar.showMessage('User not found, please first activate an account');
      return;
    }
    this.snackBar.showMessage('An error occurred while authenticating with google');
  }
}
