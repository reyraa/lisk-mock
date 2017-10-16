export default (options) => {
  let pk;
  let blockId;
  if (typeof options.blockId === 'string') {
    options.i = options.blockId[options.blockId.length - 1];
    blockId = options.blockId;
    pk = `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${options.i}f`;
  } else if (typeof publicKey === 'string') {
    options.i = options.publicKey[options.publicKey.length - 2];
    pk = `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${options.i}f`;
    blockId = 6258354802676166000 + (1000 * options.i)
  } else {
    pk = `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${options.i}f`;
    blockId = 6258354802676166000 + (1000 * options.i)
  }

  
  return {
    blockId: blockId,
    height: options.height ? options.height :  10815 + options.i,
    timestamp: 28227090 + (10 * options.i),
    generatorAddress: `163137396616706346${options.i}L`,
    generatorPublicKey: pk,
    payloadLength: 117,
    payloadHash: `4e4d91be041e09a2e54bb7dd38f1f2a02ee7432ec9f169ba63cd1f193a733dd${options.i}`,
    blockSignature: `a3733254aad600fa787d6223002278c3400be5e8ed4763ae27f9a15b80e20c22ac9259dc926f4f4cabdf0e4f8cec49308fa8296d71c288f56b9d1e11dfe81e0${options.i}`,
    confirmations: 200 + options.i,
    previousBlockId: 6258354802676166000 + (1000 * options.i) - 1,
    forged: {
      numberOfTransactions: 15,
      totalAmount: 150000000,
      totalFee: 15000000,
      reward: 50000000,
      totalForged: 65000000
    }
  }
};
