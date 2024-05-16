import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  avatarList: any[] = [];

  constructor() {
    this.fetchJSONData();
  }

  fetchJSONData() {
    fetch("../../assets/avatar/avatarList.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
          this.avatarList = data;
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
  }
}
