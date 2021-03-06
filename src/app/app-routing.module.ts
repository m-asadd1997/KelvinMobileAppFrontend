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
import { ViewImageComponent } from './view-image/view-image.component';
import { ChatComponent } from './chat/chat.component';
import { AddEventComponent } from './add-event/add-event.component';
import { DiscoverEventsComponent } from './discover-events/discover-events.component';
import { EventPreviewComponent } from './event-preview/event-preview.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddpostNotificationsComponent } from './addpost-notifications/addpost-notifications.component';


const routes: Routes = [
  {
    path: "", component: LoginPageComponent,

  },
  {
    path: "register", component: RegisterPageComponent
  },
  {
    path: "newsfeed", component: NewsfeedPageComponent
  },
  {
    path: "search", component: SearchComponent
  },
  {
    path: "profiles/:id", component: ProfileComponent
  },
  {
    path: "notifications", component: NotificationsComponent
  },
  {
    path: "post", component: PostComponent
  },
  {
    path: 'blogpost/:id', component: BlogpostComponent
  }, {
    path: 'viewimage/:id', component: ViewImageComponent
  },
  {
    path: 'chat/:chatroom/:friendId', component: ChatComponent
  },
  {
    path: 'addevent', component: AddEventComponent
  },
  {
    path: 'discoverevents', component: DiscoverEventsComponent
  },
  {
    path: 'previewevent/:id', component: EventPreviewComponent
  },
  {
    path: 'editevent/:id', component: AddEventComponent
  },
  {
    path: 'chatroom', component: ChatroomComponent
  },
  {
    path:'edit-post/:id',component:EditPostComponent
  },
  {
    path:'forgot-password',component:ForgotPasswordComponent
  },
  {
    path:'resetlink/:uuid',component:ResetPasswordComponent
  },
  {
    path:'addpostnotifications',component:AddpostNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
