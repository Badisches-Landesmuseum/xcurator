import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from 'src/@3pc/layout-components-react';
import { theme } from 'src/themes/theme';

export default function Document() {
  return (
    <Html className={theme}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/__ENV.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
