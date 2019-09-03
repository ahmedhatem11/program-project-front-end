import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {UserUserView} from '../../UserUserView';
import {UserService} from '../services/user.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users: UserUserView[];
  groups: Group[];
  currentUser: User;
  usersNav = 'none';
  groupsNav = 'none';
  userInfoNav = 'block';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
    this.getCurrentUserInfo();
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

  setGroups(groupsArray: Group[]) {
    this.groups = groupsArray;
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

  logout() {
    localStorage.setItem('httpAuth', '');
    localStorage.setItem('loggedInUser', '');
    this.router.navigate(['']);
  }

  changePassword(body: {oldPassword: string, newPassword: string}) {
    this.userService.changePassword(body).then( (response) => {
      localStorage.setItem('httpAuth', btoa('' + localStorage.getItem('loggedInUser') + ':' + body.newPassword));
      alert('Password changed successfully');
    }).catch((err) => {
      console.log(err);
      alert('A problem happened while changing password');
    });
  }

  editUser(userInfo: {name: string, email: string, address: string, phoneNumber: string}) {

    console.log(userInfo);

    this.userService.editUser(this.currentUser.username, userInfo.name, userInfo.email, userInfo.address, userInfo.phoneNumber).then( (response) => {
      this.getAllUsers();
      this.getCurrentUserInfo();

    }).catch((err) => {
      console.log(err);
      alert('A problem happened while editing user');
    });
  }

  usersNavButton() {
    this.userInfoNav = 'none';
    this.groupsNav = 'none';
    document.getElementById('groups').style.display = this.groupsNav;
    document.getElementById('userInfo').style.display = this.userInfoNav;

    if (this.usersNav === 'block') {
      this.usersNav = 'none';
    } else {
      this.usersNav = 'block';

    }
    document.getElementById('users').style.display = this.usersNav;

  }

  groupsNavButton() {
    this.usersNav = 'none';
    this.userInfoNav = 'none';
    document.getElementById('users').style.display = this.usersNav;
    document.getElementById('userInfo').style.display = this.userInfoNav;

    if (this.groupsNav === 'block') {
      this.groupsNav = 'none';
    } else {
      this.groupsNav = 'block';

    }
    document.getElementById('groups').style.display = this.groupsNav;

  }

  userInfoNavButton() {
    this.usersNav = 'none';
    this.groupsNav = 'none';
    document.getElementById('users').style.display = this.usersNav;
    document.getElementById('groups').style.display = this.groupsNav;

    if (this.userInfoNav === 'block') {
      this.userInfoNav = 'none';
    } else {
      this.userInfoNav = 'block';

    }
    document.getElementById('userInfo').style.display = this.userInfoNav;

  }

  getCurrentUserInfo() {
    this.userService.getCurrentUserInfo().then( (response) => {
      // @ts-ignore
      this.currentUser = response;

    }).catch((err) => {
      console.log(err);
    });
  }

}
