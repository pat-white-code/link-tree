// const json = require('./links.json');
// import json from './links.json';
// const data = {
//   "data": [
//     { "name": "Radio Coffee and Beer", "url": "https://www.radiocoffeeandbeer.com/" },
//     { "name": "SummerMoon Coffee", "url": "https://https://www.patikacoffee.com/" },
//     { "name": "Brew & Brew", "url": "https://www.thebrewandbrew.com/" }
//   ]
// }

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(document) {
    const div = document.getElementById(element);
    // const ul = document.createElement('ul');
    this.links.forEach(link => {
      let a = document.createElement('a');
      a.href = link.url;
      a.innerHTML = link.name;
      div.appendChild(a);
    })
  }
}

const data = {
  "links": [
    { "name": "Radio Coffee and Beer", "url": "https://www.radiocoffeeandbeer.com/" },
    { "name": "SummerMoon Coffee", "url": "https://https://www.patikacoffee.com/" },
    { "name": "Brew & Brew", "url": "https://www.thebrewandbrew.com/" }
  ]
}
const links = JSON.stringify(data, null, 2)

addEventListener('fetch', event => {

  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const linksReg = /.*\/links/

  if(request.url.match(linksReg)) {
    return new Response(links, {
      headers: {'Content-Type': 'application/json'}
    })
  }
  // console.log(request.url);
  // console.log(json);
  // return new Response(json, {
  //   headers: {'Content-Type': 'application/json'}
  // })
  // async function eventHandler(event) {
  //   // fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle
  //   const resp = await fetch(event.request)
  //   return resp
  // }

  const response = await fetch('https://static-links-page.signalnerve.workers.dev');
  // const res = await fetch('/links');
  // console.log(res);

  // const res = await fetch('localhost:8787/links');
  console.log(links);
  return response

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

