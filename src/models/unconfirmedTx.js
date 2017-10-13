export default (i, txId) => ({
    transactionId: txId ? txId : 15 + i * 1000,
    amount: 1000000 + (100000 * i),
    fee: 1000000,
    type: 0,
    timestamp: 28227090 + (10 * i),
    senderId: `163137396616706346${i}L`,
    senderPublicKey: `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`,
    senderSecondPublicKey: null,
    recipientId: `163137396616706346${i + 1}L`,
    recipientPublicKey: `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i + 1}f`,
    signature: '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a',
    secondSignature: '5ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd10',
    asset: {},
    propagation: {
      relays: 1,
      receivedAtUnix: 28227092 + (10 * i)
    },
  });
