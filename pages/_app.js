import App from 'next/app';
import Layout from 'components/Layout';
import './stylesheets/all.scss';
import CookieBanner from 'components/Feature/CookieBanner';

export default class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <CookieBanner />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}
