/**
 * Created by Administrator on 2016/9/18.
 */
(function (angular) {
var app = angular.module("login",["ngRoute",'homeApp','doctorList', 'billList','editBD', 'billDetails','BDService' ]);
    app.config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when('/login',{
            templateUrl:"html/agency/login.html",
            controller:"loginController"
        })
            .otherwise({ redirectTo: "/login"})
    }]);
    app.controller("loginController",["$scope","MyService","$location", function ($scope,MyService,$location) {
        //记住密码功能
        $scope.loginName = localStorage.getItem("loginName");
        if(localStorage.getItem("isRemebered") == "true"){
            $scope.loginPwd = localStorage.getItem("password");
            $scope.isRemebered  = JSON.parse(localStorage.getItem("isRemebered"));
            document.getElementById("isRemeberedId").checked = true;

        }else{
            $scope.loginPwd = undefined;
            document.getElementById("isRemeberedId").checked = false;
        }
        $scope.submitLoginData = function () {
            var info = {
                "loginName":$scope.loginName == undefined ? "":$scope.loginName,
                "password":$scope.loginPwd == undefined ? "":$scope.loginPwd
            };
            var handleLoginData = function (response) {
                console.log(response);
                //当用户名和密码都正确时
                if(response.result==0&&response.message==0){
                    //登录成功后保存到本地
                    saveStorage();

                    console.log(localStorage.getItem("=======","loginName"));
                    $location.path("/home_page");
                }
                else{
                    $scope.errorMessage = "您的用户名或者密码错误，请重新输入";
                }
            }
            MyService.sendLoginData(info,handleLoginData);
            //数据保存到本地
            function saveStorage() {
                localStorage.setItem("loginName", $scope.loginName);
                localStorage.setItem("password", $scope.loginPwd);
                localStorage.setItem("isRemebered", $scope.isRemebered);
            }
        }
    }]);
})(angular);

