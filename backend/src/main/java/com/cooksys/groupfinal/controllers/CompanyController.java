package com.cooksys.groupfinal.controllers;

import java.util.Set;

import com.cooksys.groupfinal.entities.Team;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.ProjectService;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor

@CrossOrigin(origins = {"http://localhost:4200"},
methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE})
public class CompanyController {
	
	private final CompanyService companyService;
	private final AnnouncementService announcementService;
	private final UserService userService;
	private final ProjectService projectService;
	

	@GetMapping("")
	public Set<CompanyDto> getAllCompanies(){
		return companyService.getAllCompanies();
	}
	@GetMapping("/{id}")
	public CompanyDto getCompany(@PathVariable Long id){
		return companyService.getCompany(id);
	}
	
	@GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@PostMapping("/{id}/users")
	public FullUserDto createUser(@PathVariable Long id, @RequestBody UserRequestDto userRequest ) {
		return userService.createUser(id, userRequest);
	}
	
	@GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
    @PostMapping("/{id}/announcements")
    public AnnouncementDto createAnnouncement(@PathVariable Long id, @RequestBody AnnouncementDto announcement){
        return companyService.createAnnouncement(id, announcement);
    }
	@GetMapping("/{id}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }

    @PostMapping("/{id}/teams")
    public TeamDto createTeam(@PathVariable Long id, @RequestBody TeamDto team){
        return companyService.createTeam(id, team);
    }
	@GetMapping("/{companyId}/teams/{teamId}/projects") 
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}
	
	@PostMapping("/{companyId}/teams/{teamId}/projects")
	public ProjectDto createProject(@RequestBody ProjectDto project, @PathVariable Long companyId,@PathVariable Long teamId) {
		return projectService.createProject(project, companyId, teamId);
	}
	
	@PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
	public ProjectDto updateProject(@RequestBody ProjectDto project, @PathVariable Long companyId,@PathVariable Long teamId, @PathVariable Long projectId) {
		return projectService.updateProject(project, companyId, teamId, projectId);
	}
	
	@DeleteMapping("/{id}/users/{userId}")
    public FullUserDto deleteUser(@RequestBody CredentialsDto cred, @PathVariable Long id, @PathVariable Long userId) {
        return userService.deleteUsers(cred ,id, userId);
    }
	
	@DeleteMapping("{id}/projects/teams/{teamId}/projects/{projectId}")
	public ProjectDto deleteProject(@RequestBody CredentialsDto cred, @PathVariable Long projectId) {
		return projectService.deleteProject(cred, projectId);
	}
	
	@DeleteMapping("{id}/announcements/{aId}")
	public AnnouncementDto deleteAnnouce(@RequestBody CredentialsDto cred, @PathVariable Long id,@PathVariable Long aId) {
		return announcementService.deleteAnnouncement(cred, id, aId);
	}
	
	@GetMapping("/users/{id}/credentials")
	public BasicUserDto proveUserCredentials(@RequestBody CredentialsDto cred,@PathVariable Long id){
		return userService.proveUserCredentials(cred, id);
	}
	
	@GetMapping("/users/{id}/authenticate")
	public boolean isAuthorized(@PathVariable Long id) {
		return userService.isAuthorized(id);
	}

}
