package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final CompanyRepository companyRepository;
	private final CompanyMapper companyMapper;
	private final TeamRepository teamRepository;
	private final TeamMapper teamMapper;
	private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto createUser(Long id, UserRequestDto userRequest) {
		User user = fullUserMapper.requestDtoToEntity(userRequest);
		Credentials cred = user.getCredentials();
		if(cred == null || cred.getUsername() == null || cred.getPassword() == null) {
			throw new BadRequestException("Credentials invalid.");
		}
		
		Profile prof = user.getProfile();
		if(prof == null || prof.getFirstName() == null || prof.getLastName() == null || prof.getEmail() == null) {
			throw new BadRequestException("Profile invalid, need to include firstName, lastName, and email");
		}
		
		Set<Company> companies = new HashSet<>();
		Optional<Company> company = companyRepository.findById(id);
		if(company.isEmpty()) {
			throw new NotFoundException("This company was not found.");
		}
		user.setActive(true);
		Company comp = company.get();
		companies.add(comp);
		Set<Team> teams = new HashSet<>();
		user.setCompanies(companies);
		comp.getEmployees().add(user);
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
		
	}
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}
	
	@Override
	public FullUserDto deleteUsers(CredentialsDto cred, Long id, Long userId) {
		Credentials credent = credentialsMapper.dtoToEntity(cred);
		Optional<User> credOP = userRepository.findByCredentialsUsernameAndActiveTrue(credent.getUsername());
		
		Optional<User> tempUser = userRepository.findById(userId);
		
		if(tempUser.isEmpty()) {
			throw new NotFoundException("User with given ID not found.");
		}
		if(credOP.isEmpty()) {
			throw new BadRequestException("Username doe not match.");
		}
		
		User user = credOP.get();
		
		if(!user.getCredentials().equals(credent)) {
			throw new BadRequestException("credentials do not match.");
		}
		
		user.setActive(false);
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
		
	}
	
	
	
	

}
