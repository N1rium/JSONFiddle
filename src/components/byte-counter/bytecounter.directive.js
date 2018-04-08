export default function jsonText() {
  return {
      restrict: 'E',
      scope: {
        json: '=',
      },
      link: function(scope, element, attr, ngModel) {
        scope.$watch('json', function(newVal, oldVal) {
          scope.size = JSON.stringify(scope.json).length;
        });
      },
      template: `
        <div>~{{size >= 1000 && (size / 1000) || size}} {{size >= 1000 && 'kb' || 'bytes'}}</div>
      `
  };
};