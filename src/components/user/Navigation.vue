<template>
    <div class="navigation" >
        <Menu :active-name="name" width="auto" @on-select="goTo">
            <MenuGroup title="个人信息">
                <MenuItem name="edit">
                    <Icon type="document-text"></Icon>
                    信息编辑
                </MenuItem>
                <MenuItem name="history">
                    <Icon type="chatbubbles"></Icon>
                    我的记录
                </MenuItem>
                <MenuItem name="my_contest">
                    <Icon type="compose"></Icon>
                    我的比赛
                </MenuItem>
                <MenuItem name="my_group">
                    <Icon type="ios-people"></Icon>
                    我的小组
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="相关管理">
                <MenuItem name="problem">
                    <Icon type="heart"></Icon>
                    题目管理
                </MenuItem>
                <MenuItem name="contest">
                    <Icon type="compose"></Icon>
                    比赛管理
                </MenuItem>
                <MenuItem name="group">
                    <Icon type="ios-people"></Icon>
                    小组管理
                </MenuItem>
            </MenuGroup>
        </Menu>
    </div>
</template>

<script>
export default {
    created() {
        let path = this.$route.path
        if(path == '/user')
            this.name = 'edit'
        else 
            this.name = path.replace('/user/', '')
    },
    data() {
        return {
            name: 'edit'
        }
    },
    methods: {
        goTo(name) {
            if (name == 'edit')
                this.$router.push('/user')
            else 
                this.$router.push('/user/'+name)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


