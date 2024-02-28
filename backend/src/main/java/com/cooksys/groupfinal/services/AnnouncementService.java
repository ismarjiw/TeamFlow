package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;

public interface AnnouncementService {

	AnnouncementDto deleteAnnouncement(CredentialsDto cred, Long id, Long aId);

}
