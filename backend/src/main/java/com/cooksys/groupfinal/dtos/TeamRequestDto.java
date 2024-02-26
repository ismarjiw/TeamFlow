package com.cooksys.groupfinal.dtos;

import com.cooksys.groupfinal.entities.User;

import java.util.Set;

public class TeamRequestDto {
    private Long id;

    private String name;

    private String description;

    private Set<BasicUserDto> teammates;
}
