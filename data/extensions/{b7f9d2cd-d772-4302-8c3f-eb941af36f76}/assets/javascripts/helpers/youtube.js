const targets = [
  "m.youtube.com",
  "youtube.com",
  "img.youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "youtu.be",
  "s.ytimg.com",
  "music.youtube.com",
];
/*
    Please remember to also update the manifest.json file
    (content_scripts > matches, 'persist-invidious-prefs.js')
    when updating this list:
  */
const redirects = [
  "https://yewtu.be",
  "https://invidio.xamh.de",
  "https://invidious.namazso.eu",
  "https://invidious.sethforprivacy.com",
  "https://invidious.slipfox.xyz",
  "https://invidious.weblibre.org",
  "https://invidious.snopyta.org",
  "https://invidious.nerdvpn.de",
  "https://y.com.sb",
  "https://inv.bp.projectsegfau.lt",
  "http://fz253lmuao3strwbfbmx46yu7acac2jz27iwtorgmbqlkurlclmancad.onion",
  "http://qklhadlycap4cnod.onion",
  "http://c7hqkpkpemu6e7emz5b4vyz7idjgdvgaaa3dyimmeojqbgpea3xqjoid.onion",
  "http://w6ijuptxiku4xpnnaetxvnkc5vqcdu7mgns2u77qefoixi63vbvnpnqd.onion",
];

export default {
  targets,
  redirects,
};
