import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class LoginService {
	apiUrl: string = "http://localhost:8080/"
	authenticate(email: string, password: string) {
		return fetch("url/users/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: email, password: password })
			})
			.then((response) => response.json())
			.catch((err) => console.log(err))
	}
}
