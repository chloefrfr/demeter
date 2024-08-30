const versions: Map<string, number> = new Map([
  ["2ebfc206cef496ff0fe9794bfbc1c89f02e09f7a3c2db89434fad05b32af53f6", 1.8],
  ["3d644e74777d32fc0a079fcfb809f9e81adf17c919c6ca2a3d0f45d69429a7bb", 1.11],
  ["6139adc8d218b99b67ce2ccb58308e88336004c141686f8752bd9f1ad20255b3", 4.1],
  ["0d283d6602579765d29d2b5e82eb142fe212e50eeb3586b0590240cea448d172", 4.5],
  ["a48576182f8e2e7fe480f5e85bb566f8f51b5e8a773971968220f480e7b5b6bd", 6.1],
  ["2cfd57c0c0e73d9f527170667f0cdba0b8d7d7255df04b02001821528ed9c352", 6.21],
  ["15da21fff1444a2390e345b96bb6bfb095ac655bfe888b89c32cb6d292699a8d", 7.4],
  ["bcc36918787ae7fcd2fbb41f5352b9a9cb1f5fe8711a14c95be6a93410815869", 8.51],
  ["bc39a525a9a886c3bcee4845c70449f53a20d8e69fd4fdce3830c76f215c13bb", 9.1],
  ["8dbca1d00855e48aa5d70ff12272fb4eaebfda915cb18a8d0ac056bdadd24f33", 9.41],
  ["ed64cef972c9ba785f3c7e8b247d2936a4aa67238175070282d24c2abb6d131c", 10.4],
]);

export const getVersionByHash = (hash: string) => {
  const version = versions.get(hash);

  if (!version) return null;

  return version;
};
