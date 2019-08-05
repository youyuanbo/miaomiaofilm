<template>
    <div class="cinema_body">
        <Scroller>
            <ul>
                <li :key="cinema.id" v-for="cinema in cinemas">
                    <div>
                        <span>{{cinema.nm}}</span>
                        <span class="q"><span class="price">{{cinema.sellPrice}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{cinema.addr}}</span>
                        <span>{{cinema.distance}}</span>
                    </div>
                    <div class="card">
                        <!--使用过滤器对tag数组中的数据进行过滤-->
                        <div :key="key" v-bind:class="key| classCard" v-for="(num,key) in cinema.tag" v-if="num === 1">
                            {{key | formatCard}}
                        </div>
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
    export default {
        name: "cinemaList",
        data() {
            return {
                cinemas: [],
                //当前城市的id
                prevCityId: -1,
            }
        },
        mounted() {
            let cityId = this.$store.state.city.id;
            if (this.prevCityId === cityId) {
                return;
            }

            this.axios.get('/api/cinemaList?cityId=' + cityId).then((res => {
                let msg = res.data.msg;
                if (msg === 'ok') {
                    this.cinemas = res.data.data.cinemas;
                    this.prevCityId = cityId;
                }
            }))
        },
        filters: {
            //过滤tag标签
            formatCard(key) {
                let card = [
                    {key: 'allowRefund', value: '退款'},
                    {key: 'buyout', value: '售罄'},
                    {key: 'snack', value: '小吃'},
                    {key: 'vipTag', value: '折扣卡'},
                ];
                for (let i = 0; i < card.length; i++) {
                    if (card[i].key === key) {
                        return card[i].value;
                    }
                }
                return '';
            },
            //给tag标签添加不同的样式
            classCard(key) {
                let card = [
                    {key: 'allowRefund', value: 'bl'},
                    {key: 'buyout', value: 'bl'},
                    {key: 'snack', value: 'or'},
                    {key: 'vipTag', value: 'or'},
                ];
                for (let i = 0; i < card.length; i++) {
                    if (card[i].key === key) {
                        return card[i].value;
                    }
                }
                return '';
            }
        }
    }
</script>

<style scoped>
    #content .cinema_body {
        flex: 1;
        overflow: auto;
    }

    .cinema_body ul {
        padding: 20px;
    }

    .cinema_body li {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }

    .cinema_body div {
        margin-bottom: 10px;
    }

    .cinema_body .q {
        font-size: 11px;
        color: #f03d37;
    }

    .cinema_body .price {
        font-size: 18px;
    }

    .cinema_body .address {
        font-size: 13px;
        color: #666;
    }

    .cinema_body .address span:nth-of-type(2) {
        float: right;
    }

    .cinema_body .card {
        display: flex;
    }

    .cinema_body .card div {
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        font-size: 13px;
        margin-right: 5px;
    }

    .cinema_body .card div.or {
        color: #f90;
        border: 1px solid #f90;
    }

    .cinema_body .card div.bl {
        color: #589daf;
        border: 1px solid #589daf;
    }

</style>
