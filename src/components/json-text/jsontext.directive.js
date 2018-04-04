export default function jsonText() {
  return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {

        function into(input) {
          try { 
            return JSON.parse(input) 
          } catch(e) { 
            return e.toString();
          }
        }

        function out(data) {
          return JSON.stringify(data, null, 2);
        }

        ngModel.$parsers.push(into);
        ngModel.$formatters.push(out);

        scope.$on('jsonFormatEvent', function() {
          ngModel.$modelValue = '';
        });

      }
  };
};