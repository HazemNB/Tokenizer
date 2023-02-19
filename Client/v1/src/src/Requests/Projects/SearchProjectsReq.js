class SearchProjectsReq{
    constructor(){
        this.id = undefined;
        this.name = undefined;
        this.pagingParams = {
            pageNumber: 1,
            pageSize: 10
        }
    }
}
export default SearchProjectsReq;