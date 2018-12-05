'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:SenderCtrl
 * @description
 * # SenderCtrl
 * Controller of myApp
 */
angular.module('myApp').controller(
'SMSsCtrl',['$scope', '$rootScope', 'ApiService',
function ($scope, $rootScope, ApiService) {
    $scope.data = {
        from: "",
        to: [],
        message: "",
        receiver: ""
    };
    $scope.history = [];
    $scope.historyRev = [];
    $scope.AddReceiver = function() {
        if ($scope.data.receiver !== "") {
            $scope.data.to.push($scope.data.receiver);
            $scope.data.receiver = "";
        }
    };   
    $scope.DelReceiver = function(index) {
        $scope.data.to.splice(index, 1);
    };
    $scope.Send = function() {
        $scope.AddReceiver(); 
		let obj = {
			params: {
				token: $rootScope.session.token
			},
			data: {
				sms: {
                    from: $scope.data.from,
                    message: $scope.data.message,
                    to: $scope.data.to.join(",")
                }
			}
        };
        
        ApiService.post('/api/smss', obj, function(data) {
            $scope.history.push(JSON.stringify(data.data));
            $scope.historyRev = $scope.history.reverse();
        }, function(err) {
            $scope.history.push(err.message);
            $scope.historyRev = $scope.history.reverse();
        });
    };
}]);