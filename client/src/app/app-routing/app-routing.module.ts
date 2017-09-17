import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from '../sign-in/sign-in.component';
import {LoginComponent} from '../login/login.component';
import { ChatComponent } from '../chat/chat.component';

const routes: Routes = [
  {path: 'sign_in', component: SignInComponent},
  {path: '', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
