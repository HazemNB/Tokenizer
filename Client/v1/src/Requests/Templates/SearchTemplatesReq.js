class SearchTemplatesReq{
    constructor(){
        this.Id = "";
        this.Name = undefined;//
        this.Description = undefined;//
        this.Amount = undefined;//
        this.Approved = undefined;
        this.QrCodeColor = undefined;
        this.QrCodeBackgroundColor = undefined;
        this.BackgroundColor = undefined;
        this.TextColor = undefined;
        this.CurvedTextTop = undefined;
        this.CurvedTextBottom = undefined;
        this.CurvedTextTopOffset = undefined;
        this.CurvedTextBottomOffset = undefined;
        this.TokenTypeId = null;
        this.TokenTypeOffset = undefined;
        this.QrCodeUrl = undefined;
        this.UseImage = undefined;
        this.AltText = undefined;
        this.Image = undefined;
        this.ProjectId = undefined;//
        this.CompanyId = undefined;//
        this.pagingParams = {
            pageNumber: 1,
            pageSize: 10
          }

    }
}
export default SearchTemplatesReq;