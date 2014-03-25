'use strict';

angular.module('mlgPermissionCard', [])
  .directive(
  'mlgPermissionCard', function ($compile, $templateCache) {
    var childHTML = '<div ng-repeat="node in permission.children | orderBy:\'name\'" ng-show="permission.show_children">'+
        		'<div mlg-permission-card="node" mlg-permissions="permission.children" class="container"></div>'+
    			'</div>';
    return {
      templateUrl: 'views/mlgPermissionCard.html',
      restrict: 'AE',
      transclude: true,
      replace: true,
      scope: {
        permission: '=mlgPermissionCard',
        permissions: '=mlgPermissions'
      },
      link: function (scope, element) {
        element.append($compile(childHTML)(scope));
      },
      controller: function ($scope) {
        $scope.addChild = function () {
          if ($scope.permission.children) {
            $scope.permission.children.push({name: 'child' + ($scope.permission.children.length + 1)});
          }
          else {
            $scope.permission.children = [
              {name: 'child1'}
            ];
          }
          $scope.permission.show_children = true;
        };
        $scope.remove = function () {
          var index = $scope.permissions.indexOf($scope.permission);
          if (index > -1) {
            $scope.permissions.splice(index, 1);
          }
        };
      }
    };
  })
;
