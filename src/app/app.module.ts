import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NoopInterceptor } from './request.intercept';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewsfeedPageComponent } from './newsfeed-page/newsfeed-page.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { OwlModule } from 'ngx-owl-carousel';
import { ProfileComponent } from './profile/profile.component';
import { AppSideBarComponent } from './app-side-bar/app-side-bar.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
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






@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NewsfeedPageComponent,
    SearchComponent,
    ProfileComponent,
    AppSideBarComponent,
    BottomMenuComponent,
    NotificationsComponent,
    PostComponent,
    BlogpostComponent,
    ViewImageComponent,
    ChatComponent,
    AddEventComponent,
    DiscoverEventsComponent,
    EventPreviewComponent,
    ChatroomComponent,
    EditPostComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js',{enabled: environment.production}),
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    OwlModule,
    ReactiveFormsModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    },
    // MessagingService,AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
