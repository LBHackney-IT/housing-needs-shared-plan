import App from 'next/app';
import Layout from 'components/Layout';
import './stylesheets/all.scss';

export default class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <script src="/js/govuk.js"></script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMZSGZ6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </>
    );
  }
}
