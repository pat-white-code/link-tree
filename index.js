const rewriter = (response) => {
  return new HTMLRewriter()
    .on("div#links", new LinksTransformer(data))
    .on('div#profile', new ProfileTransformer('block'))
    .on('img#avatar', new ImageTransformer('https://media-exp1.licdn.com/dms/image/C4D35AQHJmyV9bnJCKw/profile-framedphoto-shrink_400_400/0?e=1603468800&v=beta&t=vFunQLREdByBWWLh39p4uACBs5N82lE4XgZ9q5w7E48'))
    .on('h1#name', new NameTransformer('Patrick White'))
    .transform(response)
}

const data = {
  "links": [
    { "name": "Radio Coffee and Beer", "url": "https://www.radiocoffeeandbeer.com/" },
    { "name": "SummerMoon Coffee", "url": "https://https://www.patikacoffee.com/" },
    { "name": "Brew & Brew", "url": "https://www.thebrewandbrew.com/" }
  ]
}

class ProfileTransformer {
  constructor(display){
    this.display = display
  }
  async element(element) {
    element.setAttribute('style', `display: ${this.display}`)
  }
}

class NameTransformer {
  constructor(name){
    this.name = name;
  }
  async element(element) {
    element.setInnerContent(this.name)
  }
}

class ImageTransformer {
  constructor(src) {
    this.src = src
  }
  async element(element) {
    element.setAttribute('src', this.src)
  }
}

class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    const {links} = this.links;
    links.forEach(link => {
      element.append(`<a href=${link.url}>${link.name}</a>`, {html: true});
    })
  }
}

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
    let links = JSON.stringify(data)
    return new Response(links, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  const response = await fetch('https://static-links-page.signalnerve.workers.dev');

  return rewriter(response)
  // return new Response('Hello worker!', {
  //   headers: { 'content-type': 'text/plain' },
  // })
}

