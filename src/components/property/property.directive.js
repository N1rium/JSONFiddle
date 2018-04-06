import { isString, isNumber, isObject, isArray, isBoolean, isNull } from '../../util';
export default function property() {
  return {
      scope: {
          key: '=',
          value: '=',
          filter: '='
        },
        restrict: 'E',
        link: function(scope, el, attrs) {
          scope.isString  = () => isString(scope.value);
          scope.isNumber  = () => isNumber(scope.value);
          scope.isObject  = () => isObject(scope.value);
          scope.isArray   = () => isArray(scope.value);
          scope.isBoolean = () => isBoolean(scope.value);
          scope.isNull    = () => isNull(scope.value);

          scope.ceaseFilter = false;
          scope.getNextFilter = (key, value) => {
            const { filter } = scope;
            if (filter && filter.length > 0) {
              var nextFilter = filter.replace(/(?:^| )([a-zA-Z0-9_]+[\.]?)/g, ' ').trim();
              var r = new RegExp("(" + key + "\\.)([a-zA-Z0-9_.]+)", "g");
              var m = filter.match(r);
              if (!m)
                return undefined;
              m.forEach((s, i, a) => a[i] = s.substring(key.length + 1));
              nextFilter = m.join(" ");
              if (nextFilter.length == 0)
                 return undefined;
              return nextFilter;
            }
            else return undefined;  
          };

          scope.getFilter = (key, value) => {
            const { filter } = scope;
            var nextFilter = scope.getNextFilter(key, value);
            if(!filter || filter.length <= 0 || filter.match(new RegExp("(?:^| )" + key + "(\\.|$| )"))) {
              scope.ceaseFilter = nextFilter == undefined;
              return true;
            }
            return false;
          }
        },
        templateUrl: 'property.html',
        replace: true,
    }
};
  
  
  