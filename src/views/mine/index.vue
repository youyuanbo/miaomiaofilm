<template>
    <div id="main">
        <Header title="我的"/>
        <div id="content">
            <Login/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import Login from '@/components/login';

    export default {
        name: "mine",
        components:{
            Header,
            Footer,
            Login,
        }
    }
</script>

<style scoped>

</style>
