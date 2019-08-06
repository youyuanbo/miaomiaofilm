<template>
    <div id="main">
        <Header title="电影"/>
        <div id="content">
            <div class="movie_menu">
                <router-link class="city_name" tag="div" to="/movie/city">
                    <span>{{ $store.state.city.nm}}</span>
                    <i class="iconfont icon-lower-triangle"></i>
                </router-link>
                <div class="hot_swtich">
                    <router-link class="hot_item" tag="div" to="/movie/nowPlaying">正在热映</router-link>
                    <router-link class="hot_item" tag="div" to="/movie/comingSoon">即将上映</router-link>
                </div>
                <router-link class="search_entry" tag="div" to="/movie/search">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <!--记录上次。。。-->
            <keep-alive>
                <!--配置路由-->
                <router-view/>
            </keep-alive>
        </div>
        <!--<NowPlaying/>-->
        <Footer/>

        <!--配置详情页面的路由显示-->
        <router-view name="detail"/>


    </div>
</template>

<script>

    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import {messageBox} from '@/components/JS'

    export default {
        name: "movie",
        components: {
            Header,
            Footer,
        },
        mounted() {

            setTimeout(() => {
                this.axios.get("/api/getLocation").then((res) => {
                    let msg = res.data.msg;
                    let nm = res.data.data.nm;
                    let id = res.data.data.id;

                    if (id == this.$store.state.city.id) {
                        return;
                    }
                    if (msg === 'ok') {
                        messageBox({
                            title: '定位',
                            content: nm,
                            cancel: '取消',
                            ok: '切换定位',
                            handleOk() {
                                //1、更改状态管理

                                //2、更改本地存储
                                window.localStorage.setItem("nowId", id);
                                window.localStorage.setItem("nowNm", nm);
                                window.location.reload();
                            }
                        });
                    }
                });
            }, 500);
        }
    }
</script>

<style scoped>
    #content {
        flex: 1;
        overflow: auto;
        margin-bottom: 50px;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    #content .movie_menu {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        z-index: 10;
    }

    .movie_menu .city_name {
        margin-left: 20px;
        height: 100%;
        line-height: 45px;
    }

    .movie_menu .city_name.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .city_name.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .hot_swtich {
        display: flex;
        height: 100%;
        line-height: 45px;
    }

    .movie_menu .hot_item {
        font-size: 15px;
        color: #666;
        width: 80px;
        text-align: center;
        margin: 0 12px;
        font-weight: 700;
    }

    .movie_menu .hot_item.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .hot_item.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .search_entry {
        margin-right: 20px;
        height: 100%;
        line-height: 45px;
    }

    .movie_menu .search_entry.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .search_entry.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .search_entry i {
        font-size: 24px;
        color: red;
    }
</style>
