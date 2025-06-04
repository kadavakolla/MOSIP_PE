export class RevokedCredential{
    constructor({id, tags, issuer, issuanceDate}) {
        this.id = id;
        this.tags = tags;
        this.issuer = issuer
        this.issuanceDate = issuanceDate
    }
}