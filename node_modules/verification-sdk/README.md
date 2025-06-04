# Verification SDK for Sunbird-RC generated credentials

## Install

This can be used to verify JSON-LD based W3C compliant Verifiable Credentials as described in the [Spec](https://www.w3.org/TR/vc-data-model/).
It uses tooling from Digital Bazaar to enable verification of credentials. This supports the following Key Types:
* RSA Verification Key 2018
* Ed25519 Verification Key 2018
* Ed25519 Verification Key 2020


```bash
npm install @sunbird-rc/verification-sdk
```

## Usage
As part of this SDK, two main functionalities exist.
* Download Revocation List from API
* Verify the JSON-LD credential with the signature suite

```javascript
import {downloadRevocationList, verifyCredential} from "@sunbird-rc/verification-sdk";

const revocationList = await downloadRevocationList(revocation_url, issuerId);

const verificationStatus = await verifyCredential(issuerDidDoc, credential, revocationList);

```