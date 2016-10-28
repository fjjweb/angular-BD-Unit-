

var app = angular.module('addDoctor',['ngRoute']);
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/addDoctor',{
        templateUrl:'html/agency/addDoctor.html',
        controller:'addDoctorCtrl'
    }).otherwise({
        redirectTo:"/addDoctor"
    })
}]);

app.controller('addDoctorCtrl',['$scope','$location','$http',function ($scope,$location,$http) {
    $scope.backDoctor = function () {
        $location.path('/doctorList');
    }
    console.log(123);
    $scope.doctorBDs=[
        {id:1,BD:"10"},
        {id:2,BD:"20"},
        {id:3,BD:"30"}
    ];
    $scope.selectDoctorBD =  $scope.doctorBDs[0];
    $scope.getLeaderBD = function () {
        $scope.value =  $scope.selectDoctorBD.BD
        console.log($scope.selectDoctorBD.BD);
    }
    $scope.user = {};
    $scope.getName  = function(){
        console.log($scope.user.name)
    }
    $scope.getTelphone  = function(){
        console.log($scope.user.telphone)
    }
    $scope.getHospital  = function(){
        console.log($scope.user.hospital)
    }
    $scope.getOffice  = function(){
        console.log($scope.user.office)
    }
$scope.getSpecialArea = function () {
    console.log($scope.user.speciallization)
}

    $scope.requestAddDoctorData  = function(){
var sendAddDoctorData = {
    "name":$scope.user.name,
    "gender":$scope.user.gender==undefined?"0" : $scope.user.gender ,
    "hospital":$scope.user.hospital,
    "office":$scope.user.office,
    "telphone":$scope.user.telphone,
    "loginName":$scope.user.loginName,
    "speciallization":$scope.user.speciallization,
    "selectDoctorBD":$scope.selectDoctorBD.BD
};
        console.log(sendAddDoctorData);
    }
}]);
