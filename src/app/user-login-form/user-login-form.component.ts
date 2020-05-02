import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  isformValid: boolean;
  currentUserToken: string;

  postError: boolean = false;
  postErrorMessage: string = '';

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.isformValid = form.valid;

    if (this.isformValid) {
      this.userService.loginUser(form.value.username, form.value.password).subscribe(
        result => {
          console.log("login Success ", result);
          console.log("Status Code ", result["status"]);
        },
        err => this.onHttpError(err)
      )
    } else {
      this.postErrorMessage = "Please enter the necessary Details";
    }
  }

  onHttpError(error: any) {
    console.log('error: ', error);
    this.postError = true;
    this.postErrorMessage = error["error"]["jwtToken"];
  }

}
