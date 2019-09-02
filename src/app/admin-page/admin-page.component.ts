import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../user';
import {Group} from '../group';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: User[];
  groups: Group[];
  lastDeleteUser: string;
  lastEditUser: string;
  lastDeleteGroup: number;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
  }

  editUserButton(username: string) {
    this.lastEditUser = username;
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

    // this.userService.addNewUser(newUser).then( (response) => {
    //   // @ts-ignore
    //   this.getAllUsers();
    //
    // }).catch((err) => {
    //   console.log(err);
    // });

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
      });

    });
  }

  editUser(userInfo: {name: string, email: string, address: string, phoneNumber: string}) {

    console.log(userInfo);

    this.userService.editUser(this.lastEditUser, userInfo.name, userInfo.email, userInfo.address, userInfo.phoneNumber).then( (response) => {
       this.getAllUsers();

     }).catch((err) => {
       console.log(err);
     });
  }

  addUserToGroup(data: {username: string, groupId: number}){
    this.userService.addUserToGroup(data).then( (response) => {
      this.getAllUsers();
      this.getAllGroups();
      console.log(response);

    }).catch((err) => {
      console.log(err);
    });
  }

  removeUserFromGroup(data: {username: string, groupId: number}){
    this.userService.removeUserFromGroup(data).then( (response) => {
      this.getAllUsers();
      this.getAllGroups();
      console.log(response);

    }).catch((err) => {
      console.log(err);
    });
  }


}
