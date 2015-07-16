app.controller('SwipeCtrl', function SwipeCtrl($scope, $resource) {

    var Questions = $resource('api/questions.json');
    $scope.questions = Questions.query();

});