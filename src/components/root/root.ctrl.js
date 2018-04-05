export default function rootCtrl($scope, $rootScope) {
  'ngInject';

  const themes = ['json-parser-fr']
  $scope.theme = themes[0];

  $scope.json = {
    "a": "b"
  };

  $scope.formatJson = function() {
    $rootScope.$broadcast('jsonFormatEvent');
  }

  $scope.focusTextarea = function() {
    document.getElementById('textarea').focus();
  }

  function init() {
    $scope.focusTextarea();
  }

  init();
}