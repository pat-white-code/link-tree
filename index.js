// const json = require('./links.json');
// import json from './links.json';
const data = {
  "data": [
    { "name": "Radio Coffee and Beer", "url": "https://www.radiocoffeeandbeer.com/" },
    { "name": "SummerMoon Coffee", "url": "https://https://www.patikacoffee.com/" },
    { "name": "Brew & Brew", "url": "https://www.thebrewandbrew.com/" }
  ]
}

const json = JSON.stringify(data, null, 2)
const links = /.*links/

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if(request.url.match(links)) {
    return new Response(json, {
      headers: {'Content-Type': 'application/json'}
    })
  }
  console.log(request.url);
  console.log(json);
  // return new Response(json, {
  //   headers: {'Content-Type': 'application/json'}
  // })

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

