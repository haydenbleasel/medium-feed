# Medium Feed

A handy RSS to JSON parser for Medium. Since Medium don't provide a neat REST API, this is a workaround to get the latest posts from a Medium user. It works by fetching a user's RSS feed and parsing it into JSON. It includes a bunch of useful utility that figure out things like the cover photo and subtitle. Additionally, Medium's RSS feed returns one of two formats (AFAIK). This parser handles both.

## Installation

```bash
yarn add @haydenbleasel/medium-feed
```

## Usage

The module exports a single function that takes a Medium `username` (without the `@`) and returns a promise that resolves to an array of posts. There's also another param for `url` - if this is provided, all URLs that don't start with it will open in a new tab.

```jsx
import getMediumFeed from '@haydenbleasel/medium-feed';

/* Example of parsing the first Medium feed format */
const feed1 = await getMediumFeed({
  username: 'leerob',
  url: 'https://leerob.io/',
});

/* Example of parsing the second Medium feed format */
const feed2 = await getMediumFeed({ username: 'abityastunggal' });
```

## Contributing

If you have suggestions for how this module could be improved, or want to report a bug, open an issue! I'd love all and any contributions.
