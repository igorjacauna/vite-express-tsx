import { renderSSRHead } from '@unhead/ssr';
import { createHead } from 'unhead';
import { definePageHead, definePageMeta, definePageScripts } from './runtime/page';
import getRouter from './runtime/router';

/**
 * Setup default values for all pages rendered
 */
async function setupDefaults() {
  // Setup default attributes and meta tags and tags
  definePageHead({
    htmlAttrs: {
      lang: 'pt',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    titleTemplate: 'VET - %s',
    title: 'Vite + Express + TSX',
    link: [
      {
        rel: 'icon',
        href: 'data:,',
      },
    ],
  });

  // Setup default scripts
  definePageScripts([
    {
      src: 'https://google-analytics.com/analytics.js',
      defer: true,
    },
  ]);

  // Setup default meta tags
  definePageMeta({
    ogDescription: 'A Proof of Concept using Vite + Express + TSX',
  });
}

export async function render(url: string, context: PageContext) {
  // Create head must be before render page, so will catch all definition
  const unhead = createHead();
  setupDefaults();

  // Create the router that will search and map all *.page.ts files
  const router = await getRouter();

  const match = router.lookup(url);

  if (!match) {
    return context.res.status(404).send('Not Found');
  }

  if (match.redirect) {
    context.res.redirect(match.status || 302, match.redirect);
    return '';
  }

  // Dinamically import the page calling import() function from router
  // to import the page module
  const page = await match.import();

  // Execute the page function
  const { content, styles }: { content: string; styles: string } = await page(
    {
      params: match.params,
      query: context.req.query,
    },
    context,
  );

  // If not returns content, maybe was a redirect
  if (!content) return '';

  // Get the head and html/body attrs contents
  const unheadPayload = await renderSSRHead(unhead);

  // Construct the HTML to response
  const html = `
    <!DOCTYPE html>
    <html ${unheadPayload.htmlAttrs}>
      <head>
        ${unheadPayload.headTags}
        ${styles}
      </head>
      <body ${unheadPayload.bodyAttrs}>
        ${unheadPayload.bodyTagsOpen}
        ${content}
        ${unheadPayload.bodyTags}
      </body>
    </html>
  `;

  return html;
}