package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final CompanyMapper companyMapper;
	private final TeamRepository teamRepository;
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	private final BasicUserMapper basicUserMapper;
	private final UserRepository userRepository;
	private final AnnouncementRepository announcementRepository;

	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	public CompanyDto getCompany(Long id) {
		return companyMapper.entityToDto(findCompany(id));
	}
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }

	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
//		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}
	
	@Override
	public Set<CompanyDto> getAllCompanies(){
		Set<Company> companies = new HashSet<>();
		companies.addAll(companyRepository.findAll());
		return companyMapper.entitiesToDtos(companies);
	}

	@Override
	public TeamDto createTeam(Long id, TeamDto teamDto) {
		Set<User> teammates=new HashSet<>();
		for (BasicUserDto user : teamDto.getTeammates()){
			Optional<User> optionalUser = userRepository.findById(user.getId());
			if (optionalUser.isPresent()) {
				User teammate= optionalUser.get();
				teammates.add(teammate);
			}
		}

		Team team = teamMapper.dtoToEntity(teamDto);
		team.setTeammates(teammates);

		Company company = findCompany(id);
		team.setCompany(company);
		team=teamRepository.save(team);
		return teamMapper.entityToDto(team);
	}

	@Override
	public AnnouncementDto createAnnouncement(Long id, AnnouncementDto announcementDto) {
		Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
		Optional<User> optionaluser=userRepository.findById(announcement.getAuthor().getId());
		if (optionaluser.isPresent()){
			User user = optionaluser.get();
			announcement.setAuthor(user);
		}
		Company company = findCompany(id);
		announcement.setCompany(company);
		announcement=announcementRepository.save(announcement);
		return announcementMapper.entityToDto(announcement);
	}

}
