import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Group} from '../group';
import {UserUserView} from '../../UserUserView';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users: UserUserView[];
  groups: Group[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
  }

  getAllUsers() {
    this.userService.getAllUsersUser().then( (response) => {
      // @ts-ignore
      this.setUsers(response);

    }).catch((err) => {
      console.log(err);
    });
  }

  setUsers(usersArray: UserUserView[]) {
    this.users = usersArray;
  }

  userUserGroups(user: UserUserView) {
    let result = '';

    for (let i = 0; i < user.groupNames.length; i++) {
      if (! (i === 0)) {
        result += '\n\n';
      }
      result += 'Group Id: ' + user.groupNames[i][0] + ', Group Name: ' + user.groupNames[i][1] + '.';
    }
    return result;
  }

  groupUsers(group: Group): string {

    let result = '';

    for (let i = 0; i < group.users.length; i++) {
      if (! (i === 0)) {
        result += '\n\n';
      }

      // @ts-ignore
      result += 'username: ' + group.users[i].username + '.';
    }
    return result;
  }

  getAllGroups() {
    this.userService.getAllGroupsUser().then( (response) => {
      // @ts-ignore
      this.setGroups(response);

    }).catch((err) => {
      console.log(err);
    });
  }

}
