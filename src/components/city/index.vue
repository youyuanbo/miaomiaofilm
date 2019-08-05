<template>
    <div class="city_body">
        <div class="city_list">
            <Scroller ref="city_list">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <!--循环热门城市列表，显示热门城市名称-->
                            <li @tap="handleToCity(item.nm,item.id)" v-bind:key="item.id" v-for="item in hotList">
                                {{item.nm}}
                            </li>
                        </ul>
                    </div>

                    <!--双重循环，显示城市索引和城市名称-->
                    <div class="city_sort" ref="city_sort">
                        <!--循环城市列表-->
                        <div v-bind:key="item.index" v-for="item in cityList">
                            <!--显示城市索引-->
                            <h2>{{item.index}}</h2>
                            <ul>
                                <!--循环当前城市索引对应的城市列表，并显示当前城市名称-->
                                <li @tap="handleToCity(city.nm,city.id)" v-bind:key="city.id" v-for="city in item.list">
                                    {{city.nm}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>

        </div>

        <div class="city_index">
            <ul>
                <li :key="item.index" @touchstart="handleToIndex(index)" v-for="(item,index) in cityList">
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

            let cityList = window.localStorage.getItem('cityList');
            let hotList = window.localStorage.getItem('hotList');

            if (cityList && hotList) {
                this.cityList = JSON.parse(cityList);
                this.hotList = JSON.parse(hotList);
            } else {
                this.axios.get('/api/cityList').then((res => {
                    let msg = res.data.msg;
                    if (msg === 'ok') {
                        let cities = res.data.data.cities;
                        let {cityList, hotList} = this.formatCityList(cities);
                        this.cityList = cityList;
                        this.hotList = hotList;
                        window.localStorage.setItem('cityList', JSON.stringify(cityList));
                        window.localStorage.setItem('hotList', JSON.stringify(hotList));
                    }
                }));
            }
        },
        methods: {
            //格式化数据，将数据分组
            formatCityList(cities) {
                let cityList = [];
                let hotList = [];
                //循环，根据首字母将城市分组
                for (let i = 0; i < cities.length; i++) {
                    let firstLetter = cities[i].py.substring(0, 1).toUpperCase();

                    if (toCom(firstLetter)) {    //新添加
                        cityList.push({index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id}]})
                    } else {     //累加
                        for (let j = 0; j < cityList.length; j++) {
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
                for (let i = 0; i < cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hotList.push(cities[i])
                    }
                }

                //比较，查看是否已经存在当前以此字母为首的城市，如果存在，返回false；如果不存在，返回true
                function toCom(firstLetter) {
                    for (let i = 0; i < cityList.length; i++) {
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
            handleToIndex(index) {
                let h2 = this.$refs.city_sort.getElementsByTagName('h2');
                this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
            },

            handleToCity(nm, id) {
                //将选择的城市提交给stores,进行状态管理与城市切换
                this.$store.commit('city/CITY_INFO', {nm, id});
                //将切换后的数据存储起来,保证在下次刷新时,城市记录还在
                window.localStorage.setItem('nowNm', nm);
                window.localStorage.setItem('nowId', id);
                //路由跳转,选择城市后,直接跳转到此城市的正在热映面板
                this.$router.push('/movie/nowPlaying');
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
