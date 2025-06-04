import {verifyCredential/*, downloadRevocationList*/} from "verification-sdk";
import { resolveDid } from "./did-utils.js";

let revocationList = [];

const verify = async (credential) => {
    // console.log("🔍 verificationMethod:", credential?.proof?.verificationMethod);
    console.log("🔍 Verification Method in VC:", credential?.proof?.verificationMethod);
    console.log("higuys");
    let resolutionResult = await resolveDid(credential?.proof?.verificationMethod);
    console.log(resolutionResult);
    if (resolutionResult.didResolutionMetadata.error) {
        console.log("inerror");
        throw new Error(resolutionResult.didResolutionMetadata.error)
    }
    console.log("noerror");
    let issuerDID = resolutionResult.didDocument;/*
    let revocationUrl = "http://localhost:3000/credentials/revocation-list";*/
    revocationList = /*await downloadRevocationList(issuerDID.id, revocationUrl)*/[];
    return  await verifyCredential(issuerDID, credential, revocationList);
}

export {verify};