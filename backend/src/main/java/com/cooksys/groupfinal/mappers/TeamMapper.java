package com.cooksys.groupfinal.mappers;

import java.util.Set;

import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class })
public interface TeamMapper {
	
	TeamDto entityToDto(Team team);
    Team dtoToEntity(TeamDto teamDto);

  Set<TeamDto> entitiesToDtos(Set<Team> teams);
  
  Team requestDtoToEntity(TeamDto teamDto);

}