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


class ProjectsApi {

    GetToken() {
        return accessToken;
    }

    baseUrl = EnvSettings.url

    CreateProjectUrl = 'Projects/CreateProject'
    SearchProjectsUrl = 'Projects/SearchProjects'
    ToggleProjectDeleteUrl = 'Projects/ToggleProject'
    GetProjectByIdUrl = 'Projects/GetProject'
    AddUserToProjectUrl = 'Projects/AddUserToProject'
    RemoveUserFromProjectUrl = 'Projects/RemoveUserFromProject'
    GetUserProjectsUrl = 'Projects/GetUserProjects'

    async CreateProject(req) {
        const res = await fetch(this.baseUrl + this.CreateProjectUrl, {
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

    async SearchProjects(req) {
        const res = await fetch(this.baseUrl + this.SearchProjectsUrl, {
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

    async ToggleProjectDelete(req) {
        const res = await fetch(this.baseUrl + this.ToggleProjectDeleteUrl, {
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

    async GetProjectById(req) {
        const res = await fetch(this.baseUrl + this.GetProjectByIdUrl, {
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

    async AddUserToProject(req) {
        const res = await fetch(this.baseUrl + this.AddUserToProjectUrl, {
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

    async RemoveUserFromProject(req) {
        const res = await fetch(this.baseUrl + this.RemoveUserFromProjectUrl, {
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

    async GetUserProjects(req) {
        const res = await fetch(this.baseUrl + this.GetUserProjectsUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json();
        return data;
    }
    
}
export default new ProjectsApi;
