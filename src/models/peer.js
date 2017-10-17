export default (i) => {

  const ip = [i%10, Math.floor(i/10), Math.floor(i/100)];
  return {
    ip: `100.${ip[0]}.${ip[1]}.${ip[2]}`,
    httpPort: 8000,
    wsPort: 8000,
    version: 'v0.8.0',
    state: i%3,
    os: 'debian',
    height: 123,
    broadhash: `258974416d58533227c6a3da1b6333f0541b06c65b41e45cf31926847a3db${i}ea`,
  }
};
