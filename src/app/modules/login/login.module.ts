import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { MaterialModule } from '@app/modules/material/material.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('346054450113-nb0l4atr9h6r9s3rmfli7u75ep5pl3be')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, SocialLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class LoginModule { }
