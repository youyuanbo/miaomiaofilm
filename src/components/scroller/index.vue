<template>
    <div class="wrapper" ref="wrapper">
        <!--使用vue的插槽技术-->
        <slot></slot>
    </div>
</template>

<script>

    //引入better-scroll组件
    import BScroll from 'better-scroll'

    export default {
        name: "scroller",

        //声明两个函数
        props: {
            //handleToScroll，滑动时会触发此事件
            handleToScroll: {
                type: Function,
                default: function () {
                }
            },
            //handleToTouchEnd，滑动结束时会触发此事件
            handleToTouchEnd: {
                type: Function,
                default: function () {
                }
            }
        },
        mounted() {

            let scroll = new BScroll(this.$refs.wrapper, {
                //开启tap事件
                tap: true,
                probeType: 2,

            });

            //将scroll对戏定义为全局的
            this.scroll = scroll;

            //定义函数
            scroll.on('scroll', (pos) => {
                this.handleToScroll(pos);
            });

            //定义函数
            scroll.on('touchEnd', (pos) => {
                this.handleToTouchEnd(pos);
            });
        },

        methods: {
            //定义城市列表跳转函数
            toScrollTop(y) {
                this.scroll.scrollTo(0, y);
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100%;
    }
</style>
