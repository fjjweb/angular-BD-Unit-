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

        this.getDoctorListData = function (info, callback) {
            $http.post("../statics/json/doctorList.json", info)
                .then(function (response) {
                    // 截取每页显示的数据
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
            if(typeof address!="undefined"){
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
            }

            return obj|{};
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




