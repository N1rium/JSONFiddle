require('dotenv').config();
export default function config($compileProvider, AnalyticsProvider) {
  'ngInject';
  //$compileProvider.debugInfoEnabled(false);
  try {
    AnalyticsProvider.setAccount(process.env.GA_KEY);
  } catch(e) {
    console.warn(e);
  }
};