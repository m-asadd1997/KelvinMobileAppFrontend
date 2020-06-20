import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NewsfeedPageComponent } from './newsfeed-page/newsfeed-page.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { BlogpostComponent } from './blogpost/blogpost.component';


const routes: Routes = [
  {
    path:"",component:LoginPageComponent,
    
  },
  {
    path:"register",component:RegisterPageComponent
  },
  {
    path:"newsfeed",component:NewsfeedPageComponent
  },
  {
    path:"search",component:SearchComponent
  },
  {
    path:"profiles/:id",component:ProfileComponent
  },
  {
    path:"notifications",component:NotificationsComponent
  },
  {
    path:"post",component:PostComponent
  },
  {
    path:'blogpost/:id' ,component:BlogpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
