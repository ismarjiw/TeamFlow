import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../services/teams/teams.service';
import { Team } from '../../services/teams/teams.service'

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.css']
})
export class CreateteamComponent {

  // Team creation form fields
  name: string = '';
  description: string = '';
  selectedMembers: string[] = [];

  @Output() teamCreated = new EventEmitter<any>();
  teamForm: FormGroup;

  // Mock member list (replace with actual member data from db)
  members = ['Alice', 'Bob', 'Charlie', 'David', 'Emily'];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private teamsService: TeamsService) {
      this.teamForm = this.fb.group({});
  }

  ngOnInit() {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      selectedMembers: [[], Validators.required] 
    });
  }

  onSubmit() {
    if (this.teamForm.valid) {
      
      const name = this.teamForm.value.name;
      const description = this.teamForm.value.description;
      const selectedMemberNames = this.teamForm.value.selectedMembers;

      this.teamsService.createTeam(name, description, selectedMemberNames)
        .subscribe((team: Team) => {
          console.log(team);
          this.teamCreated.emit(team);
          this.dialog.closeAll();
        });
    }
  }
  

}
