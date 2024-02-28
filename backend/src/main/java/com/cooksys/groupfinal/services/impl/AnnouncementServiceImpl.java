package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;
	private final UserRepository userRepository;
	private final BasicUserMapper userMapper;
	
	public AnnouncementDto deleteAnnouncement(CredentialsDto cred, Long id, Long aId) {
		
		User user = verifyCredentials(cred);
		
		if(!user.isAdmin()) {
			throw new NotAuthorizedException("This user is not authorized.");
		}
		
		Optional<Announcement> announce = announcementRepository.findById(aId);
		
		if(announce.isEmpty()) {
			throw new NotFoundException("Announcement with id " + aId + " was not found.");
		}
		
		Announcement announcer = announce.get();
		announcementRepository.deleteById(aId);
		announcementRepository.flush();
		return announcementMapper.entityToDto(announcer);
		
	}
	
	private User verifyCredentials(CredentialsDto cred) {
		Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(cred.getUsername());
		if(user.isEmpty()) {
			throw new BadRequestException("User with these credentials not found.");
		}
		
		User finaluser = user.get();
		
		if(!finaluser.getCredentials().equals(cred)) {
			throw new BadRequestException("Password does not match.");
		}
		
		return finaluser;
		
	}
	
}