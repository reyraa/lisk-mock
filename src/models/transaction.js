export default (renderIndex, recipientIndex) => ({
    'transactionId': 15,
    'amount': 1000000 * (renderIndex + recipientIndex + 1),
    'type': 0,
    'height': 123 + renderIndex + recipientIndex,
    'blockId': 6258354802676166000 + renderIndex + recipientIndex,
    'timestamp': 28217090 + 1000 * (renderIndex + recipientIndex),
    'recipientId': `163137396616706346${renderIndex}L`,
    'senderId': `163137396616706346${recipientIndex}L`,
    'signature': '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a',
    'secondSignature': '5ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd10',
    'multisignatures': [
        '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a'
    ],
    'asset': {},
    'confirmations': 188 + renderIndex + recipientIndex,
});
