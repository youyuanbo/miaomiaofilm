<template>
    <div>
        <el-table border style="width: 100%" v-bind:data="nowTableData">
            <el-table-column label="日期" prop="date">
            </el-table-column>

            <el-table-column label="姓名" prop="name">
            </el-table-column>

            <el-table-column label="地址" prop="address">
            </el-table-column>

            <el-table-column label="邮箱" prop="email">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleToFreeze(scope.$index, scope.row)" type="primary">{{scope.row.isFreeze ?
                        '已冻结': '未冻结'}}
                    </el-button>
                    <el-button @click="handleDeleteUser(scope.$index, scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination :current-page.sync="currentPage"
                       :page-size="3"
                       :total="tableData.length"
                       background
                       class="page"
                       layout="prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "users",
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎1',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                        isFreeze: false,
                    }, {
                        date: '2016-05-04',
                        name: '王小虎2',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                        isFreeze: true,
                    }, {
                        date: '2016-05-01',
                        name: '王小虎3',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                        isFreeze: false,
                    }, {
                        date: '2016-05-03',
                        name: '王小虎4',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                        isFreeze: true,
                    }, {
                        date: '2016-05-02',
                        name: '王小虎5',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎6',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎7',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-02',
                        name: '王小虎8',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎9',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-02',
                        name: '王小虎1',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                        isFreeze: false,
                    }, {
                        date: '2016-05-04',
                        name: '王小虎2',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                        isFreeze: true,
                    }, {
                        date: '2016-05-01',
                        name: '王小虎3',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                        isFreeze: false,
                    }, {
                        date: '2016-05-03',
                        name: '王小虎4',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                        isFreeze: true,
                    }, {
                        date: '2016-05-02',
                        name: '王小虎5',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎6',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎7',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-02',
                        name: '王小虎8',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎9',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        email: '10477@qq.com',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        email: '10477@qq.com',
                    }
                ],
                currentPage: 1,
                pageSize: 3,
            }
        },
        methods: {
            handleDeleteUser(index, row) {
                console.log(index, row);
            },
            handleToFreeze(index, row) {
                this.axios.post('api/admin/updateFreeze', {
                    //传递参数
                    email: row.email,
                    isFreeze: !row.isFreeze,
                }).then((res) => {
                    let status = res.data.status;
                    //判断是否更新成功
                    if (status === 0) {
                        this.$alert('冻结操作已成功', '信息', {
                            confirmButtonText: '确定',
                            //回调函数
                            callback: action => {
                                this.tableData[index].isFreeze = !row.isFreeze;
                            }
                        })
                    } else {
                        this.$alert('冻结失败', '信息', {
                            confirmButtonText: '确定',
                            callback: action => {

                            }
                        })
                    }
                });
            }
        },
        computed: {
            nowTableData() {
                return this.tableData.slice(
                    (this.currentPage - 1) * this.pageSize,
                    this.currentPage * this.pageSize) || [];
            }
        }
    }
</script>

<style scoped>
    .page {
        margin-top: 20px;

    }
</style>
