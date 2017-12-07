$(function () {
    // $('button[type=submit]').click(function(even){
    //     event.preventDefault();
    //     $.ajax({
    //         url:"/employee/employeeLogin",
    //         data:$('form').serialize(),
    //         type:'post',
    //         success:function(backData){
    //             console.log(backData);
    //         }
    //     })
    // })
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/employee/employeeLogin",
            data: $('form').serialize(),
            type: 'post',
            success: function (backData) {
                console.log(backData);
                // 正确
                if (backData.success == true) {
                    window.location.href = './index.html';
                } else {
                    var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
                    // 失败
                    if (backData.error == 1000) {
                        validator.updateStatus('username', 'INVALID', '	callback')
                    } else if (backData.error == 1001) {
                        validator.updateStatus('password', 'INVALID', '	callback')
                    }
                }

            }
        })
    });
    // 重置表单绑定事件
    $('button[typey=reset]').click(function(){
        var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
        //使用表单校验实例可以调用一些常用的方法。
        validator.resetForm();
    })
})