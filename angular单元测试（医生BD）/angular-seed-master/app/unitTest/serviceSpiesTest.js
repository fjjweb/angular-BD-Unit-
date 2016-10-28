
describe('BDService', function () {
    beforeEach(module('BDService'));
    var MyService, resolvedValue;
    beforeEach(inject(function ($injector) {
        MyService = $injector.get('MyService');
        // jasmine2.0语法已经变化
        // http://jasmine.github.io/2.0/introduction.html
        // spyOn(MyService, 'getHomeData').andCallThrough();1.0语法
        spyOn(MyService, 'getHomeData').and.callThrough();
        var info = {
            "curPage":1,
            "pageSize":5
        };
        MyService.getHomeData(info,function () {
            
        });

    }))
    describe('service function test',function () {
        // 测试getHomedata是否被调用
            it('getHomeData should be called', function() {
        expect(MyService.getHomeData).toHaveBeenCalled();
    });
    });
});
