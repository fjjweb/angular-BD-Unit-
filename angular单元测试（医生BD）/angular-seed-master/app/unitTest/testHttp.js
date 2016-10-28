describe('http', function() {
    "use strict";

    beforeEach(module('BDService'));
    var MyService;
    var $httpBackend;
// 定义MyService ,注入的_MyService_（服务名），必须前后有双下划线
    beforeEach(inject(function(_MyService_, _$httpBackend_) {
        MyService = _MyService_;
        $httpBackend = _$httpBackend_;
    }));

    describe('when sending a message', function() {
        beforeEach(function() {
           var aa = $httpBackend.expectPOST('../statics/json/home.json',
                {"curPage":1,"pageSize":5});

            MyService.getHomeData();
            MyService.getHomeData();
            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        })
    });
});