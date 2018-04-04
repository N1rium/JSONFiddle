import * as angular from 'angular';
import './style/main.sass';

import rootCtrl from './components/root/root.ctrl';
import rootConfig from './components/root/root.config';

import propertyDirective from './components/property/property.directive';
import jsonTextDirective from './components/json-text/jsontext.directive';

angular.module('App', [])
  //.config(rootConfig)
  .controller('RootController', rootCtrl)
  .directive('property', propertyDirective)
  .directive('jsonText', jsonTextDirective);
