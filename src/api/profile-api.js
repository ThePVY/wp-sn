import BaseAPI from "./base-api"

function ProfileAPI() {
    
}

ProfileAPI.prototype = new BaseAPI()

ProfileAPI.prototype.getProfileData = function(userId) {
    return this.get(`profile/${userId}`)
}

ProfileAPI.prototype.getProfileStatus = function(userId) {
    return this.get(`profile/status/${userId}`)
}

ProfileAPI.prototype.putProfileStatus = function(statusObj) {
    return this.put(`profile/status`, statusObj)
}

ProfileAPI.prototype.putProfileImage = function(image) {
    return this.putFile(`profile/photo`, image)
}

ProfileAPI.prototype.putProfileInfo = function(info) {
    return this.put(`profile`, info)
}

export const profileAPI = new ProfileAPI()
