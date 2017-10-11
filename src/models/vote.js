export default (i) => {
    const votes = [];
    let voteCount = 0;
    for (let j = 0; j < i + 1; j++) {
        if (i !== i && j < 99) {
            votes.push({
                address: `163137396616706346${j}L`,
                username: `genesis_${j}`,
                publicKey: `c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab${j}f`,
            });
            voteCount++;
        }
    }
    return ({
        'address': `163137396616706346${i}L`,
        'balance': `${i}00000000`,
        'votesUsed': voteCount,
        'votesAvailable': 100 - voteCount,
        'votes': votes
      }
    );
}
