export default function jsonText() {
  return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        settings: '='
      },
      link: function(scope, element, attr, ngModel) {
        const { settings } = scope;
        function into(input) {
          try { 
            return JSON.parse(input) 
          } catch(e) { 
            return e.toString();
          }
        }

        function out(data) {
          return JSON.stringify(data, null, settings && settings.formatIndentation || 2);
        }

        ngModel.$parsers.push(into);
        ngModel.$formatters.push(out);

        scope.$on('jsonFormatEvent', function() {
          ngModel.$modelValue = '';
        });

      }
  };
};