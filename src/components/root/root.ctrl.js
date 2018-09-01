export default function rootCtrl($scope, $rootScope, Analytics, $timeout, $http, $window) {
  'ngInject';

  const themes = ['json-parser-fr'];
  const _id = window.location.pathname.split('/')[1];
  $scope.theme = themes[0];
  $scope.saveBtnText = 'Save';
  $scope.json = {
    user: {
      name: 'Gordon Freeman',
    },
  };

  $scope.settings = {
    formatIndentation: 2,
    filter: '',
    filterThrottle: 250,
  };

  $scope.formatJson = function() {
    $rootScope.$broadcast('jsonFormatEvent');
  };

  $scope.focusTextarea = function() {
    $timeout(() => {
      document.getElementById('textarea').focus();
      document.getElementById('textarea').select();
    }, 0);
  };

  $scope.onFilterChanged = function() {
    $scope.settings.filter.length > 0 && Analytics.trackEvent('settings', 'filter', $scope.settings.filter);
  };

  $scope.save = () => {
    if (_id) {
      updateJson(_id);
      return;
    }
    saveJson();
  };

  function getJson(id) {
    $http({
      method: 'GET',
      url: `/api/v1/json?id=${id}`,
    }).then(
      function successCallback(resp) {
        $scope.json = JSON.parse(resp.data.data);
        $scope.saveBtnText = 'Update';
        $scope.focusTextarea();
      },
      function errorCallback(err) {
        $window.location.href = '/';
      }
    );
  }

  function saveJson() {
    $http({
      method: 'POST',
      url: '/api/v1/json',
      data: { data: $scope.json },
    }).then(
      function successCallback(resp) {
        $window.location.href = `/${resp.data.id}`;
      },
      function errorCallback(err) {
        console.log('Something went wrong saving json');
      }
    );
  }

  function updateJson(id) {
    $http({
      method: 'POST',
      url: `/api/v1/json/${id}`,
      data: { data: $scope.json },
    }).then(
      function successCallback(resp) {
        console.log('successfully updated JSON');
      },
      function errorCallback(err) {
        console.log('Something went wrong saving json');
      }
    );
  }

  $scope.$watch('settings.formatIndentation', function() {
    $scope.formatJson();
    Analytics.trackEvent('settings', 'indentation', $scope.settings.formatIndentation);
  });

  function init() {
    $scope.focusTextarea();
    if (_id) {
      getJson(_id);
    }
  }

  Analytics.trackPage('/');
  init();
}
