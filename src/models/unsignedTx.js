export default (i, txId) => ({
    transactionId: txId ? txId : 15 + i * 1000,
    amount: 0,
    fee: 15000000,
    type: 4,
    timestamp: 28227090 + (100 * i),
    senderId: `163137396616706346${i}L`,
    senderPublicKey: `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`,
    senderSecondPublicKey: '2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c23079',
    recipientId: null,
    recipientPublicKey: null,
    signature: '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a',
    secondSignature: '5ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd10',
    asset: {
      multisignature: {
        min: 3,
        lifetime: 72,
        keysgroup: [
          {
            address: `163137396616706346${i + 1}L`,
            publicKey: `+c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i + 1}f`,
          },
          {
            address: `163137396616706346${i + 2}L`,
            publicKey: `+c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i + 2}f`,
          },
          {
            address: `163137396616706346${i + 3}L`,
            publicKey: `+c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i + 3}f`,
          }
        ]
      }
    },
    signatures: [
      {
        address: `163137396616706346${i + 1}L`,
        publicKey: `+c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i + 1}f`,
        signature: '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a',
        timestamp: 100000 + (100 * i)
      },
      {
        address: `163137396616706346${i + 2}L`,
        publicKey: `+c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i + 2}f`,
        signature: '2821d93a742c4edf5fd960efad41a4def7bf0fd0f7c09869aed524f6f52bf9c97a617095e2c712bd28b4279078a29509b339ac55187854006591aa759784c205',
        timestamp: 102000 + (100 * i)
      }
    ],
    propagation: {
      relays: 1,
      receivedAtUnix: 28227092 + (100 * i)
    },
    multisignatures: {
      min: 3,
      currentSignatures: 2,
      lifetime: 72,
      ready: false
    }
  });
