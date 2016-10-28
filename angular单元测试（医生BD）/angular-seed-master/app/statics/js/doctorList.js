(function (angular) {
    var app = angular.module('doctorList', ['BDService', 'billList', 'ngRoute']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/doctorList:page?', {
            templateUrl: 'html/agency/doctorList.html',
            controller: 'doctorListCtrl'
        })
            .otherwise({
                redirectTo: "/doctorList"
            })
    }]);
    // 创建控制器
    app.controller('doctorListCtrl', ['MyService', '$scope', '$routeParams', '$route', '$location', '$http','$window', function (MyService, $scope, $routeParams, route, $location, $http,$window) {
        // 得到上一页面传递来的参数
        $scope.urlParams =  MyService.getParams($location.url());
        // 初始化下拉列表
        var loginPersonStr = localStorage.getItem("loginName");
        console.log("loginPersonStr===",loginPersonStr);
        $scope.loginPerson = loginPersonStr;
        $scope.selectList=[
            {id:1,list:"医生列表"},
            {id:2,list:"账单列表"}
        ];
        $scope.selectListValue =  $scope.selectList[0];
        // 点击返回,回到上一次浏览页面
        $scope.backOfList = function () {
            // window.history.go(-1);
            $location.url('/home_Page');
        }
        // 点击查询重新获取数据,广播方式告诉子控制器重新 获取数据
        $scope.search = function () {

            $scope.$broadcast("doctorListQueryclick");
        }
        // 接受子控制器的数据
        $scope.$on("doctorlistPageCtrlChange", function (event, response) {
            $scope.message = response.data.message;
            console.log(response.data.message);
        })
        // 点击下拉列表的"账单列表"切换到账单列表页面
        $scope.getBillList = function () {
            $location.url('/billList');
        }
        // 清除已选时间
        $scope.clearStartData = function () {
            $scope.startDate = undefined;
        }
        $scope.clearEndData = function () {
            $scope.endDate = undefined;
        }
    }]);
    // 分页控制器
    app.controller('doctorlistPageCtrlChange', ['$window', '$scope', 'MyService', function ($window, $scope, MyService) {
        // 初始化每页展现的数据条数
        $scope.doctorLists = [
            {id: 1, pageSize: "10"},
            {id: 2, pageSize: "20"},
            {id: 3, pageSize: "50"}
        ];
        $scope.selectValue = $scope.doctorLists[0];

        $scope.currentPage = 1;
        $scope.getPagesize = function () {
            requestDoctorListData();
        }
        $scope.onPageChange = function () {
            requestDoctorListData();
        };

        var requestDoctorListData = function () {
            // 必传给后台的参数
            var info = {
                "pageSize": $scope.selectValue.pageSize,
                "curPage": $scope.currentPage
            };
            // 判断时间是否已选,未选择(undefined)时,参数不传
            if ($scope.startDate == undefined && $scope.endDate != undefined) {
                angular.extend(info, {"endDate": $scope.endDate});
            } else if ($scope.startDate != undefined && $scope.endDate == undefined) {
                angular.extend(info, {"startDate": $scope.startDate});
            } else if ($scope.startDate != undefined && $scope.endDate != undefined) {
                angular.extend(info, {"startDate": $scope.startDate, "endDate": $scope.endDate});
            }
            angular.extend(info, $scope.urlParams);
            MyService.getDoctorListData(info, handlDoctorListResult);
        }
        $scope.pageCount=0;//解决数据加载缓慢导致页码出现晚于跳转到
        var handlDoctorListResult = function (response) {
            //设置总页数
            $scope.recordCount = response.data.recordCount;
            $scope.pageCount = $window.Math.ceil(response.data.recordCount / $scope.selectValue.pageSize);
            // 给父控制器传递数据
            $scope.$emit("doctorlistPageCtrlChange", response);
        };
        // 刚进页面时获取数据
        requestDoctorListData();
        // 子控制器收到父元素的信号
        $scope.$on("doctorListQueryclick", function () {
            $scope.currentPage = 1;
            requestDoctorListData();
        });
    }]);

})(angular);
