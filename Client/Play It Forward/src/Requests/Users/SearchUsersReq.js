class SearchUsersReq{
    constructor(){
        this.id = undefined;
        this.name = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.userType = undefined;
        this.isDeleted = undefined;
        this.isActive = undefined;
        
      this.pagingParams = {
        pageNumber: 1,
        pageSize: 10
      }
    }
}
export default SearchUsersReq;