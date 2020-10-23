class ProfileRewriter {
  constructor(){
  }
  async element(element) {
    element.removeAttribute('style')
  }
}

class ProfileName {
  constructor(){}
  async element(element) {
    element.setInnerContent('Patrick White')
  }
}

class ProfileImage {
  constructor() {}
  async element(element) {
    element.setAttribute('src', 'https://media-exp1.licdn.com/dms/image/C4D35AQHJmyV9bnJCKw/profile-framedphoto-shrink_400_400/0?e=1603468800&v=beta&t=vFunQLREdByBWWLh39p4uACBs5N82lE4XgZ9q5w7E48')
  }
}

class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    this.links = JSON.parse(this.links);
    const {links} = this.links;
    console.log(links);
    links.forEach(link => {
      element.append(`<a href=${link.url}>${link.name}</a>`, {html: true});
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
  return new HTMLRewriter()
  .on("div#links", new LinksTransformer(links))
  .on('div#profile', new ProfileRewriter())
  .on('img#avatar', new ProfileImage())
  .on('h1#name', new ProfileName())
  .transform(response)
  // .transform(response)
  // return rewriter.transform(response);

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

