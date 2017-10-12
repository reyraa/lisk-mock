export default (senderIndex, recipientIndex, type) => {
  const fees = [10000000, 500000000, 2500000000, 100000000];
  return {
    transactionId: 15 + senderIndex * 1000 + (recipientIndex || 1) * 100 + (type || 0),
    amount: 1000000 * (senderIndex + 1),
    fee: 10000000,
    type: fees[type || 0],
    height: 123 + senderIndex,
    blockId: 6258354802676166000 + senderIndex,
    timestamp: 28217090 + 1000 * (senderIndex),
    senderId: `163137396616706346${senderIndex}L`,
    senderPublicKey: `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${senderIndex}f`,
    senderSecondPublicKey: `2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c230${senderIndex}9`,
    recipientId: senderIndex ? `163137396616706346${recipientIndex}L` : null,
    recipientPublicKey: senderIndex ? `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${recipientIndex}f` : null,
    signature: '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a',
    secondSignature: '5ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd10',
    multisignatures: [
        '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a'
    ],
    asset: {},
    confirmations: 188 + senderIndex,
  }
};
