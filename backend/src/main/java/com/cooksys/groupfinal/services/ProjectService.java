package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

	ProjectDto createProject(ProjectDto project, Long companyId, Long teamId);

	ProjectDto updateProject(ProjectDto project, Long companyId, Long teamId, Long projectId);
	
	ProjectDto deleteProject(CredentialsDto cred, Long id);

}
