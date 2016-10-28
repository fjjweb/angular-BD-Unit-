//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'statics/vender/jquery/jquery-1.8.3.min.js',
            'statics/vender/bootstrap/js/bootstrap.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'statics/modules/node_modules/chart.js/dist/Chart.js',
            'statics/modules/node_modules/angular-chart.js/dist/angular-chart.min.js',
            'statics/vender/bootstrap/js/bootstrap-datetimepicker.zh-CN.js',
            'statics/vender/lib/ng-pagination.min.js',
            'statics/vender/bootstrap/js/ui-bootstrap-tpls.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // 'components/**/*.js',
            // 'view*/**/*.js'
            'statics/js/*.js',
            'unitTest/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
