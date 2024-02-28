import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type Announcement = {
	id: number,
	date: string,
	title: string,
	message: string,
	author: {
		profile: {
			firstname: string,
			lastname: string,
			email: string,
			phone: string
		},
		isAdmin: boolean,
		active: boolean,
		status: string
	}
}

@Injectable({
	providedIn: 'root',
})

export class AnnouncementService {
	apiUrl: string = "http://localhost:4200/"

	getAnnouncements(companyId: number) {
		return fetch(this.apiUrl + `/company/${companyId}/announcements`)
			.then((response) => response.json())
			.catch(err => console.log(err))
	}

	// Need to change announcement to an announcement object type and user to a user object once we figure all that out
	createAnnouncement(companyId: number, announcement: Announcement) {
		return fetch(this.apiUrl + `/company/${companyId}/announcements`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(announcement)
			})
			.catch((err) => console.log(err))
	}
}