import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../../services/comments.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnDestroy {

  serviceSubscribe: Subscription | undefined;
  commentForm = this.formBuilder.group({
    text: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
  });
  @Input()
  postId!: number;

  @Output()
  commentAdded: EventEmitter<string> = new EventEmitter<string>();
  ;
  constructor(private commentService: CommentsService, public formBuilder: FormBuilder,) { }

  submit() {
    if (this.commentForm.invalid) {
      return;
    }
    this.serviceSubscribe = this.commentService.addComment(this.postId, this.commentForm.get('text')?.value ?? '')
      .subscribe(() => {
        this.commentAdded.emit(this.commentForm.get('text')?.value || '');
        this.commentForm.reset();
      });
  }
  ngOnDestroy(): void {
    this.serviceSubscribe?.unsubscribe();
  }
}
