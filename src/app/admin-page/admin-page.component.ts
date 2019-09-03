import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../user';
import {Group} from '../group';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  currentUser: User;
  users: User[];
  groups: Group[];
  lastDeleteUser: string;
  lastEditUser: string;
  lastDeleteGroup: number;
  usersNav = 'none';
  groupsNav = 'none';
  userInfoNav = 'block';

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo() {
    this.userService.getCurrentUserInfo().then( (response) => {
      // @ts-ignore
      this.currentUser = response;

    }).catch((err) => {
      console.log(err);
    });
  }

  editUserButton(username: string) {
    this.lastEditUser = username;
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

  deleteUserButton(username: string) {
    this.lastDeleteUser = username;
  }

  deleteGroupButton(id: number) {
    this.lastDeleteGroup = id;
  }

  getAllUsers() {
    this.userService.getAllUsersWithDeleted().then( (response) => {
      // @ts-ignore
      this.setUsers(response);

    }).catch((err) => {
      console.log(err);
    });
  }

  setUsers(usersArray: User[]) {
    this.users = usersArray;
  }

  isUserDeleted(user: User): boolean {
    return user.deleted;
  }

  userGroups(user: User): string {

    let result = '';

    for (let i = 0; i < user.groupNames.length; i++) {
      if (! (i === 0)) {
        result += '\n\n';
      }
      result += 'Group Id: ' + user.groupNames[i][0] + ', Group Name: ' + user.groupNames[i][1] + '.';
    }
    return result;
  }

  addNewUser(newUser: {username: string, password: string, name: string, email: string, address: string,  phoneNumber: string,  role: string}) {
    console.log('i\'m in addnewuser');
    console.log(newUser);

    this.userService.addNewUser(newUser).then( (response) => {
      // @ts-ignore
      this.getAllUsers();

    }).catch((err) => {
      console.log(err);
      alert('A problem happened while adding new user');
    });

  }

  getAllGroups() {
    this.userService.getAllGroups().then( (response) => {
      // @ts-ignore
      this.setGroups(response);

    }).catch((err) => {
      console.log(err);
    });
  }

  setGroups(groupsArray: Group[]) {
    this.groups = groupsArray;
  }

  isGroupDeleted(group: Group): boolean {
    return group.deleted;
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

  addNewGroup(newGroup: {name: string, description: string}) {
    console.log(newGroup);

    this.userService.addnewGroup(newGroup).then( (response) => {
      // @ts-ignore
      this.getAllGroups();

    }).catch((err) => {
      console.log(err);
      alert('A problem happened while adding new group');
    });

  }

  deleteUser() {
    this.userService.deleteUser(this.lastDeleteUser).then( (response) => {
      this.getAllUsers();

    }).catch((err) => {
      console.log(err);

      this.userService.undoDeleteUser(this.lastDeleteUser).then((response2) => {
        this.getAllUsers();

      }).catch((err2) => {
        console.log(err2);
        alert('user can\'t be deleted');
    });

    });
  }

  deleteGroup() {
    this.userService.deleteGroup(this.lastDeleteGroup).then( (response) => {
      this.getAllGroups();

    }).catch((err) => {
      console.log(err);

      this.userService.undoDeleteGroup(this.lastDeleteGroup).then((response2) => {
        this.getAllGroups();

      }).catch((err2) => {
        console.log(err2);
        alert('group can\'t be deleted');
      });

    });
  }

  editUser(userInfo: {name: string, email: string, address: string, phoneNumber: string}) {

    console.log(userInfo);

    this.userService.editUser(this.lastEditUser, userInfo.name, userInfo.email, userInfo.address, userInfo.phoneNumber).then( (response) => {
       this.getAllUsers();
       this.getCurrentUserInfo();

     }).catch((err) => {
       console.log(err);
       alert('A problem happened while editing user');
     });
  }

  addUserToGroup(data: {username: string, groupId: number}) {
    this.userService.addUserToGroup(data).then( (response) => {
      this.getAllUsers();
      this.getAllGroups();
      console.log(response);

    }).catch((err) => {
      console.log(err);
      alert('User in already in this group');
    });
  }

  removeUserFromGroup(data: {username: string, groupId: number}) {
    this.userService.removeUserFromGroup(data).then( (response) => {
      this.getAllUsers();
      this.getAllGroups();
      console.log(response);

    }).catch((err) => {
      console.log(err);
      alert('User was not in this group or can\'t be removed');
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


}
