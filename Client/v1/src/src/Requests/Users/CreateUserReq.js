class CreateUserReq {
    constructor(name, email, phone, userType, password) {
        this.name = name ? name : undefined;
        this.email = email ? email : undefined;
        this.phone = phone ? phone : undefined;
        this.userType = userType ? userType : undefined;
        this.password = password ? password : undefined;
    }
}

export default CreateUserReq;