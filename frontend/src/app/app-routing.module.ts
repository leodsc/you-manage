import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: LoginComponent, path: 'entrar' },
  { component: SignupComponent, path: 'signup' },
  { component: SignupComponent, path: 'cadastrar' },
  { component: HomeComponent, path: 'home', canActivate: [AuthGuard] },
  { component: HomeComponent, path: 'inicio', canActivate: [AuthGuard] },
  { component: LoginComponent, path: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
