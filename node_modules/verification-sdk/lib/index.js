import * as IssuerService from "./services/issuer.service.js";
import * as VerificationService from "./services/verification.service.js";

export const downloadRevocationList = async ( revocation_url, issuerId) => {
    return await IssuerService.fetchRevocationList(revocation_url, issuerId);
}


export const verifyCredential = async (issuerDidDoc, credential, revocationList = []) => {
    try {
        const credentialTampered = !await VerificationService.verifyCredential(issuerDidDoc, credential);
        const revokedCredential = await VerificationService.checkRevocationStatus(revocationList, credential.id)
        const checks = [{
            active: null,
            revoked: revokedCredential ? 'NOK' : 'OK',
            expired: new Date(credential.expirationDate).getTime() < Date.now() ? 'NOK' : 'OK',
            proof: !!credentialTampered ? 'NOK' : 'OK',
        },];
        return {
            status: (checks[0].revoked === "OK" && checks[0].expired === "OK" && checks[0].proof === "OK") ? "OK" : "NOK",
            checks: checks,
        };
    } catch (e) {
        console.error("Error", e);
        throw e;
    }
}