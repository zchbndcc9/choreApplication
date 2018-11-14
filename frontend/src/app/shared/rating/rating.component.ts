import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// use of this component
// display only: <app-rating [numStars]="{{task.rating}}" [editable]="false"></app-rating>
// input: <app-rating [(numStars)]="0" [editable]="true"></app-rating>

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  faStar = faStar;

  @Input() editable: boolean;
  @Input() numStars: number;
  @Output() numStarsChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  numStarsChanged(level: number) {
    this.numStars = level;
    this.numStarsChange.emit(level);
  }

}
