<template>
    <div class="submission">
        <Spin fix v-if="loading"></Spin>
        <p class="refresh">
            <Button @click="getSubmissions(1)" type="primary" icon="refresh" shape="circle">刷新</Button>
        </p>
        <Table :columns="column" :data="data"></Table>
        <div style="text-align:center; margin-top:10px">
            <Page :current="1" :total="total" :page-size="pageSize" @on-change="getSubmissions" simple></Page>
        </div>
    </div>
</template>

<script>
import ProblemResult from '@/components/common/ProblemResult'
import DistanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import cn from 'date-fns/locale/zh_cn'
export default {
    props: ['cid', 'pid'],
    created() {
        this.getSubmissions(1)
    },
    data() {
        return {
            column: [
                {
                    title: '编程语言',
                    render: (h, params) => {
                        return this.$getLang(params.row.lang)
                    }
                },
                {
                    title: '时间',
                    render: (h, params) => {
                        return params.row.time+' S'
                    }
                },
                {
                    title: '内存',
                    render: (h, params) => {
                        return params.row.memory+ ' MB'
                    }
                },
                {
                    title: '结果',
                    render: (h, params) => {
                        return h(ProblemResult, {
                            props: {
                                result: params.row.status
                            }
                        })
                    }
                },
                {
                    title: '提交时间',
                    render: (h, params) => {
                        return this.parseTime(params.row.submit_time)
                    },
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                size: 'small',
                                type: 'ghost'
                            },
                            on: {
                                click: () => {
                                    window.open(this.$getUrl(params.row.url))
                                }
                            },
                        }, '查看源码')
                    }
                }
            ],
            data: [],
            pageSize: 5,
            total: 0,
            loading: false,
        }
    },
    methods: {
        getSubmissions(page) {
            if (! this.$store.state.userInfo.isLogin) {
                this.$Message.warning('请先登入')
                return
            }
            this.loading = true
            this.$http.get('/user/code', {
                params: {
                    cid: this.cid,
                    pid: this.pid,
                    page: page,
                    page_size: this.pageSize
                }
            }).then(res => {
                this.data = res.data.data
                this.total = res.data.total
            }).catch(res => {
                this.$Message.error('获取失败')
            }).finally(() => {
                this.loading = false
            })
        },
        parseTime(time) {
            return DistanceInWordsToNow(new Date(time), {locale: cn, addSuffix: true})
        }
    },
    watch: {
        '$store.state.userInfo.isLogin': function() {
            this.getSubmissions(1)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .submission
        position relative
        .refresh
            text-align right
            margin-bottom 10px
</style>


