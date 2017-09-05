
angular.module("trixSandbox", ['angularTrix'])
  .controller('sandboxEditorCtrl', ['$scope', function ($scope) {

    $scope.description = 'this is a test model text 1.sub<sub>2</sub> 2. sup<sup>3</sup> 3. strong <strong>Hello</strong> 4. h2<h2>Sub Heading</h2>'

  }])

