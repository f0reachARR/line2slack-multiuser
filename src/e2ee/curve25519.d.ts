declare namespace curve25519 {
    function generateKeyPair(seed: Uint8Array): { private: Uint8Array, public: Uint8Array };
    function sharedKey(privateKey: Uint8Array, publicKey: Uint8Array): Uint8Array;
}
export = curve25519;