import App from 'next/app';
import './stylesheets/all.scss';

export default class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <script src="js/govuk.js"></script>
      </>
    );
  }
}
