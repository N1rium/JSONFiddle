export default function config($compileProvider, AnalyticsProvider) {
  'ngInject';
  //$compileProvider.debugInfoEnabled(false);
  try {
    AnalyticsProvider.setAccount('UA-117114164-1');
  } catch(e) {
    console.warn(e);
  }
};