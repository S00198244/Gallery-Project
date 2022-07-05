import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arrayAdd, arrayRemove, arrayUpdate } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Art } from 'src/app/interfaces/art';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { IComment } from 'src/app/interfaces/icomment';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/store/event.query';
import { EventStore } from 'src/app/store/event.store';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  artEvent$!: ArtEvent | undefined;
  eventArtPieces!: Art[] | undefined;

  userID$!: string | null;

  comments!: IComment[];

  selectedComment!: IComment;

  commentForm!: FormGroup;

  // showForm!: boolean;



  constructor(private sessionQuery: SessionQuery, private eventQuery: EventQuery, private eventStore: EventStore, private eventService: EventService) {

  this.eventQuery.artEvent$.subscribe(res => this.artEvent$ = res);
  this.eventQuery.art$.subscribe(res => this.eventArtPieces = res);

  this.sessionQuery.userID$.subscribe(res => this.userID$ = res);

  }
 
  ngOnInit(): void { 

    this.commentForm = new FormGroup({
      comment: new FormControl(null, Validators.required)
    })

  console.log(this.artEvent$);

  this.getComments();

  }

  clicked(comment: IComment) {

    console.table(comment);

    this.selectedComment = comment;
  }

  showEditCommentForm() {

  }

  // showCommentForm() {

  //   if (this.showForm == true) // If true set to false
  //   {
  //     this.showForm = false
  //   }
  //   else
  //     this.showForm = true

  //   console.log(this.showForm);
  // }

  // Get comments

  getComments() {

    console.log("getComments()");

    this.eventService.getComments().subscribe(res => this.comments = res);
  }

  // Adding a comment

  addComment() {

    console.log('In addComment()');

    this.eventService.addComment(this.commentForm.get('comment')?.value).subscribe(res => console.log(res));

    this.getComments();
  }

  // Deleting a comment

  deleteComment(comment: IComment) {

    if(this.userID$ == comment.userID)
    {
      console.log("In deleteComment()");

      this.eventService.deleteComment(comment._id).subscribe(res => console.log(res));

      this.getComments();
    }
    else 
      return;
  }

  // Edit (update) a comment

  editComment(commentID: string) {

    if(this.userID$ == this.selectedComment.userID)
    {
    console.log("In editComment()");

    this.eventService.editComment(commentID, this.commentForm.value.comment).subscribe(res => console.log(res));

    this.getComments();
    }
    else 
      return;
  }
}
