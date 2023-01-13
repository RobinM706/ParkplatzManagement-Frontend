import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { convertToObject } from 'typescript';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

@Injectable()

export class DataServiceService {

  youtuberpreview: any;
  youtuber: any;
  userprofil:any;
  isProfilVisible = false;
  isSendNameVisible = false;
  isSearchVisible = false;


  constructor(private http: HttpClient, private router: Router) { }

  

  async searchYoutuber(name: string) {

      var apiURL = "https://maalti.herokuapp.com/api/v1.0/searchlistname?name=" + name
      const response = await fetch(apiURL)
      this.youtuberpreview = await response.json()

      //const response = await fetch("assets/searchlistname.json");
      //this.youtuberpreview = await response.json()



      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['Search']));

  }

  async getYTProfil(id: string, order:String) {

      //const response = await fetch("assets/channellistid.json");
      //this.youtuber = await response.json()



      var apiURL= "https://maalti.herokuapp.com/api/v1.0/channellistid?id=" + id +"&order=" +order;
      console.log(apiURL)
      const rawResponse = await fetch(apiURL);

      this.youtuber = await rawResponse.json();
      console.log(this.youtuber)


      this.router.navigate(['YTProfil']);

  }

  async registerUser(email: string, password: string) {
      var apiURL = "https://maalti.herokuapp.com/api/v1.0/register"
      const rawResponse = await fetch(apiURL, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
      });
      const content = await rawResponse.json();
      if (content == true) {
          alert("Glückwunsch! Dein Maalti Account wurde erstellt!")
      } else {
          alert("Du bist bereits Registriert. Die Registrierung konnte nicht abgschlossen werden.")
      }

  }

  async loginUser(email: string, password: string) {

      var apiURL = "https://maalti.herokuapp.com/api/v1.0/login"
      const rawResponse = await fetch(apiURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
      });

      var cookie = await rawResponse.text();

      if (cookie == "") {
          alert("Email oder Passwort sind falsch!")
          return;
      }

      document.cookie = email + "=" + cookie;
      this.isProfilVisible = true;
      alert("Sie sind eingeloggt")
     
      this.router.navigate(['']);


  }

  async logoutUser(cookie: string) {

      const email = document.cookie.substring(0,document.cookie.indexOf("="))
      
      document.cookie = email + "=" + " " + "; expires = Thu, 01 Jan 1970 00:00:00 GMT"

      var apiURL = "https://maalti.herokuapp.com/api/v1.0/logout?cookie=" + cookie;
      const rawResponse = await fetch(apiURL);

      var response = await rawResponse.status;

      if (response == 200) {
          alert("Du wurdest Ausgeloggt")
          this.router.navigate(['']);
      } else {
          alert("Fehler, bitte Admin kontaktieren!")
          this.router.navigate(['']);
      }

  }

  async pwforgotten(email: string) {

      var apiURL = "https://maalti.herokuapp.com/api/v1.0/user/pwforgotten?email=" + email;
      const rawResponse = await fetch(apiURL);

      var response = await rawResponse.json();

      if (response == true) {
          alert("Deine Passwort wird zurückgesetzt. Wir melden uns bei dir.")

      } else {
          alert("Email wurde nicht gefunden. Überprüfe deine Angaben erneut.")
      }

  }


  async favoriteCreator(creatorid: string, cookie: string, name: string, profilbild: string) {
      var apiURL = "https://maalti.herokuapp.com/api/v1.0/addfavor"

      if (cookie == "") {
          alert("Bitte melde dich zuerst an!")
          return
      }

      cookie = cookie.substring(cookie.indexOf("=") + 1)
      
      const rawResponse = await fetch(apiURL, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ creator_id: creatorid, cookie: cookie, name: name, profilbild: profilbild })
      });
      const content = await rawResponse.status;
      if (content == 200) {
          alert("Creator wurde ihrer Favoritenliste hinzugefügt!")
      } else {
          alert("Oops, hier lief etwas schief! Probieren Sie es doch später erneut.")
      }

  }

  async deleteFavorit(creatorid: string) {
      
      const cookie = document.cookie.substring(document.cookie.indexOf("=") + 1)


      var apiURL = "https://maalti.herokuapp.com/api/v1.0/delfavor?cookie=" + cookie + "&creator_id=" + creatorid;
      const rawResponse = await fetch(apiURL);

      var response = await rawResponse.json();
      
      this.getUserProfil(cookie);

  }



  async getUserProfil(cookie: string) {
      
      if(cookie == " "){
          alert("Bitte melden Sie sich zuerst an !")
          return
      }

      var apiURL = "https://maalti.herokuapp.com/api/v1.0/user/profil?cookie=" + cookie;
      const rawResponse = await fetch(apiURL);

      var response = await rawResponse.json();
      
      this.userprofil = response
      
      this.router.navigate(['Profil']);
      

  }
}
