/**
 * Created by Administrator on 2016/10/26.
 */
'use strict';

describe('editBD.test', function() {
    beforeEach(module('editBD'));
    var scope,$controller;
    // 注入控制器
    beforeEach(angular.mock.inject(function($rootScope,_$controller_){
        $controller = _$controller_;
        scope = $rootScope.$new();
        $controller('editBDCtrl', { $scope: scope });
    }));

    it('backDoctorBD', function () {
        expect(scope.backDoctorBD).toBeDefined();

    });
    it('telphone', function () {
        expect(scope.user.telphone).toMatch(/^1[3|5|6|7|8]{1}[0-9]{9}$/);
    });
    it('telphone2', function () {
        expect('13656419111').toMatch(/^1[3|5|6|7|8]{1}[0-9]{9}$/);
    });
    it('getLoginName', function () {
        expect(scope.getLoginName()).toBeFalsy();
    });
    it('getLoginName2', function () {
        expect("333").toMatch(/^[A-Za-z0-9]+$\w{0,10}/);
    });
});


