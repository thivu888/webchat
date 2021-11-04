export default class User {
    constructor(data){  
        this._id = data._id || null  
        this.username = data.username || null
        this.email = data.email || null
        this.avatar = data.avatar || null
        this.coverPhoto = data.coverPhoto || null
        this.isOnline = data.isOnline || null
        this.gender = data.gender || null
        this.role = data.role || null
        this.languages = data.languages || null
        this.verify = data.verify || false
        this.available = data.available || false
        this.phone = data.phone || null
        this.lastName = data.lastName || null
        this.firstName = data.firstName || null
    }
}