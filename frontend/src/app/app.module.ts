import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RandomBackgroundDirective } from './directives/random-background.directive';
import { SignupComponent } from './pages/signup/signup.component';
import { MainComponent } from './pages/main/main.component';
import { VerticallyFixedDirective } from './directives/vertically-fixed.directive';
import { SelectedRowDirective } from './pages/home/directives/selected-row.directive';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormatPipe } from './pages/home/pipes/format.pipe';
import { ScrollIfNotVisibleDirective } from './pages/home/directives/scroll-if-not-visible.directive';
import { MessageComponent } from './common/message/message.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormComponent } from './common/form/form.component';
import { CustomValidatorsDirective } from './directives/custom-validators.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RandomBackgroundDirective,
    SignupComponent,
    MainComponent,
    VerticallyFixedDirective,
    SelectedRowDirective,
    FormatPipe,
    ScrollIfNotVisibleDirective,
    MessageComponent,
    FormComponent,
    CustomValidatorsDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: "pt",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
