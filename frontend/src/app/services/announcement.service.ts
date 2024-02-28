import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type Announcement = {
	id: number,
	date: string,
	title: string,
	message: string,
	author: {
		profile: {
			firstName: string,
			lastName: string,
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
	apiUrl: string = "http://localhost:8080/"

	getAnnouncements(companyId: number) {
		return fetch("url" + `/company/${companyId}/announcements/`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"}
	})
			.then((response) => response.json())
			.catch(err => console.log(err))
	}

	// Need to change announcement to an announcement object type and user to a user object once we figure all that out
	createAnnouncement(companyId: number, announcement: Announcement) {
		return fetch("url" + `/company/${companyId}/announcements`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"},
				body: JSON.stringify(announcement)
			}).then((response)=> response.json())
			.catch((err) => console.log(err))
	}
}