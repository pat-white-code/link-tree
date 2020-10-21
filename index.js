const json = {
  "links": [
    { "name": "Radio Coffee and Beer", "url": "https://www.radiocoffeeandbeer.com/" },
    { "name": "SummerMoon Coffee", "url": "https://https://www.patikacoffee.com/" },
    { "name": "Brew & Brew", "url": "https://www.thebrewandbrew.com/" }
  ]
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if(request.url === '/links') {
    return new Response(json, {
      headers: {'Content-Type': 'application/json'}
    })
  }
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

