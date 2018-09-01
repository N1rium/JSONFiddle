export default function config($compileProvider, AnalyticsProvider, $locationProvider) {
  'ngInject';
  //$compileProvider.debugInfoEnabled(false);
  try {
    AnalyticsProvider.setAccount('UA-117114164-1');
  } catch (e) {
    console.warn(e);
  }
  $locationProvider.html5Mode(true);
}
