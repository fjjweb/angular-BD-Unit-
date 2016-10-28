

(function (angular) {
    var app = angular.module('billDetails', ['BDService','ngRoute','chart.js']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details', {
            templateUrl: 'html/agency/billDetails.html',
            controller: 'detailsCtrl'
        })
            .otherwise({
                redirectTo: "/details"
            })

    }]);
    app.controller('detailsCtrl', ['MyService','$scope', '$location', function (MyService,$scope, $location) {
        var loginPersonStr = localStorage.getItem("loginName");
        console.log("loginPersonStr===",loginPersonStr);
        $scope.loginPerson = loginPersonStr;
        // 获取当前时间
        var data = new Date();
        $scope.curMonth = data.getMonth()+1;
        // 本地存储获得数据
        var str = localStorage.getItem("billDetailKey");
        var billDetail = JSON.parse(str);
        console.log("详情",billDetail);
        $scope.userName = billDetail.userName;
        $scope.curTotal = billDetail.curTotal;
        $scope.curCT = billDetail.curCT;
        $scope.ctMoney = billDetail.ctMoney;
        $scope.curMR = billDetail.curMR;
        $scope.mrMoney = billDetail.mrMoney;
        $scope.curDX = billDetail.curDX;
        $scope.dxMoney = billDetail.dxMoney;
        $scope.curCR = billDetail.curCR;
        $scope.crMoney = billDetail.crMoney;
        $scope.curZjCount = billDetail.curZjCount;
        $scope.curZjCountMoney = billDetail.curZjCountMoney;
        $scope.curCgCount = billDetail.curCgCount;
        $scope.curCgCountMoney = billDetail.curCgCountMoney;
        $scope.userid = billDetail.userid;

        var handldetailResult = function (response) {
            console.log("=============",response);
            $scope.$broadcast('billDetailsBeforeMonth',response);
        };

        MyService.getDetailsLastMonthData({"userid": $scope.userid,"beforeMonth":$scope.curMonth-1},handldetailResult);
        $scope.backBillList = function () {
            $location.url('/billList');
        };

    }]);

    app.controller("PieCtrl", ["$scope",function ($scope) {
        $scope.labels = ['CT', 'MR', 'DX', 'CR', '推荐大病', '推荐片子'];
        $scope.data = [$scope.curCT, $scope.curMR,$scope.curDX,
            $scope.curCR,$scope.curZjCount,$scope.curCgCount];
        var isNull = true;
        for(var i =0 ;i< $scope.data.length; i++){
            if($scope.data[i]!=0){
                isNull = false;
            }
        }
        if(isNull){
            $scope.msg = "本月数据为0，不显示饼状图";
        }

    }]);
    app.controller("BarCtrl", ["$scope",function ($scope) {
        $scope.labels = ['CT', 'MR', 'DX', 'CR', '推荐大病', '推荐片子'];
        $scope.series = ['上月', '本月'];
        $scope.colors = [
            {
                backgroundColor: 'rgba(3,98,152,1)',
            },{
                backgroundColor: 'rgba(208,211,220,1)',
            }];
        $scope.yAxis = 0;
        $scope.$on('billDetailsBeforeMonth', function(e,response) {

            console.log("===",response.data);
            $scope.beforeMonthCT = response.data.message[0].ct;
            $scope.beforeMonthMR = response.data.message[0].mr;
            $scope.beforeMonthDX = response.data.message[0].dx;
            $scope.beforeMonthCR = response.data.message[0].cr;
            $scope.beforeMonthZjCount = response.data.message[0].zjCount;
            $scope.beforeMonthCgCount = response.data.message[0].cgCount;
            $scope.data = [
                [ $scope.beforeMonthCT, $scope.beforeMonthMR, $scope.beforeMonthDX, $scope.beforeMonthCR,
                    $scope.beforeMonthZjCount, $scope.beforeMonthCgCount],
                [$scope.curCT, $scope.curMR,$scope.curDX,
                    $scope.curCR,$scope.curZjCount,$scope.curCgCount]
            ];
//        	    var isNull = true,isHide = false ;
//                for(var i =0 ;i< $scope.data.length; i++){
//              	  for(var j=0;j<$scope.data[i].length;j++){
//              			if($scope.data[i][j]!=0){
//                        		isNull = false;
//                        	}
//              	  }
//                
//                }
//                if(isNull){
//                	$scope.msgBar = "本月数据为0，不显示柱状图";
//                	$scope.isHide = true;
//                	
//                } 
            $scope.getdata = function(id){
                if(id == 'id1'){
                    return  [
                        [ $scope.beforeMonthCT, $scope.beforeMonthMR, $scope.beforeMonthDX, $scope.beforeMonthCR,
                            $scope.beforeMonthZjCount, $scope.beforeMonthCgCount],
                        [$scope.curCT, $scope.curMR,$scope.curDX,$scope.curCR,$scope.curZjCount,$scope.curCgCount]
                    ];
                }
            };
        });

    }]);
})(angular);
