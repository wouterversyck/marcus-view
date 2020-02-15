import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
