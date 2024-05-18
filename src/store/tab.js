export default {
    state: {
        isCollapse: false//控制左菜单展开收起
    },
    mutations: {
        changeCollapse(state) {
            state.isCollapse = !state.isCollapse;
        }
    }
}