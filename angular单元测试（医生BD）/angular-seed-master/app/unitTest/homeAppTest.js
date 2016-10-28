'use strict';

describe('homeApp.test', function() {
    beforeEach(module('homeApp'));
    var $controller;
    // 注入控制器
    beforeEach(angular.mock.inject(function(_$controller_){
        $controller = _$controller_;

    }));

    describe('homeApp', function () {
        var scope = {};
        // 子控制器分页
        it('homeLists length', function () {
            var controller = $controller('paginationHomeCtrl', { $scope: scope });
            expect(scope.homeLists.length).toBe(3);
        });
        it('getPagesize', function () {
            // var controller = $controller('paginationHomeCtrl', { $scope: scope });
            expect(scope.getPagesize).toBeDefined();
        });
        it('onPageChange', function () {
            expect(scope.onPageChange).toBeDefined();
        });
        // 主控制器
        it('it should be defineed', function () {
            var controller = $controller('mainController', { $scope: scope });
            expect(scope.addDoctorBD).toBeDefined();
            expect(scope.checkList).toBeDefined();
            expect(scope.editBD).toBeDefined();
        });

    });

});


