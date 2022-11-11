import { parse } from 'node-html-parser';

const parseContentEncoded = (
  html: string,
  url?: string
): {
  description: string | undefined;
  image: string | undefined;
  content: string | undefined;
} => {
  const dom = parse(html);

  /*
   * Medium's RSS response doesn't contain an excerpt, summary or description, but
   * we can create our own by pulling text from the first h4 element on the page,
   * which is typically the subtitle. This isn't bulletproof, so make sure you have
   * a consistent title and subtitle in your Medium posts.
   */
  const description = dom.querySelector('h4')?.textContent;

  /*
   * By default, Medium serve their images at a maximum width of 1024px (denoted by the
   * max/1024 param in the URL structure but with simple string replacement, we can
   * bump this up to whatever we'd like.
   */
  Array.from(dom.querySelectorAll('img')).forEach((img) => {
    const src = img.getAttribute('src');

    if (!src) {
      return;
    }

    img.setAttribute('src', src.replace('max/1024', 'max/2048'));
  });

  /* Cover photos are typically in the first <img> tag (within a <figure>) */
  const image = dom.querySelector('img')?.getAttribute('src');

  if (description) {
    dom.querySelector('h4')?.remove();
  }

  if (image) {
    dom.querySelector('figure')?.remove();
  }

  /*
   * External links in the content (links that point to content outside your current
   * domain) should have rel="noopener noreferrer" attributes and a target of
   * _blank so it opens in a new tab.
   */
  if (url) {
    Array.from(dom.querySelectorAll('a')).forEach((node) => {
      if (!node.getAttribute('href')?.startsWith(url)) {
        node.setAttribute('rel', 'noopener noreferrer');
        node.setAttribute('target', '_blank');
      }
    });
  }

  const content = dom.innerHTML;

  return {
    description: description ?? undefined,
    image,
    content,
  };
};

export default parseContentEncoded;
