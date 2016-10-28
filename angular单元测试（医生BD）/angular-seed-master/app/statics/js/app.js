/**
 * Created by Administrator on 2016/8/15.
 */
(function (angular) {
    "use strict";
    angular
        .module('doctorDB',[
            'login',
            'homeApp',
            'editBD',
            'doctorList',
            'billList',
            'billDetails',
            'BDService'
        ]).controller("BackToLoginCtrl",["MyService","$scope","$location", function (MyService,$scope,$location) {

            $scope.BackToLogin = function () {
                $location.path("/login");
            }
        }]);


})(angular);