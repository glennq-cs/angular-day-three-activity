import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Profile } from './profile-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLogged: boolean;

  profileForm: any ;

  constructor(
    private _globalService: GlobalService,
    private service: GlobalService,
    private router: Router
  ) { }

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    password: '',
    mobile_number: '',
    job_title: ''
  }

  ngOnInit(): void {
    this._globalService.httpGetProfile();

    
    this._globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.fillForm(profile);
      }
    );

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email ]),
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      job_title: new FormControl('',[Validators.required]),
      mobile_number: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirm_password: new FormControl('',[Validators.required]),
    });

    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    );

    this.service.checkLogStatus();
  }

  fillForm(profile: any): void {
    this.profileForm.patchValue({
      first_name: profile.meta.first_name,
      last_name: profile.meta.last_name,
      email: profile.email,
      alias: profile.alias,
      job_title: profile.meta.job_title,
      mobile_number: profile.meta.mobile_number
    });
  }

  onSubmit(): void {
    if(this.profileForm.valid){
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      };

      this._globalService.httpUpdateProfile(newFormValues);
    } else {
      alert('Invalid Form!')
    }
  }

  onLogout(): void {
    this.service.deleteToken();
    this.router.navigate(['/']);
  }

}
