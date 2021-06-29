const fetch = require('node-fetch'),
      express = require('express'),
      app = express()

// fontion parse : 
// attendus : doit renvoyer un json contenant les éléments title et image
// comment tester : vérifier que c'est du json, que title est du texte, ..
const parse = (body) => {
  let match = body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== 'string')
    throw new Error('Unable to parse the title tag')
  return {
      title: match[1],
      image: "TODO" 
  }
}

app.get('/', (req, res) => {
  const { url } = req.query
  if (!url)
    return res.status(400).end('Missing url query parameter')
  
  fetch(url)
    .then(res => res.text()) // parse response's body as text
    .then(body => parse(body)) // extract infos from body
    .then(json => res.send(json)) // send the result back
    .catch(e => res.status(500).end(e.message)) // catch possible errors
})

app.listen(80)

// query /tblOT7RAdbNGccvtG?fields%5B%5D=Titre+de+la+formation&fields%5B%5D=Organisme&maxRecords=100&sort%5B0%5D%5Bfield%5D=Titre+de+la+formation