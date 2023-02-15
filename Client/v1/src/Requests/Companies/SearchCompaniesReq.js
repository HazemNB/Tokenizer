class SearchCompaniesReq {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.description = undefined;
        this.address = undefined;
        this.city = undefined;
        this.zip = undefined;
        this.country = undefined;
        this.phone = undefined;
        this.email = undefined;
        this.website = undefined;
        this.companyTypeId = undefined;
        this.pagingParams = {
            pageNumber: 1,
            pageSize: 10
        }
    }
}
export default SearchCompaniesReq;