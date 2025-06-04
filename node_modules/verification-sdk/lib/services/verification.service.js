import {DOCUMENTS} from "../constants/documents.js";
import jsonld from "jsonld";
import {Ed25519VerificationKey2020} from "@digitalbazaar/ed25519-verification-key-2020";
import {Ed25519VerificationKey2018} from "@digitalbazaar/ed25519-verification-key-2018";
import {Ed25519Signature2018} from "@digitalbazaar/ed25519-signature-2018";
import {LDKeyPair as RSAKeyPair} from "crypto-ld";
import {Ed25519Signature2020} from "@digitalbazaar/ed25519-signature-2020";
import * as vc from "@digitalbazaar/vc";

import pkg from "jsonld-signatures/lib/documentLoader.js";
const {extendContextLoader} = pkg;
const getDocumentLoader = (didDoc) => {
    return extendContextLoader(async url => {
        if (url === didDoc?.id) {
            return {
                contextUrl: null, documentUrl: url, document: didDoc
            };
        }
        if (DOCUMENTS[url]) {
            return {
                contextUrl: null, documentUrl: url, document: DOCUMENTS[url]
            }
        }
        if (typeof window !== 'undefined' &&
        !(typeof process !== 'undefined' && process.versions && process.versions.node)) {
            // Running in a browser environment
            return jsonld.documentLoaders.xhr()(url);
        } else {
            // Running in a Node.js environment
            return jsonld.documentLoaders.node()(url);
        }

    });
}


const getSuite = async (verificationMethod, signatureType) => {
    const supportedSignatures = {
        "Ed25519Signature2020": ["Ed25519VerificationKey2020", "JsonWebKey2020", "Ed25519VerificationKey2018"],
        "Ed25519Signature2018": ["Ed25519VerificationKey2018"],
        "RsaSignature2018": ["RsaVerificationKey2018"],
    };
    if (!(signatureType in supportedSignatures)) {
        console.error("Suite for signature type not found")
        throw new Error("Suite for signature type not found");
    }
    if (!supportedSignatures[signatureType].includes(verificationMethod?.type)) {
        console.error("Suite for verification type not found");
        throw new Error("Suite for verification type not found");
    }
    if (verificationMethod?.type == "Ed25519VerificationKey2018") {
        let keyPair = await Ed25519VerificationKey2018.from(verificationMethod)
        return new Ed25519Signature2018({key: keyPair})
    } else if (verificationMethod?.type == "RsaVerificationKey2018") {
        let keyPair = await RSAKeyPair.from(verificationMethod)
        return jsigs2.suites.RsaSignature2018({key: keyPair})
    } else {
        let keyPair = await Ed25519VerificationKey2020.from(verificationMethod)
        return new Ed25519Signature2020({key: keyPair})
    }
}


export const checkRevocationStatus = async (revocationList, credentialId) => {
    const foundInList = revocationList.find((revokedCredential, index, obj) => revokedCredential.id === credentialId)
    return foundInList
}


export const verifyCredential = async (issuerDidDoc, credential) => {
    try {
        const verificationMethod = issuerDidDoc?.verificationMethod[0]
        const suite = await getSuite(verificationMethod, credential?.proof?.type);
        // const AssertionProofPurpose = jsigs.purposes.AssertionProofPurpose;
        // const results = await signatures.verify(credential, {
        //     purpose: new AssertionProofPurpose(),
        //     suite: [suite],
        //     documentLoader: getDocumentLoader(issuerDid),
        //     compactProof: false
        // });
        const results = await vc.verifyCredential({
            credential: credential,
            suite: suite,
            documentLoader: getDocumentLoader(issuerDidDoc)
        })
        console.log(results);
        return !!results?.verified;
    } catch (e) {
        console.error(e)
        return false;
    }

}





