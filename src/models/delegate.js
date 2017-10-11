export default (option, q) => {
  let i;
  let publicKey;
  if (typeof option === 'string') {
    i = parseInt(option.replace('L')[option.length - 2]);
    publicKey = option;
  } else {
    i = option;
    publicKey = `163137396616706346${i}L`;
  }
  return ({
    'username': (q && q.length > 0) ? `${q}${i}` : `genesis_${i}`,
    'address': publicKey,
    'publicKey': `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`,
    'vote': 81560729258 * (101 - i),
    'rewards': 5000000 * (101 - i),
    'producedBlocks': 2013 * (101 - i),
    'missedBlocks': 400 + i,
    'rate': i + 1,
    'approval': 14 + (0.11 * i),
    'productivity': 99 - (0.1 * i)
  });
};
