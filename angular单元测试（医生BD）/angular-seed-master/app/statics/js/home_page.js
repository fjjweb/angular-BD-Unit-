/**
 * Created by Administrator on 8/16/2016.
 */
(function (angular) {
    var app = angular.module('homeApp', ['ng-pagination','BDService','editBD', 'doctorList', 'billList', 'billDetails', 'ngRoute']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home_page', {//是html名
            templateUrl: 'html/agency/home_page.html',//相对于index.html的路径
            controller: 'mainController'
        })
            .otherwise({
                redirectTo: "/home_page"//html文件名
            })
    }]);
    // 创建控制器
    app.controller('mainController', ['MyService','$scope', '$routeParams', '$route', '$window', '$location', '$http', function (MyService,$scope, $routeParams, $route, $window, $location, $http) {
        $scope.loading = false;
        var loginPersonStr = localStorage.getItem("loginName");
        console.log("loginPersonStr===",loginPersonStr);
        $scope.loginPerson = loginPersonStr;

        // 添加医生BD
        $scope.addDoctorBD = function () {
            $location.url('/editBD');
        }
        // 点击查询跳转到医生列表（传唯一标识）
        $scope.checkList = function (id) {
            var params = "?userid="+ id;
            $location.url('/doctorList'+params);
        }
        // 点击编辑进入编辑医生BD页面（传唯一标识，页面默认上原来数据）
        $scope.editBD = function (id) {
            var params = "?id="+id;
            console.log("params",params);
            $location.url('/editBD'+params);

        }
        // 接收子控制器传来的数据
        $scope.$on("paginationCtrlChange",function(event,response){
            $scope.message = response.data.message;//用户数据信息
            console.log("===========home数据",response.data.message);
            $scope.recordCount = response.data.recordCount;//总共的数据条数
            $scope.loading = true;
        })

    }]);
    // 分页控制器
    app.controller('paginationHomeCtrl', ['$scope','MyService','$window',function($scope,MyService,$window) {
        // 初始化每页数据展示条数
        $scope.homeLists=[
            {id:1,pagesize:"10"},
            {id:2,pagesize:"20"},
            {id:3,pagesize:"50"}
        ];
        $scope.selectValue =  $scope.homeLists[0];
        // 初始化当前页是1
        $scope.currentPage = 1;
        // 每页展现条数改变时都会重新请求数据
        $scope.getPagesize = function () {
            requestHomeData();
        }
        // 页码改变时，重新获取数据
        $scope.onPageChange = function() {
            requestHomeData();
        };

        // 获取数据，给后台传参并调取接口
        var requestHomeData = function () {
            var info = {
                "curPage":$scope.currentPage,
                "pageSize":$scope.selectValue.pagesize
            };
            MyService.getHomeData(info,handleHomeResult);
        }
        // 调取接口时的回调函数
        $scope.pageCount=0;//解决数据加载缓慢导致页码出现晚于跳转到
        var handleHomeResult = function (response) {
            $scope.recordCount = response.data.recordCount;
            //设置总页数
            $scope.pageCount = $window.Math.ceil(response.data.recordCount/$scope.selectValue.pagesize);

            // 给父控制器传递数据
            $scope.$emit("paginationCtrlChange",response);

        };
        requestHomeData();
    }]);
})(angular);

