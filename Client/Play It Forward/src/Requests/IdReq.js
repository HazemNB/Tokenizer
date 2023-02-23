class IdReq{
    constructor(id){
        this.id = id;
        this.Name = "";
        this.pagingParams = {
            pageNumber: 1,
            pageSize: 10,
        }
    }
}

export default IdReq;

 