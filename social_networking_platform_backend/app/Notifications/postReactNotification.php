<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class postReactNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    protected $userReacted;    

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($userReacted)
    {
        $this->userReacted = $userReacted;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast'];
    }

    
    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->userReacted->name . ' was reacted on your post',
        ]);
    }
    public function broadcastType(): string
    {
        return 'broadcast.message';
    }
}
