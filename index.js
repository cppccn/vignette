const fetch = require('node-fetch'),
express = require('express'),
app = express()

// fontion parse : 
// attendus : doit renvoyer un json contenant les éléments title et image
// comment tester : vérifier que c'est du json, que title est du texte, ..
const parse = body => {
    let matchTitle = body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
    let matchImage = body.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png))/i) // regular expression to parse contents of the <meta> tag, NB: not working for other path than http.. https://regex101.com/r/rX1zK7/1 
  if (!matchTitle || typeof matchTitle[1] !== 'string')
    throw new Error('Unable to parse the title tag')
  if (!matchImage) {
    throw new Error('Unable to parse the meta tag')
  }
  else return {
      title: matchTitle[1],
      image: matchImage[0]
  }
}

app.use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy-Report-Only',
      "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
    );
    next();
  });

app.get('/', (req, res) => {
  const { url } = req.query
  if (!url)
    return res.status(400).end('Missing url query parameter')

  fetch(url)
    .then(res => res.text()) // parse response's body as text
    .then(body => parse(body)) // extract infos from body
    .then(json => res.json(json)) // send the result back
    .catch(e => res.status(500).end(e.message)) // catch possible errors
})

app.listen(80)

// query /tblOT7RAdbNGccvtG?fields%5B%5D=Titre+de+la+formation&fields%5B%5D=Organisme&maxRecords=100&sort%5B0%5D%5Bfield%5D=Titre+de+la+formation
