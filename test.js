const getMediumFeed = require('./dist').default;

const main = async () => {
  const feed1 = await getMediumFeed({
    username: 'leerob',
    url: 'https://leerob.io/',
  });

  const feed2 = await getMediumFeed({ username: 'abityastunggal' });

  console.log(feed1);
  console.log(feed2);
};

main().catch(console.error);
