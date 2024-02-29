import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Member {
  id: number;
  profile: {
    firstName: string;
    lastName: string;

  };
}
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent {
  @Input() name: string = ''
  @Input() totalProjects: number = 0;
  @Input() members: Member[] = [];
  @Input() teamId: number = -1;
  @Input() companyId: number = -1;
}
