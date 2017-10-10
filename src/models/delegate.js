export default (i) => ({
  'username': `user${i}`,
  'address': `163137396616706346${i}L`,
  'publicKey': `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`,
  'vote': 81560729258 * i,
  'rewards': 5000000 * i,
  'producedBlocks': 2013 * i,
  'missedBlocks': 400 + i,
  'rate': 100 - i,
  'approval': 14 - (0.11 * i),
  'productivity': 96 - (0.1 * i)
});
