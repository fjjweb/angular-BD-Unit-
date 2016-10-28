/**
 * Created by Administrator on 2016/8/15.
 */
(function (angular) {
    "use strict";
        angular.module('doctorDB',[
         'login',
        'homeApp',
        'editBD',
        'doctorList',
        'billList',
        'billDetails'
            //,
        //'indexAutoActive'
    ]).controller("BackToLoginCtrl",["$scope","$location", function ($scope,$location) {
            $scope.BackToLogin = function () {
                $location.path("/login");
            }


        }]);


})(angular);
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
    app.controller('mainController', ['MyService','$scope', '$routeParams', '$route', '$window', '$location', '$http', mainController]);
    function mainController (MyService,$scope, $routeParams, $route, $window, $location, $http) {

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
                var params = "?id="+ id;
                $location.url('/editBD'+params);

            }
            // 接收子控制器传来的数据
            $scope.$on("paginationCtrlChange",function(event,response){
                $scope.message = response.data.message;//用户数据信息
                console.log(response.data.message);
                $scope.recordCount = response.data.recordCount;//总共的数据条数
            })

        }


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
        $scope.selectList=[
            {id:1,list:"医生列表"},
            {id:2,list:"账单列表"}
        ];
        $scope.selectListValue =  $scope.selectList[0];
        // 点击返回,回到上一次浏览页面
        $scope.backOfList = function () {
            // window.history.go(-1);
            $location.url('/home_page');
        }
        // 点击查询重新获取数据,广播方式告诉子控制器重新 获取数据
        $scope.search = function () {
            $scope.currentPage = 1;
            $scope.$broadcast("doctorListQueryclick");
        }
        // 接受子控制器的数据
        $scope.$on("doctorlistPageCtrlChange", function (event, response) {
            $scope.message = response.data.message;
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
            console.log(info);
            requestDoctorListData();
        });

    }]);



})(angular);

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
        // 初始化下拉列表
        $scope.selectList=[
            {id:1,list:"账单列表"},
            {id:2,list:"医生列表"}
        ];
        $scope.selectListValue =  $scope.selectList[0];
        // 点击返回回到上一次点击的页面
        $scope.backOfBill = function () {
//            window.history.go(-1);
            $location.url('/home_page');
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
            requestBillListData();
        })
    }]);
})(angular);




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

        var handleEditDataResult = function (response) {
            // 让该表单默认上返回来的数据
            $scope.user.name = response.data.message[0].userName;
            $scope.user.telphone = response.data.message[0].mobile;
            $scope.user.loginName = response.data.message[0].loginName;
            $scope.user.password = response.data.message[0].password;
            $scope.user.gender = response.data.message[0].gender;
            $scope.user.manger = response.data.message[0].isAdmin;
            $scope.selectLeaderBD = {
                "id": response.data.message[0].id,
                "userName": response.data.message[0].leaderName
            };
        };

        var handleLeaderBDResult = function (response) {
            $scope.leaderBDs = response.data.message;
            console.log(response.data.message)
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
            if ($scope.user.loginName == undefined) {
                return false;
            }
            var reg = /^[A-Za-z0-9]+$\w{0,10}/;
            if ($scope.user.loginName.length > 10) {
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


                } else {
                    $scope.msg = "您输入的内容不合法";
                    // alert("内容不合法");
                }
            };
//        判断是编辑还是添加
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
    app.controller('detailsCtrl', ['MyService','$scope', '$location', '$http', function (MyService,$scope, $location, $http) {
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
        $scope.userid = billDetail.userid

        var handldetailResult = function (response) {
            console.log("=============",response);
            $scope.$broadcast('billDetailsBeforeMonth',response);
        };
        MyService.getDetailsLastMonthData({"userid": $scope.userid,"beforeMonth":$scope.curMonth-1},handldetailResult);
        $scope.backBillList = function () {
            $location.url('/billList');
        }
    }]);

    app.controller("PieCtrl", function ($scope) {
        $scope.labels = ['CT', 'MR', 'DX', 'CR', '推荐大病', '推荐片子'];
        $scope.data = [$scope.curCT, $scope.curMR,$scope.curDX,
            $scope.curCR,$scope.curZjCount,  $scope.curCgCount];
    });
    app.controller("BarCtrl", function ($scope) {
        $scope.labels = ['CT', 'MR', 'DX', 'CR', '推荐大病', '推荐片子'];
        $scope.series = ['上月', '本月'];
        $scope.colors = [
            {
                backgroundColor: 'rgba(3,98,152,1)',

            },{
                backgroundColor: 'rgba(208,211,220,1)',

            }];
        $scope.$on('billDetailsBeforeMonth', function(e,response) {
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


    });
})(angular);

/**
 * Created by Administrator on 2016/9/18.
 */
(function (angular) {
var app = angular.module("login",["ngRoute",'homeApp','doctorList', 'billList','editBD', 'billDetails','BDService' ]);
    app.config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when('/login',{
            templateUrl:"html/agency/login.html",
            controller:"loginController"
        }).otherwise({ redirectTo: "/login"})
    }]);
    app.controller("loginController",["$scope","MyService","$location","$window", function ($scope,MyService,$location,$window) {
        $scope.loginName = localStorage.getItem("loginName");
        if(localStorage.getItem("isRemebered") == "true"){
            $scope.loginPwd = localStorage.getItem("password");
            $scope.isRemebered = $window.parseInt(localStorage.getItem("isRemebered"));
            //document.getElementById("isRemeberedId").checked = true;
        }else{
            $scope.loginPwd = undefined;
            document.getElementById("isRemeberedId").checked = false;
        }

        console.log("====1", $scope.loginName,$scope.loginPwd)
        $scope.submitLoginData = function () {
             var info = {
                 "loginName":$scope.loginName == undefined ? "":$scope.loginName,
                 "password":$scope.loginPwd == undefined ? "":$scope.loginPwd
             };
            console.log("======2",info);
            var handleLoginData = function (response) {
                console.log(response);
                //当用户名和密码都正确时
                if(response.result==1){
                    //登录成功后保存到本地
                    saveStorage();
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
/**
 * Created by Administrator on 8/23/2016.
 */
(function (angular) {
    var app = angular.module('BDService', []);
    app.service('MyService', ['$http', '$window', function ($http, $window) {
        var baseUrl = "http://192.168.1.129:8080";
        var parmesString = function (info) {
            var str = "?";
            for (var k in info) {
                str += k + "=" + info[k] + "&";
            }
            str = str.slice(0, -1);
            console.log(str);
            return str;
        }
        this.getHomeData = function (info, callback) {
            console.log("====================", info);

            $http.post("../statics/json/home.json", info)
                .then(function (response) {
                    // 截取每页显示的数据
                    callback(response);
                })
        }

        // 获取编辑页面数据(新添加数据)
        this.addDoctorBDData = function (info, callback) {
            $http.post("../statics/json/edit.json", info)
            // $http.post(" http://12.168.1.129:8080/management/getDoctorBdList", info)
                .then(function (response) {
                    // 获取每页显示的数据
                    callback(response);
                })
        }
        // 获取编辑页面数据(编辑页面)
        this.geteditBDDataById = function (info, callback) {
            $http.post("../statics/json/getBdById.json", info)
            // $http.post(" http://12.168.1.129:8080/management/getDoctorBdList", info)
                .then(function (response) {
                    // 获取每页显示的数据
                    callback(response);
                })
        }

        // 获取编辑页面的上级BD
        this.geteditBDLeaderBDData = function (info, callback) {
            $http.post("../statics/json/leaderBD.json", info)
            // $http.post(" http://12.168.1.129:8080/management/getDoctorBdList", info)
                .then(function (response) {
                    // 获取每页显示的数据
                    callback(response);
                })
        }


        // 点击保存更新数据
        this.updateDoctorBDData = function (info, callback) {
            $http.post("../statics/json/updateEdit.json",info)
                .then(function (response) {
                    // 获取每页显示的数据
                    callback(response);
                })
        }



        // 获取账单列表billList数据
        this.getBillListData = function (info, callback) {
            $http.post("../statics/json/billList.json", info)
                .then(function (response) {
                    // 截取每页显示的数据
                    callback(response);
                })
        }

        // 获取详情页的数据
        this.getDetailsLastMonthData = function(info,callback){
            $http.post("../statics/json/lastMonth.json", info)
                .then(function (response) {
                    // 截取每页显示的数据
                    callback(response);
                })
        }
        // 获得其他页面传来的参数
        this.getParams = function (address) {
            var startIndex = address.indexOf("?");
            if (startIndex === -1) {
                return;
            }
            var paramsStr = address.slice(startIndex + 1);
            var paramsArr = paramsStr.split("&");
            var obj = {};
            angular.forEach(paramsArr, function (item) {
                var num = item.indexOf("=");
                obj[item.slice(0, num)] = item.slice(num + 1)
            })
            return obj;
        }
        //登录页面接口
        this.sendLoginData = function (info,callback) {
            $http.post("../statics/json/loginData.json",info)
                .success(function (response) {
                    callback(response);
            })
        }
    }])
})(angular)




