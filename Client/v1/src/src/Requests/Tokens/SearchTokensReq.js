class SearchTokensReq{
    constructor(){
        this.ProjectId = undefined;
        this.TemplateId = undefined;
        this.TokenTypeId = undefined;
        this.IdFrom = undefined;
        this.IdTo = undefined;
        this.NumberFrom = undefined;
        this.NumberTo = undefined;
        this.Url = undefined;
        this.CreatedAtFrom = undefined;
        this.CreatedAtTo = undefined;
        this.CurvedTextBottom = undefined;
        this.CurvedTextTop = undefined;
        this.HasImage = undefined;
        this.AltText = undefined;
        this.pagingParams = {
            pageNumber: 1,
            pageSize: 10
        }
    }
}
export default SearchTokensReq;