export default (i) => ({
  'address': `163137396616706346${i}L`,
  'balance': `${i}00000000`,
  'unconfirmedBalance': 0,
  'publicKey': `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`,
  'secondPublicKey': null,
  'delegate': {
    'username': `user${i}`,
    'vote': 81560729258 * i,
    'rewards': 5000000 * i,
    'producedBlocks': 2013 * i,
    'missedBlocks': 400 + i,
    'rate': 100 - i,
    'approval': 14 - (0.11 * i),
    'productivity': 96 - (0.1 * i)
  },
  'multisignatureMaster': {
    'min': 2,
    'lifetime': 72,
    'signers': [
      {
        'address': '6251001604903637008L',
        'publicKey': '2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c23079'
      },
      {
        'address': '12668885769632475474L',
        'publicKey': 'a4465fd76c16fcc458448076372abf1912cc5b150663a64dffefe550f96feadd'
      },
      {
        'address': '12668123452434343274L',
        'publicKey': 'a233323232235677777754465fd76c16fcc434222663a64dffefe550f96feadd'
      }
    ]
  },
  'multisignatureMember': [
    {
      'min': 2,
      'lifetime': 72,
      'masterAddress': '6251001604903637008L',
      'masterPublicKey': '2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c23079'
    }
  ]
});
