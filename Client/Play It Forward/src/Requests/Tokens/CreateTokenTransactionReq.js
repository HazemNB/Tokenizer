class CreateTokenTransactionReq {
    constructor() {
        this.tokenId = 0;
        this.transactionType = "";
        this.amount = 0;
        this.otherUrl = "";
        this.firstPartyId = 0;
        this.secondPartyId = 0;
    }
}

export default CreateTokenTransactionReq;