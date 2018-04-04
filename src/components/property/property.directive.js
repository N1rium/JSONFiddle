import { isString, isNumber, isObject, isArray, isBoolean, isNull } from '../../util';
export default function property() {
    return {
        scope: {
            key: '=',
            value: '='
          },
          restrict: 'E',
          link: function(scope, el, attrs) {
            scope.isString  = () => isString(scope.value);
            scope.isNumber  = () => isNumber(scope.value);
            scope.isObject  = () => isObject(scope.value);
            scope.isArray   = () => isArray(scope.value);
            scope.isBoolean = () => isBoolean(scope.value);
            scope.isNull    = () => isNull(scope.value); 
          },
        template: `
            <span class="property">
              <span class="key" ng-if="key">{{key}}</span>
              <span class="number" ng-if="isNumber()">{{value}}</span>
              <span class="string" ng-if="isString()">{{value}}</span>
              <span class="boolean" ng-if="isBoolean()">{{value}}</span>
              <span class="null" ng-if="isNull()">null</span>
              <span class="object" ng-class="{'collapsed': collapsed}" ng-if="isObject()">
                <span class="toggle" ng-click="collapsed = !collapsed">{</span>
                <ul>
                  <li ng-repeat="(k,v) in value">
                    <property key="k" value="v"></property>
                  </li>
                </ul>
                <span class="toggle-end">}</span>
              </span>
              <span class="array" ng-class="{'collapsed': collapsed}" ng-if="isArray()">
                <span class="toggle" ng-click="collapsed = !collapsed">
                [
                <span ng-if="collapsed">{{value.length}}</span>
                </span>
                <ul>
                  <li ng-repeat="(k,v) in value">
                    <property value="v"></property>
                  </li>
                </ul>
                <span class="toggle-end">]</span>
              </span>
            </span>
          `,
          replace: true,
      }
  };
  
  
  