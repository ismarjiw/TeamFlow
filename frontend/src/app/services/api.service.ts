import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class ApiService {
	apiUrl: string = "http://localhost:4200/"
	authenticateUser(email: string, password: string) {
		
	}
}