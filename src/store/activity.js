export default {
    state: {
        data:[],//所有油田信息
        date:[],//所有日期
        segment:[],//所有段号
        source:[],//图1信息
        source2:[],//图2信息
        series:[],
        series2:[],
    },
    mutations: {
        handleEdit(index, row) {
            console.log(index, row);//编辑信息
          },
        handleDelete(index, row) {
        console.log(index, row);//删除信息
        },
    }
}