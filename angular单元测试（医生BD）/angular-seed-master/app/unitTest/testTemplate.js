/**
 * Created by Administrator on 2016/10/26.
 */
describe('Unit: Templates', function() {
    var $httpBackend,
        location,
        route,
        rootScope;
    beforeEach(module('login'));//不能换成其他模块名
    beforeEach(inject(
        function(_$rootScope_, _$route_, _$httpBackend_, _$location_){
            location = _$location_;
            rootScope = _$rootScope_;
            route = _$route_;
            $httpBackend = _$httpBackend_;
        }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
// 我们的测试代码放在这里
    it('loads the home template at /login', function() {
        $httpBackend.expectGET('html/agency/login.html')
            .respond(200);
        location.path('/login');
        rootScope.$digest(); // 调用digest循环
        $httpBackend.flush();
    });
    it('loads the  template at /home_page', function() {
        $httpBackend.expectGET('html/agency/home_page.html')
            .respond(200);
        location.path('/home_page');
        rootScope.$digest(); // 调用digest循环
        $httpBackend.flush();
    });
    it('loads the  template at /doctorList', function() {
        $httpBackend.expectGET('html/agency/doctorList.html')
            .respond(200);
        location.path('/doctorList');
        rootScope.$digest(); // 调用digest循环
        $httpBackend.flush();
    });
});
