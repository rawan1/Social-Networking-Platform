import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SwPush } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private swPush: SwPush) {
    this.swPush.requestSubscription({
      serverPublicKey: '12345', // Replace with your server public key
    }).then(subscription => {
      // Send the subscription object to your backend server
      console.log('********************');
      confirm('Meddsddsfdf');
    }).catch(error => {
      // Handle errors
      console.error(error);
    });
    // Listen to push notification messages
    this.swPush.messages.subscribe(message => {
      // Do something with the message payload
      console.log(message);
      confirm('Meddsddsfdf');

    });
  }



  public showNotifications() {
    confirm('Meddsddsfdf');
  }
}
