import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import Router from 'next/router';
import unset from 'lodash/unset';

import AppProvider from '../appProvider';
import { createClient } from '../restClient';

const mapFunc = inquery => {
  const state = inquery.getState();
  unset(state, 'sendOptions.headers.cookie');
  return state;
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.restClient = createClient({ initialState: props.cachedData });
  }

  static async getInitialProps({ Component, ctx }) {
    const { cookie } = ctx.req ? ctx.req.headers : {};
    const restClient = createClient({ globalSendOptions: { headers: { cookie } } });

    const sessionInquery = restClient.getInquery('session', {
      endpoint: '/session',
      refetchOnReconnect: true,
    });
    if (!sessionInquery.get('data')) await sessionInquery.send();

    const pageProps =
      (Component.getInitialProps && (await Component.getInitialProps({ ...ctx, restClient }))) ||
      {};
    const cachedData = restClient.getInqueriesMap({ mapFunc });

    return { pageProps, cachedData };
  }

  state = {
    nextRoutingOccur: false,
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleStartRouterChanges);
    Router.events.on('routeChangeComplete', this.handleStopRouterChanges);
    Router.events.on('routeChangeError', this.handleStopRouterChanges);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouterChanges);
    Router.events.off('routeChangeComplete', this.handleStopRouterChanges);
    Router.events.off('routeChangeError', this.handleStopRouterChanges);
  }

  handleStartRouterChanges = () => {
    this.setState({ nextRoutingOccur: true });
  };

  handleStopRouterChanges = () => {
    this.setState({ nextRoutingOccur: false });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head />
        <AppProvider restClient={this.restClient} nextRoutingOccur={this.state.nextRoutingOccur}>
          <Component {...pageProps} />
        </AppProvider>
      </>
    );
  }
}
