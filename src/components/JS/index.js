import Vue from 'vue'
import MessageBox from './MessageBox'


export var messageBox = (function () {
    //设置默认值
    let defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk: null,
    };

    let MyComponent = Vue.extend(MessageBox);

    //配置参数
    return function (opts) {
        for (let attr in defaults) {
            defaults[attr] = opts[attr];
        }

        let vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,
            },
            methods: {
                handleCancel() {
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });

        document.body.appendChild(vm.$el);

    };

})();
