import fetch from 'node-fetch';

const urlList = [
  'https://www.instagram.com/p/BlqPRuNhGO8/?__a=1',
  'https://www.instagram.com/p/BWVxYFxhcIZ/?__a=1',
  'https://www.instagram.com/p/Bjz_idfnru4/?__a=1',
];

const requestApi = urlList =>
  Promise.all(urlList.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(res => res.map(elem => elem.graphql.shortcode_media.location.name));

(async urlList => {
  const data = await requestApi(urlList);

  // const body = document.body;
  // body.append(data);
  console.log('data', data);
  return data;
})(urlList);
