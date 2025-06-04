import {getResolver} from 'web-did-resolver';
import {Resolver} from 'did-resolver';
// import {SUPPORTED_DID_METHODS} from "./config";
const SUPPORTED_DID_METHODS = ["web"];
const getDIDMethod = (did: string) => {
    const regex = /^did:([^:]+):/;
    const match = did?.match(regex);
    console.log("🧪 Resolving DID for:", did);
    return match ? match[1] : "";
}

export const resolveDid = async (did: string)  => {
    const didMethod = getDIDMethod(did);
    if (SUPPORTED_DID_METHODS.indexOf(didMethod) === -1)
        throw new Error(`Unsupported DID method: ${didMethod}. DID: ${did}`);
    const webResolver = getResolver();
    let didResolver = new Resolver({
        ...webResolver
    });
    return await didResolver.resolve(did);
}