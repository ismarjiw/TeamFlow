import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../services/teams/teams.service';
// import { Team } from '../../services/teams/teams.service'
import { ActivatedRoute } from '@angular/router';
 import { Team } from '../../services/company/company.service'

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.css']
})
export class CreateteamComponent {
users:any[]=[];
  // Team creation form fields
  name: string = '';
  description: string = '';
  selectedMembers: any[] = [];
companyId:number=6
  @Output() teamCreated = new EventEmitter<any>();
  teamForm: FormGroup;

  // Mock member list (replace with actual member data from db)
//   members = ['Alice', 'Bob', 'Charlie', 'David', 'Emily'];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private teamsService: TeamsService) {
      this.teamForm = this.fb.group({});
  }

  ngOnInit() {

      if (!this.companyId) {
          // If not set, initialize it to a default value
          this.companyId = 6;
        }

        // Subscribe to route parameters
        this.route.params.subscribe(params => {
          // Update this.companyId with the value from params['cid']
          // if it is provided in the route parameters
          if (params['cid']) {
            this.companyId = +params['cid']; // Convert to number if needed
          }

          // Rest of your logic goes here based on the updated this.companyId
        });
//       this.teams = this.teamsService.getCreatedTeams();
      this.teamsService.getUsersByCompany(this.companyId).subscribe(
        (users: any[]) => {
          this.users = users;
        },
        error => {
          console.error('Error fetching teams:', error);
        }
      );


    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      selectedMembers: [[], Validators.required]
    });
  }

  onSubmit() {
  const newTeam ={
  name: this.teamForm.value.name,
  description:this.teamForm.value.description,
  teammates: this.teamForm.value.selectedMembers}
    if (this.teamForm.valid) {

      const name = this.teamForm.value.name;
      const description = this.teamForm.value.description;
      const selectedMemberNames = this.teamForm.value.selectedMembers;
// console.log(name, description, selectedMemberNames);
      this.teamsService.createTeam(this.companyId,newTeam)
        .then((team: Team) => {
          console.log(team);
          this.teamCreated.emit(team);
          this.dialog.closeAll();
        });
    }
  }


}
