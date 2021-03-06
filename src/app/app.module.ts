import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import * as Sentry from '@sentry/browser';
import { ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FooterComponent } from './root-layouts/footer/footer.component';
import { HeaderComponent } from './root-layouts/header/header.component';
import { NavigationComponent } from './root-layouts/navigation/navigation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { QuillModule } from 'ngx-quill';
import { ErrorHandlerInterceptor } from '@core/interceptors/error-handler.interceptor';
import { LoaderComponent } from './root-layouts/loader/loader/loader.component';


if (environment.production) {
  Sentry.init({
    dsn: 'https://9e944a3c0ca8449cb93b48ecf876aa2e@sentry.io/3227290'
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: any) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200', 'woopsel.be', 'www.woopsel.be']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    { provide: ErrorHandler, useClass: environment.production ? SentryErrorHandler : ErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
