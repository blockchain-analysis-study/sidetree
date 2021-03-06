## JSON Web Signatures

Sidetree relies on JSON Web Signatures for authentication and integrity protection of [DID Operations](https://identity.foundation/sidetree/spec/#did-operations), accept for Create, with contains key material and is self certifying.

### Signing

In addition to [RFC7515](https://tools.ietf.org/html/rfc7515), the following additional requirements MUST be observed by Sidetree Method implementeers.

1. `kid` MAY be present in the protected header.
2. `alg` MUST be present in the protected header, its value MUST NOT be `none`.
3. No additional members may be present in the protected header.

Here is an example of a decoded JWS header:

```json
{
  "kid": "did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A",
  "alg": "EdDSA"
}
```

::: warning
  It is recommended that `kid` be a DID URL. If it is not, method implementers might need to rely on additional context to uniquely identify the correct verificationMethod. 
:::

### Verifying

Regardless of which verification relationship a verificationMethod is associated with, the process of verifying a JWS linked to a DID is the same.

The JWS header is parsed and a `kid` is extracted.

1. Iterate the verificationMethods, until a verificationMethod with `id` equal to `kid` is found.
2. Convert the discovered verificationMethod to JWK if necessary.
3. Perform [JWS Verification](https://tools.ietf.org/html/rfc7515#section-5.2) using the JWK.

#### Operation Verification

Sidetree operations are considered valid when the JWS can be verified with the correct key pair designated for the type of operation being invoked (i.e. `update`, `recover`, `deactivate`).

An [Update Operation](https://identity.foundation/sidetree/spec/#update) MUST be signed by the currently valid [Update Key Pair](#update-key-pair).

A [Recover Operation](https://identity.foundation/sidetree/spec/#recover) MUST by signed by the currently valid [Recovery Key Pair](#recovery-key-pair). 

A [Deactivate Operation](https://identity.foundation/sidetree/spec/#deactivate) MUST by signed by the currently valid [Recovery Key Pair](#recovery-key-pair).

::: warning
  Signatures on operations may be valid, but operations may be deemed invalid for other reasons (e.g. malformed delta payload).
:::

::: warning
  It is not recommended to reuse verificationMethods for multiple verification relationships.
:::
