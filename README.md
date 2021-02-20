# 🖼️ Vignette

_Let’s have a web preview of a given URL_

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install `vignette`.

```bash
npm install
npm start
```

## Usage

Give the URL you want to use `curl http://localhost/?url=$URL`, and you get as response the JSON:

```json
{
    "title": "$TITLE",
    "image": "$IMAGE"
}
```

## Roadmap

- Handle `og:image` meta tag:

    ```html
    <meta property='og:image' content='//media.example.com/1234567.jpg'/>
    ```

## Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

## Authors and acknowledgment

- [Yvan Sraka](https://github.com/yvan-sraka/)
- [Nicolas Hovart](https://github.com/NicolasHov)

## LICENSE

[GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007](/LICENSE)
