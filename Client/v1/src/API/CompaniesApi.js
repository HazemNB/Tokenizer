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

class CompaniesApi{
    GetToken() {
        return accessToken;
    }
    baseUrl = EnvSettings.url

    CreateCompanyUrl = 'Companies/CreateCompany'
    EditCompanyUrl = 'Companies/EditCompany'
    GetCompanyUrl = 'Companies/GetCompany'
    DeleteCompanyUrl = 'Companies/DeleteCompany'
    SearchCompaniesUrl = 'Companies/SearchCompanies'
    CreateCompanyTypeUrl = 'Companies/CreateCompanyType';
    DeleteCompanyTypeUrl ='Companies/DeleteCompanyType'; 
    SearchCompanyTypeUrl ='Companies/SearchCompanyTypes';
    AddUserToCompanyUrl = 'Companies/AddUserToCompany';
    RemoveUserFromCompanyUrl='Companies/RemoveUserFromCompany'
    async CreateCompany(req) {
        let formData = new FormData();
        // append the data from each feild in req programmitacally in a loop

        for(let key in req){
            formData.append(key, req[key]);
        }

        const res = await fetch(this.baseUrl + this.CreateCompanyUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
            },
            body: formData
        })
        const data = await res.json();
        return data;
    }

    async EditCompany(req) {
        let formData = new FormData();
        // append the data from each feild in req programmitacally in a loop

        for(let key in req){
            formData.append(key, req[key]);
        }

        const res = await fetch(this.baseUrl + this.EditCompanyUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
            },
            body: formData
        })
        const data = await res.json();
        return data;
    }

    async GetCompany(req) { 
        const res = await fetch(this.baseUrl + this.GetCompanyUrl, {
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
    async AddUserToCompany(req) {
        const res = await fetch(this.baseUrl + this.AddUserToCompanyUrl, {
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
    async RemoveUserFromCompany(req) {
        const res = await fetch(this.baseUrl + this.RemoveUserFromCompanyUrl, {
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
    async DeleteCompany(req) {
        const res = await fetch(this.baseUrl + this.DeleteCompanyUrl, {
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

    async SearchCompanies(req) {
        const res = await fetch(this.baseUrl + this.SearchCompaniesUrl, {
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
    
    async CreateCompanyType(req) {
        const res = await fetch(this.baseUrl + this.CreateCompanyTypeUrl, {
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
    async DeleteCompanyType(req) {
        const res = await fetch(this.baseUrl + this.DeleteCompanyTypeUrl, {
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
    async SearchCompanyType(req) {
        const res = await fetch(this.baseUrl + this.SearchCompanyTypeUrl, {
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

export default new CompaniesApi;
