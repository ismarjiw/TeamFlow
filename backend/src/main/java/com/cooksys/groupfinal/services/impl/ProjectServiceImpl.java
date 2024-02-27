package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
	
	private final ProjectRepository projectRepository;
	private final ProjectMapper projectMapper;
	private final TeamRepository teamRepository;
	private final TeamMapper teamMapper;
	
	@Override
	public ProjectDto createProject(ProjectDto project, Long companyId, Long teamId) {
		Project proj = new Project();
		if(project == null || project.getName() == null || project.getDescription() == null) {
			throw new BadRequestException("name and description information invalid.");
		}
		
		Optional<Team> team = teamRepository.findById(teamId);
		
		if(team.isEmpty()) {
			throw new NotFoundException("Team not found.");
		}
		
		Team teamer = team.get();
		proj.setName(project.getName());
		proj.setDescription(project.getDescription());
		proj.setActive(true);
		proj.setTeam(teamer);
		teamer.getProjects().add(proj);
		return projectMapper.entityToDto(projectRepository.saveAndFlush(proj));
	}
	
	@Override 
	public ProjectDto updateProject(ProjectDto project, Long companyId, Long teamId, Long projectId) {
		Optional<Project> projecter = projectRepository.findById(projectId);
		if(projecter.isEmpty()) {
			throw new NotFoundException("project not found.");
		}
		
		Project p = projecter.get();
		
		if(p.isActive() == false) {
			throw new NotFoundException("project not found");
		}
		
		if(project.getName() != null) {
			p.setName(project.getName());
		}
		if(project.getDescription() != null) {
			p.setDescription(project.getDescription());
		}
		p.setActive(project.isActive());
		if(project.getTeam() != null) {
			p.setTeam(teamMapper.requestDtoToEntity(project.getTeam()));
		}
		
		return projectMapper.entityToDto(projectRepository.saveAndFlush(p));
	}

}
