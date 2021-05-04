import BaseAPI from "./base-api"

function UsersAPI() {
    
}

UsersAPI.prototype = new BaseAPI()

UsersAPI.prototype.getUsers = function(p) {
    return this.get(`users?page=${p}`)
}

UsersAPI.prototype.followRequest = function(userId, followed) {
    return followed ?
        this.delete(`follow/${userId}`)
        :
        this.post(`follow/${userId}`)
}

export const usersAPI = new UsersAPI()
