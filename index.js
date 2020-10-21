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
  // async function eventHandler(event) {
  //   // fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle
  //   const resp = await fetch(event.request)
  //   return resp
  // }

  const response = await fetch('https://static-links-page.signalnerve.workers.dev');
  return response

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

