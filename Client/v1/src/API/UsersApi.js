import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import EnvSettings from "./EnvSettings";
const firebaseConfig = {
    apiKey: "AIzaSyB6P3ehSMdIxeSkGPZoxkTA2x46mU8yH5E",
    authDomain: "xtokenizer.firebaseapp.com",
    projectId: "xtokenizer",
    storageBucket: "xtokenizer.appspot.com",
    messagingSenderId: "329102234428",
    appId: "1:329102234428:web:77e87ecb4c08ed90d60439",
    measurementId: "G-3XJ8VQ4RTR"
  };
const app = getApps().length>0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
var accessToken = ""

onAuthStateChanged(auth, (user) => {

    if (user) {

        accessToken = user.accessToken;
    }
});

class UsersApi {

    GetToken() {
        return accessToken;
    }
 
    baseUrl = EnvSettings.url

    CreateUserUrl = 'Users/CreateUser'
    GetCurrentUserUrl = 'Users/GetCurrentUser'
    SearchUsersUrl = 'Users/SearchUsers'
    ToggleUserDeleteUrl = 'Users/ToggleUserDelete'
    ToggleUserActivationUrl = 'Users/ToggleUserActivation'
    GetUserByIdUrl = 'Users/GetUserById'

    async CreateUser(req) {
        const res = await fetch(this.baseUrl + this.CreateUserUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        return data;
    }

    async GetCurrentUser() {
        const res = await fetch(this.baseUrl + this.GetCurrentUserUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json();
        return data;
    }

    async SearchUsers(req) {
        const res = await fetch(this.baseUrl + this.SearchUsersUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        return data;
    }

    async ToggleUserDelete(req) {
        const res = await fetch(this.baseUrl + this.ToggleUserDeleteUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        return data;
    }

    async ToggleUserActivation(req) {
        const res = await fetch(this.baseUrl + this.ToggleUserActivationUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        return data;
    }

    async GetUserById(req) {
        const res = await fetch(this.baseUrl + this.GetUserByIdUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        return data;
    }
}

export default new UsersApi;