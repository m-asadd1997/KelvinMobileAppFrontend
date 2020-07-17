import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class MessagingService {

constructor() {
// this.angularFireMessaging.messages.subscribe(
// (_messaging) => {
// // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
// // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
//   console.log("_messaging");
  
// }
// )
// }
// requestPermission() {
// this.angularFireMessaging.requestToken.subscribe(
// (token) => {
// console.log(token);
// },
// (err) => {
// console.error('Unable to get permission to notify.', err);
// }
// );
// }
// receiveMessage() {
// this.angularFireMessaging.messages.subscribe(
// (payload) => {
// console.log("new message received. ", payload);
// this.currentMessage.next(payload);
// })
// }
// }
}
}