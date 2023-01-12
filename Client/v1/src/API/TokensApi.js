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


class TokensApi {

    GetToken() {
        return accessToken;
    }
    baseUrl = EnvSettings.url

    CreateTokenTypeUrl = 'Tokens/CreateTokenType'
    EditTokenTypeUrl = 'Tokens/EditTokenType'
    GetTokenTypesUrl = 'Tokens/GetTokenTypes'
    DeleteTokenTypeUrl = 'Tokens/DeleteTokenType'    
    async CreateTokenType(req) {
        const res = await fetch(this.baseUrl + this.CreateTokenTypeUrl, {
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

    async EditTokenType(req) {
        const res = await fetch(this.baseUrl + this.EditTokenTypeUrl, {
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

    async GetTokenTypes(req) {
        const res = await fetch(this.baseUrl + this.GetTokenTypesUrl, {
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

    async DeleteTokenType(req) {
        const res = await fetch(this.baseUrl + this.DeleteTokenTypeUrl, {
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

    // Templates

    CreateTemplateUrl = 'Tokens/CreateTemplate'
    EditTemplateUrl = 'Tokens/EditTemplate'
    UpdateTemplateImageUrl = 'Tokens/UpdateTemplateImage'
    DeleteTemplateUrl = 'Tokens/DeleteTemplate'

    async CreateTemplate(req) {
        let formData = new FormData();
        // append the data from each feild in req programmitacally in a loop

        for(let key in req){
            formData.append(key, req[key]);
        }

        const res = await fetch(this.baseUrl + this.CreateTemplateUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
            },
            body: formData
        })
        const data = await res.json();
        return data;
    }

    async EditTemplate(req) {
        let formData = new FormData();
        // append the data from each feild in req programmitacally in a loop

        for(let key in req){
            formData.append(key, req[key]);
        }

        const res = await fetch(this.baseUrl + this.EditTemplateUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.GetToken()}`,
            },
            body: formData
        })
        const data = await res.json();
        return data;
    }

    async DeleteTemplate(req) {
        const res = await fetch(this.baseUrl + this.DeleteTemplateUrl, {
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
    


    //Tokens

    CreateTokensUrl = 'Tokens/CreateTokens'
    GetTokenByIdUrl = 'Tokens/GetToken'
    SearchTokensUrl = 'Tokens/SearchTokens'
    UpdateAllTemplateTokensUrl = 'Tokens/UpdateAllTemplateTokens'
    EditTokenBatchUrl = 'Tokens/EditTokenBatch'
    DeleteTokenBatchUrl = 'Tokens/DeleteTokenBatch'
    GetBatchTokensUrl = 'Tokens/GetBatchTokens'
    async CreateTokens(req) {
        const res = await fetch(this.baseUrl + this.CreateTokensUrl, {
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

    async GetTokenById(req) {
        const res = await fetch(this.baseUrl + this.GetTokenByIdUrl, {
            method: 'POST',
            headers: {
                // Authorization: `Bearer ${this.GetToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        return data;
    }


    async SearchTokens(req) {
        const res = await fetch(this.baseUrl + this.SearchTokensUrl, {
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

    async UpdateAllTemplateTokens(req) {
        const res = await fetch(this.baseUrl + this.UpdateAllTemplateTokensUrl, {
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

    async EditTokenBatch(req) {
        const res = await fetch(this.baseUrl + this.EditTokenBatchUrl, {
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

    async DeleteTokenBatch(req) {
        const res = await fetch(this.baseUrl + this.DeleteTokenBatchUrl, {
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

    async GetBatchTokens(req) {
        const res = await fetch(this.baseUrl + this.GetBatchTokensUrl, {
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

    //Scans

    CreateScanUrl = 'Tokens/CreateScan'
    GetBatchScansUrl = 'Tokens/GetBatchScans'

    async CreateScan(req) {
        const res = await fetch(this.baseUrl + this.CreateScanUrl, {
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

    async GetBatchScans(req) {
        const res = await fetch(this.baseUrl + this.GetBatchScansUrl, {
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

export default new TokensApi;
