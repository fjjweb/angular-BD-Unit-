/**
 * Created by Administrator on 8/17/2016.
 */

(function (angular) {
    var app = angular.module('editBD', ['BDService', 'ngRoute']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editBD', {
            templateUrl: 'html/agency/editBD.html',
            controller: 'editBDCtrl'
        }).otherwise({
            redirectTo: "/editBD"
        })
    }]);
//父控制器
    app.controller('editBDCtrl', ['MyService', '$scope', '$location', '$http','$window', '$timeout',function (MyService, $scope, $location, $http,$window,$timeout) {
//点击返回，回到首页
        $scope.backDoctorBD = function () {
            $location.path('/home_page');
        };
        // 获取首页传递的参数
        $scope.urlParams = MyService.getParams($location.url());
        console.log("$scope.urlParams",$scope.urlParams);
        var loginPersonStr = localStorage.getItem("loginName");
        console.log("loginPersonStr===",loginPersonStr);
        $scope.loginPerson = loginPersonStr;

        var handleEditDataResult = function (response) {
            // 让该表单默认上返回来的数据
            console.log('===========sssss==',response.data.message);
//        $scope.user.name = response.data.message[0].userName;
            $scope.user.name = response.data.message[0].userName;
            $scope.user.telphone = response.data.message[0].mobile;
            $scope.user.loginName = response.data.message[0].loginName;
            $scope.user.password = response.data.message[0].password;
            $scope.user.gender = response.data.message[0].gender;
            $scope.user.manger = response.data.message[0].isAdmin;
            $scope.selectLeaderBD = {
                "id": response.data.message[0].leader,//此处默认的id是leader的id值，不再是点击编辑进去的那个id值（父子关系）
                "leaderName": response.data.message[0].userName
            };
            // 编辑页面时，禁止修改登录名
            document.getElementById("loginName").setAttribute("readOnly","true");
        };
        var handleLeaderBDResult = function (response) {
            $scope.leaderBDs = response.data.message;
            console.log("11111-------",response.data.message)
        };

        if ($scope.urlParams != undefined) {
            // 当点击编辑页面时，调传参的接口，和获得医生BD的接口
            MyService.geteditBDLeaderBDData($scope.urlParams, handleLeaderBDResult);
            MyService.geteditBDDataById($scope.urlParams, handleEditDataResult);
        }else{
            // 点击添加医生，进入编辑页面，传空对象，调获得上级BD接口
            MyService.geteditBDLeaderBDData( {},handleLeaderBDResult);
        }

        $scope.user = {};
        // 手机号校验
        $scope.getTelphone = function () {
            if ($scope.user.telphone == undefined) {
                return false;
            }
            var reg = /^1[3|5|7|8]{1}[0-9]{9}$/;
            if (!reg.test($scope.user.telphone)) {
                return false;
            }
            return true;
        }
        // 判断登录名是否合法，true：符合条件，false不合法
        $scope.getLoginName = function () {
            if ($scope.user.loginName == undefined ) {
                return false;
            }
            var reg = /^[_A-Za-z0-9]+$\w{0,16}/;
            if ($scope.user.loginName.length > 16) {
                return false;
            }
            if (!reg.test($scope.user.loginName)) {
                return false;
            }
            return true;
        }

        // 判断登录密码是否合法，true：符合条件，false不合法
        $scope.getLoginPwd = function () {
            if ($scope.user.password == undefined) {
                return false;
            }
            var reg = /^[a-zA-Z0-9]{6,15}$/;
            if ($scope.user.password.length < 6 || $scope.user.password.length > 15) {
                return false;
            }
            if (!reg.test($scope.user.password)) {
                return false;
            }
            return true;
        }
        // 获得上级BD的姓名
        $scope.getLeaderBD = function () {
            console.log($scope.selectLeaderBD.userName);
        }

        $scope.submitEditBDData = function () {
            var info ={};
            //需要验证输入是否合法,不合法，返回相应位置，提示信息
            if($scope.selectLeaderBD==undefined){
                info = {
                    "userName": $scope.user.name,
                    "gender": $scope.user.gender == undefined ? "0" : $scope.user.gender,
                    "mobile": $scope.user.telphone,
                    "loginName": $scope.user.loginName,
                    "password": $scope.user.password,
                    "leader": 0,
                    "isAdmin": $scope.user.manger == undefined ? "0" : $scope.user.manger
                };
            }
            else{

                info = {
                    "userName": $scope.user.name,
                    "gender": $scope.user.gender == undefined ? "0" : $scope.user.gender,
                    "mobile": $scope.user.telphone,
                    "loginName": $scope.user.loginName,
                    "password": $scope.user.password,
                    "leader": $scope.selectLeaderBD.id,
                    "isAdmin": $scope.user.manger == undefined ? "0" : $scope.user.manger
                };
            }


            // 处理响应后的数据，根据返回的数据判断提示登录名 密码 是否正确
            var handleSaveDataResult = function (response) {
                $scope.msg = '';
                if (response.data.result === 0) {
                    // 0表示成功,返回上一页面
                    $scope.msg = "您的信息已提交成功 ! 2秒后自动返回首页面";
                    var timer = $timeout(
                        function() {
                            $scope.backDoctorBD();
                        },
                        2000
                    );

                } else if(response.data.result === 2) {
                    $scope.msg = "登录名已存在";
                }else{
                    $scope.msg = "您输入的内容不合法";
                }
            };
            //判断是编辑还是添加
            if($scope.urlParams != undefined){
                angular.extend(info, $scope.urlParams);
                console.log(info)
                MyService.updateDoctorBDData(info, handleSaveDataResult);
            }
            else{
                MyService.addDoctorBDData(info, handleSaveDataResult);
                console.log(info)
            }
        }
    }]);

})(angular);

