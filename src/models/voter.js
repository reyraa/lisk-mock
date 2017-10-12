export default (i) => {
    const voters = [];
    for (let j = i + 1; j < 99; j++) {
        voters.push({
            address: `163137396616706346${j}L`,
            balance: `${j}00000000`,
        });
    }

    return ({
        address: `163137396616706346${i}L`,
        username: `genesis_${i}`,
        weight: 81560729258 * i,
        votes: 100 - i,
        voters: voters,
    });
}
