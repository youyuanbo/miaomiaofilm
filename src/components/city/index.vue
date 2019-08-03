<template>
    <div class="city_body">

        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <!--循环热门城市列表，显示热门城市名称-->
                    <li :key="item.id" v-for="item in hotList">{{item.nm}}</li>
                </ul>
            </div>

            <!--双重循环，显示城市索引和城市名称-->
            <div class="city_sort" ref="city_sort">
                <!--循环城市列表-->
                <div :key="item.index" v-for="item in cityList">
                    <!--显示城市索引-->
                    <h2>{{item.index}}</h2>
                    <ul>
                        <!--循环当前城市索引对应的城市列表，并显示当前城市名称-->
                        <li :key="city.id" v-for="city in item.list">
                            {{city.nm}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">
                    {{item.index}}
                </li>
            </ul>
        </div>
    </div>


</template>

<script>
    export default {
        name: "city",
        //声明变量：两个数组
        data() {
            return {
                cityList: [],
                hotList: [],
            }
        },
        //接受来自api的数据
        mounted() {
            this.axios.get('/api/cityList').then((res => {
                var msg = res.data.msg;
                if (msg === 'ok') {
                    var cities = res.data.data.cities;
                    var {cityList, hotList} = this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;

                }
            }))
        },
        methods: {
            //格式化数据，将数据分组
            formatCityList(cities) {
                var cityList = [];
                var hotList = [];
                //循环，根据首字母将城市分组
                for (var i = 0; i < cities.length; i++) {
                    var firstLetter = cities[i].py.substring(0, 1).toUpperCase();

                    if (toCom(firstLetter)) {    //新添加
                        cityList.push({index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id}]})
                    } else {     //累加
                        for (var j = 0; j < cityList.length; j++) {
                            //如果已经存在以此首字母为首的城市，则将此城市添加到对应的列表中
                            if (cityList[j].index === firstLetter) {
                                cityList[j].list.push({nm: cities[i].nm, id: cities[i].id})
                            }
                        }
                    }
                }

                //对分组后的数据排序（按照首字母排列A-Z）
                cityList.sort((n1, n2) => {
                    if (n1.index > n2.index) {
                        return 1;
                    } else if (n1.index < n2.index) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                //循环，找出所有的热门城市
                for (var i = 0; i < cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hotList.push(cities[i])
                    }
                }

                //比较，查看是否已经存在当前以此字母为首的城市，如果存在，返回false；如果不存在，返回true
                function toCom(firstLetter) {
                    for (var i = 0; i < cityList.length; i++) {
                        if (cityList[i].index === firstLetter) {
                            return false;
                        }
                    }
                    return true;
                }

                //返回，返回分组后的城市列表和热门城市列表
                return {
                    cityList,
                    hotList,
                }
            },

            //根据索引跳转
            handleToIndex(index){
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            }
        }
    }
</script>

<style scoped>
    #content .city_body {
        margin-top: 45px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }

    .city_body .city_list {
        flex: 1;
        overflow: auto;
        background: #FFF5F0;
    }

    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }

    .city_body .city_hot {
        margin-top: 20px;
    }

    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }

    .city_body .city_sort div {
        margin-top: 20px;
    }

    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_sort ul {
        padding-left: 10px;
        margin-top: 10px;
    }

    .city_body .city_sort ul li {
        line-height: 30px;
        line-height: 30px;
    }

    .city_body .city_index {
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
    }

</style>
