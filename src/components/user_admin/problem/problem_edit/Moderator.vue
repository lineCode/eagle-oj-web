<template>
    <div class="moderator">
        <Alert type="warning"><span style="margin-right: 10px">当前维护地址</span>{{getModeratorUrl()}}</Alert>
        <Row :gutter="10">
            <Col span="4" class="left"><h2>维护名单</h2></Col>
            <Col span="20" class="right">
                <Alert>输入邮箱将其添加到题目维护者中，他也将拥有修改题目的权限</Alert>
                <div class="input">
                    <Input v-model="email">
                        <Button slot="append" icon="plus" @click="addModerator()"></Button>
                    </Input>
                </div>
                <ul>
                    <li v-for="item in moderators">
                        <Avatar :src="$getUrl(item.avatar)" size="large" class="avatar" />
                        <router-link :to="{path: '/profile/'+item.uid}">{{item.nickname}}</router-link>
                        <Button type="ghost" icon="trash-b" class="delete" @click="deleteModerator(item.uid)">删除</Button>
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['pid'],
    created() {
        this.setModerators()
    },
    data() {
        return {
            email: '',
            moderators: []
        }
    },
    methods: {
        setModerators() {
            this.$http.get('/problem/'+this.pid+"/moderators").then(res => {
                this.moderators = res.data
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        deleteModerator(uid) {
            this.$http.delete('/user/problem/'+this.pid+"/moderator/"+uid).then(res => {
                this.$Message.success(res.message)
                this.getModerators()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        addModerator() {
            if(this.email.length == 0) {
                this.$Message.warning('请输入邮箱')
                return
            }

            this.$http.put('/user/problem/'+this.pid+"/moderators", {
                email: this.email
            }).then(res => {
                this.$Message.success(res.message)
                this.email = ''
                this.getModerators()
            }).catch(res => {
                this.$Message.error(res.message)
            })
        },
        getModeratorUrl() {
            return window.location.host+'/#/user_admin/problem/'+this.pid
        }
    },
    watch: {
        pid: function() {
            this.getModerators()
        }
    }
}
</script>

<style lang="stylus" scoped>
    .moderator
        .left
            h2
                font-weight 500
        .right
            .input
                margin-bottom 10px
            ul
                li
                    height 50px
                    border-bottom 1px solid #ccc
                    padding 5px 0
                    .avatar
                        margin-right 10px
                        margin-top -6px
                    a
                        color #495060
                        font-size 20px
                        display inline-block
                        line-height 40px
                    .delete
                        float right 
                        margin-top 4px
</style>


