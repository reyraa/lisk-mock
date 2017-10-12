export default (i) => ({
  username: `genesis_${i}`,
  publicKey: `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${i}f`,
  address: `163137396616706346${i}L`,
  slot: 4368793 + (100 * i),
});
