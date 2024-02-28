import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class LoginService {
	apiUrl: string = "http://localhost:4200/"
	authenticate(email: string, password: string) {
		return fetch(this.apiUrl + "/login")
		.then((response) => response.json())
		.catch((err) => console.log(err))
	}
}