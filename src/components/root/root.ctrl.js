export default function rootCtrl($scope, $rootScope, Analytics, $timeout) {
  'ngInject';

  const themes = ['json-parser-fr'];
  $scope.theme = themes[0];
  $scope.json = {
    "user": {
      "name": "Gordon Freeman"
    }
  };

  $scope.settings = {
    formatIndentation: 2,
    filter: '',
    filterThrottle: 250
  }

  $scope.formatJson = function() {
    $rootScope.$broadcast('jsonFormatEvent');
  }

  $scope.focusTextarea = function() {
    $timeout(() => {
      document.getElementById('textarea').focus();
      document.getElementById('textarea').select();
    }, 0);
  }

  $scope.$watch('settings.formatIndentation', function() {
    $scope.formatJson();
  });

  function init() {
    $scope.focusTextarea();
  }

  Analytics.trackPage('/');
  init();
}