/**
 * Created by Administrator on 8/18/2016.
 */
(function (angular) {
    var app = angular.module('billList', ['BDService', 'ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/billList', {
            templateUrl: 'html/agency/billList.html',
            controller: 'billListCtrl'
        })
            .otherwise({
                redirectTo: "/billList"
            })
    }]);
    // 创建控制器
    app.controller('billListCtrl', ['MyService', '$scope', '$location', '$http', function (MyService, $scope, $location, $http) {
        // 获取上一页面的参数
        $scope.urlParams =  MyService.getParams($location.url());
        var loginPersonStr = localStorage.getItem("loginName");
        console.log("loginPersonStr===",loginPersonStr);
        $scope.loginPerson = loginPersonStr;
        // 初始化下拉列表
        $scope.selectList=[
            {id:1,list:"账单列表"},
            {id:2,list:"医生列表"}
        ];
        $scope.selectListValue =  $scope.selectList[0];
        // 点击返回回到上一次点击的页面
        $scope.backOfBill = function () {
//            window.history.go(-1);
            $location.url('/homePage');
        }
        // 清除时间
        $scope.clearStartData = function () {
            $scope.startDate = undefined;
        }
        $scope.clearEndData = function () {
            $scope.endDate = undefined;
        }
        // 点击下拉列表的医生列表跳转到医生列表
        $scope.getDoctorList = function () {
            $location.url('/doctorList');
        }
        // 点击账单详情，把该页获取到的数据都放在本地存储传递
        $scope.details = function (index) {
            // 本地存储方法
            var detail =JSON.stringify($scope.billList[index]);
            localStorage.setItem("billDetailKey",detail)
            $location.url('/details');
            console.log("billList==========",detail);
        };
        // 点击查询重新获取数据，向子控制器传递
        $scope.search = function () {
            $scope.$broadcast("billListQueryclick");
        }
        // 分页通信
        $scope.$on("paginationBillList", function (event, response) {
            $scope.billList  = response.data.message;
        });
    }]);
// 分页控制器
    app.controller('paginationBillListCtrl', ['$window','$scope', 'MyService', function ($window,$scope, MyService) {
        $scope.billLists = [
            {id: 1, pageSize: "10"},
            {id: 2, pageSize: "20"},
            {id: 3, pageSize: "50"}
        ];
        $scope.selectValue = $scope.billLists[0];
        $scope.currentPage = 1;
        $scope.getPagesize = function () {
            requestBillListData();
        }
        $scope.onPageChange = function () {
            requestBillListData();
        };
        var requestBillListData = function () {
            var info = {
                "pageSize": $scope.selectValue.pageSize,
                "curPage": $scope.currentPage
            };
            if ($scope.startDate == undefined && $scope.endDate != undefined) {
                angular.extend(info, {"endDate": $scope.endDate});
            } else if ($scope.startDate != undefined && $scope.endDate == undefined) {
                angular.extend(info, {"startDate": $scope.startDate});
            } else if ($scope.startDate != undefined && $scope.endDate != undefined) {
                angular.extend(info, {"startDate": $scope.startDate, "endDate": $scope.endDate});
            }
            angular.extend(info,$scope.urlParams);
            MyService.getBillListData(info, handlBillListResult);
        }
        $scope.pageCount=0;//解决数据加载缓慢导致页码出现晚于跳转到
        var handlBillListResult = function (response) {
            //设置总页数
            $scope.recordCount = response.data.recordCount;
            $scope.pageCount = $window.Math.ceil(response.data.recordCount / $scope.selectValue.pageSize);
            // 传递给父控制器
            $scope.$emit("paginationBillList", response);
        };
        requestBillListData();
        $scope.$on("billListQueryclick", function () {
            $scope.currentPage =1;
            requestBillListData();
        })
    }]);

})(angular);



