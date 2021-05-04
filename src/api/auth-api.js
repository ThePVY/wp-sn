import BaseAPI from "./base-api"

function AuthAPI() {
    
}

AuthAPI.prototype = new BaseAPI()

AuthAPI.prototype.getAuthData = function() {
    return this.get(`auth/me`)
}

AuthAPI.prototype.signIn = function(jsonObj) {
    return this.post('auth/login', jsonObj)
}

AuthAPI.prototype.signOut = function() {
    return this.delete('auth/login')
}

export const authAPI = new AuthAPI()
