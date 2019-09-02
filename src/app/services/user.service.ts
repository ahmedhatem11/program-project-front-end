import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../user';
import {Group} from '../group';
import {UserData} from '../userData';
import {AddUserGroup} from '../AddUserGroup';
import {UserUserView} from '../../UserUserView';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsersWithDeleted() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/getalluserswithdeleted';
      this.http.get<User[]>(apiURL, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  getAllUsersUser() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/getallusers';
      this.http.get<UserUserView[]>(apiURL, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  login(credentials: {username: string, password: string }) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/login';
      this.http.post<User>(apiURL, credentials, httpOptions)
        .toPromise()
        .then(
          res => {
            localStorage.setItem('httpAuth', btoa('' + credentials.username + ':' + credentials.password));
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  addNewUser(newUser: {username: string, password: string, name: string, email: string, address: string,  phoneNumber: string,  role: string}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/addnewuser';
      this.http.post(apiURL, newUser, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }

  getAllGroups() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/group/getallgroupsWithDeleted';
      this.http.get<Group[]>(apiURL, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  getAllGroupsUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/group/getallgroups';
      this.http.get<Group[]>(apiURL, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  addnewGroup(newGroup: {name: string, description: string}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/group/addnewgroup';
      this.http.post(apiURL, newGroup, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }

  deleteUser(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/deleteuser/' + username;
      this.http.delete(apiURL, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }

  undoDeleteUser(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/undodeleteuser/';
      const user: User = {
        username
      };

      this.http.put(apiURL, user, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }

  deleteGroup(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/group/deletegroup/' + id;
      this.http.delete(apiURL, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }

  undoDeleteGroup(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/group/undodeletegroup/';
      const group: Group = {
        id
      };

      this.http.put(apiURL, group, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }



  editUser(username: string, name: string, email: string, address: string, phoneNumber: string) {

    let userData: UserData = {
      username
    };


    if (!(name === '')) {
      userData.name = name;
    }

    if (!(email === '')) {
      userData.email = email;
    }

    if (!(address === '')) {
      userData.address = address;
    }

    if (!(phoneNumber === '')) {
      userData.phoneNumber = phoneNumber;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/updateuserinfo';
      this.http.put(apiURL, userData, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;

  }

  addUserToGroup(data: {username: string, groupId: number}){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };

    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/addusertogroup/';

      this.http.put(apiURL, data, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  removeUserFromGroup(data: {username: string, groupId: number}){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic ' + localStorage.getItem('httpAuth')
      })
    };


    let promise = new Promise((resolve, reject) => {
      const apiURL = '/api/user/removeuserfromgroup/';

      this.http.put(apiURL, data, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

}
