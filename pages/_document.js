import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  render() {
    return (
      <Html className="govuk-template lbh-template" lang="en-gb">
        <Head>
          <title>Shared Plan</title>
        </Head>
        <body className="govuk-template__body lbh-template__body js-enabled">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
