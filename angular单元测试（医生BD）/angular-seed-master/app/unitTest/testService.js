/**
 * Created by Administrator on 2016/10/25.
 */
'use strict';

describe('unit Services', function () {
    //使用angular.mock.module载入测试目标模块
    beforeEach(angular.mock.module('BDService'));
    var MyService;
    // var $log;
// 定义MyService ,注入的_MyService_（服务名），必须前后有双下划线
    beforeEach(inject(function(_MyService_, _$log_) {
        MyService = _MyService_;
        // $log = _$log_;
        // sinon.stub($log, 'warn', function() {});
    }));
    describe('MyService', function () {
        //使用inject()注入服务(MyService)的测试代码
        it('should contain an MyService service', inject(function (MyService) {
            //测试是否含有名为'tanshuai'的服务
            expect(MyService).not.toBe(null);
        }));
        // 检查是否有我们想要的函数
        it('should be function', function() {
            expect(angular.isFunction(MyService.getHomeData)).toBe(true);
            expect(angular.isFunction(MyService.addDoctorBDData)).toBe(true);
        });
        // 检测其他页面传来的参数 封装的函数
        it('getParams', function() {
            expect(MyService.getParams()).toBeDefined();
            expect(typeof MyService.getParams()).toEqual('number');
        });
        // parmesString是var定义的，不是MyService（this）的参数，所以属于未定义
        it('parmesString', function() {
            expect(MyService.parmesString).toBeDefined();
        });
    });


});