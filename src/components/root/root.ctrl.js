export default function rootCtrl($scope, $rootScope) {
  'ngInject';

  const themes = ['json-parser-fr']
  $scope.theme = themes[0];

  $scope.json = {
    "user": {
      "name": "Gordon Freeman"
    }
  };

  $scope.settings = {
    formatIndentation: 2,
    filter: ''
  }

  $scope.formatJson = function() {
    $rootScope.$broadcast('jsonFormatEvent');
  }

  $scope.focusTextarea = function() {
    document.getElementById('textarea').focus();
  }

  $scope.$watch('settings.formatIndentation', function() {
    $scope.formatJson();
  });

  function init() {
    $scope.focusTextarea();
  }

  init();
}