'use strict';

describe('route.test', function() {
    beforeEach(module('homeApp'));
    var location , route, rootScope;
    // 注入控制器
    beforeEach(angular.mock.inject(function(_$location_,_$route_,_$rootScope_){
        location = _$location_;
        route = _$route_;
        rootScope = _$rootScope_;
    }));

    describe('home route', function () {
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('html/agency/home_page.html')
                .respond(200,'main ')
        }));
        it("should load '/'", function () {
            location.path('/home_page');
            rootScope.$digest();
            // expect(route.current.controller).toBe('mainController');
            expect(route.current.controller).toBe('mainController');
        });
        it("should redirect to the path on non-existent route",function () {
            location.path('/definitely/not/a/_route');
            rootScope.$digest();
            expect(route.current.controller).toBe('mainController');
        })
    });

});



