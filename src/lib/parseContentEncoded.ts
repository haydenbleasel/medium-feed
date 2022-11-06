import { JSDOM } from 'jsdom';

const parseContentEncoded = (
  html: string,
  url?: string
): {
  description: string | undefined;
  image: string | undefined;
  content: string | undefined;
} => {
  const dom = new JSDOM(html);

  /*
   * Medium's RSS response doesn't contain an excerpt, summary or description, but
   * we can create our own by pulling text from the first h4 element on the page,
   * which is typically the subtitle. This isn't bulletproof, so make sure you have
   * a consistent title and subtitle in your Medium posts.
   */
  const description = dom.window.document.querySelector('h4')?.textContent;

  /*
   * By default, Medium serve their images at a maximum width of 1024px (denoted by the
   * max/1024 param in the URL structure but with simple string replacement, we can
   * bump this up to whatever we'd like.
   */
  Array.from(dom.window.document.querySelectorAll('img')).map(
    (img) => (img.src = img.src.replace('max/1024', 'max/3840'))
  );

  /* Cover photos are typically in the first <img> tag (within a <figure>) */
  const image = dom.window.document.querySelector('img')?.src;

  if (description) {
    dom.window.document.querySelector('h4')?.remove();
  }

  if (image) {
    dom.window.document.querySelector('figure')?.remove();
  }

  /*
   * External links in the content (links that point to content outside your current
   * domain) should have rel="noopener noreferrer" attributes and a target of
   * _blank so it opens in a new tab.
   */
  if (url) {
    Array.from(dom.window.document.querySelectorAll('a')).forEach((node) => {
      if (!node.href.startsWith(url)) {
        node.rel = 'noopener noreferrer';
        node.target = '_blank';
      }
    });
  }

  /*
   * Automatically highlighting Medium's code snippets with highlight.js is troublesome
   * as Medium tends to break said snippets into multiple pre tags for some reason. So
   * we need to merge these tags while preserving the structure.
   */
  Array.from(dom.window.document.querySelectorAll('body > *')).forEach(
    (node) => {
      const prev = node.previousSibling as HTMLElement | null;

      if (prev && prev.nodeName === 'PRE' && node.nodeName === 'PRE') {
        prev.innerHTML += `<br /><br />${node.innerHTML}`;
        node.remove();
      }
    }
  );

  /*
   * Targeting and styling iframes are a bit easier with a wrapper, so we'll need to
   * find all iframes and wrap them with an easily targetable div element.
   */
  Array.from(dom.window.document.querySelectorAll('iframe')).forEach((node) => {
    const wrapper = dom.window.document.createElement('div');
    const parent = node.parentNode as HTMLDivElement | null;

    if (!parent) {
      return;
    }

    wrapper.className = 'iframe-wrapper';
    wrapper.innerHTML = node.outerHTML;
    parent.replaceChild(wrapper, node);

    node.remove();
  });

  const content = dom.window.document.body.innerHTML;

  return {
    description: description ?? undefined,
    image,
    content,
  };
};

export default parseContentEncoded;
