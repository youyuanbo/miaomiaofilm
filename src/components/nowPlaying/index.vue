<template>
    <div class="movie_body" ref="movie_body">
        <scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown">{{pullDownMessage}}</li>
                <!--循环展示-->
                <li :key="item.id" v-for="item in movieList">
                    <!--将图片格式化显示-->
                    <div @tap="handleToDetail(item.id)" class="pic_show"><img v-bind:src="item.img | setWH('128.180')">
                    </div>
                    <div class="info_list">
                        <!--显示名称与显示3D标识-->
                        <h2 @tap="handleToDetail(item.id)">{{item.nm}} <img src="@/assets/maxs.png" v-if="item.version">
                        </h2>
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>{{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </scroller>

    </div>
</template>

<script>

    // import BScroll from 'better-scroll'

    export default {
        name: "nowPlaying",
        data() {
            return {
                //定义数据数组
                movieList: [],
                pullDownMessage: '',
                //当前城市的id
                prevCityId: -1,

            }
        },
        activated() {
            let cityId = this.$store.state.city.id;
            if (this.prevCityId === cityId) {
                return;
            }

            //获取数据
            this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
                let msg = res.data.msg;
                if (msg === 'ok') {
                    this.movieList = res.data.data.movieList;
                    this.prevCityId = cityId;
                }
            });
        },
        methods: {
            handleToDetail(movieId) {
                this.$router.push('/movie/detail/1/' + movieId);
            },

            handleToScroll(pos) {
                if (pos.y > 30) {
                    // console.log("scroll");
                    this.pullDownMessage = "正在更新中";
                }
            },

            handleToTouchEnd(pos) {
                // console.log("touchEnd");
                if (pos.y > 30) {
                    let cityId = this.$store.state.city.id;
                    this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
                        let msg = res.data.msg;
                        if (msg === 'ok') {
                            this.pullDownMessage = "已更新完成";
                            setTimeout(() => {
                                this.movieList = res.data.data.movieList;
                                this.pullDownMessage = '';
                            }, 500);
                        }
                    });
                }

            }
        }
    }
</script>

<style scoped>
    #content .movie_body {
        flex: 1;
        overflow: auto;
    }

    .movie_body ul {
        margin: 0 12px;
        overflow: hidden;
    }

    .movie_body ul li {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
    }

    .movie_body .pic_show {
        width: 64px;
        height: 90px;
    }

    .movie_body .pic_show img {
        width: 100%;
    }

    .movie_body .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
    }

    .movie_body .info_list h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie_body .info_list p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie_body .info_list .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }

    .movie_body .info_list img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .movie_body .btn_mall, .movie_body .btn_pre {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }

    .movie_body .btn_pre {
        background-color: #3c9fe6;
    }

    .movie_body .pullDown {
        margin: 0px;
        padding: 0px;
        border: 0px;
    }

</style>
