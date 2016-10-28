/**
 * Created by Administrator on 2016/9/19.
 */
(function (angular) {
    angular.module("indexAutoActive",[])
       .directive('autoActive',['$location',function($location){
            return {

                link:function(scope,element,attributes){
                    // scope的属性值只能够在模板中使用，
                    // element是指令所在标签的jqLite对象
                    // attributes 指令所在标签的所有属性。

                    // 我们这里是要给li标签设置点击事件，点击时获取焦点
                    console.log(element);
                    //console.log(element[0]);
                    element.on('click',function(){
                        console.log(123);
                        element.next().css("display","block");

                     });
                }
            }

        }])
})(angular)