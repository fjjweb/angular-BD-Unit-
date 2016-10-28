// describe('homeServiceTest', function() {
//     beforeEach(module('homeApp'));
//     var $scope, $rootScope, $httpBackend, $timeout, createController,$controller,myService;
//     beforeEach(angular.mock.inject(function(_$httpBackend_,_$rootScope_, _myService_,_$controller_) {
//
//         $httpBackend = _$httpBackend_;
//
//         $rootScope = _$rootScope_;
//
//         myService = _myService_;
//         $controller = _$controller_;
//
//         // createController = function() {
//         //     return $controller('mainController', {
//         //         '$scope': $scope
//         //     });
//         // };
//     }));
//
//     afterEach(function() {
//         $httpBackend.verifyNoOutstandingExpectation();
//         $httpBackend.verifyNoOutstandingRequest();
//     });
//
//     it('should run the Test to get the link data from the go backend', function() {
//         var controller = createController();
//         // $scope.urlToScrape = 'success.com';
//
//         $httpBackend.expect('POST', '../statics/json/edit.json')
//             .respond(200,{
//                 "curPage":1,
//                 "pageSize":5
//             });
//
//         $httpBackend.flush();
//         // have to use $apply to trigger the $digest which will
//         // take care of the HTTP request
//         // $scope.$apply(function() {
//         //     $scope.runTest();
//         // });
//
//         // expect($scope.parseOriginalUrlStatus).toEqual('calling');
//         //
//         // $httpBackend.flush();
//         //
//         // expect($scope.retrievedUrls).toEqual(["http://www.google.com", "http://angularjs.org", "http://amazon.com"]);
//         // expect($scope.parseOriginalUrlStatus).toEqual('waiting');
//         // expect($scope.doneScrapingOriginalUrl).toEqual(true);
//     });
// });