import VueRouter from 'vue-router'
import ActivityAudit from './ActivityAudit.vue'
import QualificationAudit from './QualificationAudit.vue'
import Setting from './Setting.vue'
import PieChart from './PieChart.vue'

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 重写！
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    // 如果指定了成功或者失败的回调
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
    // 没有指定成功或者失败的回调，要用catch处理
    return originalPush.call(this, location).catch((err) => {
        // 如果是重复导航产生的错误，不再向外传递错误
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }

        // 如果不是重复导航的错误，将错误向下传递
        return Promise.reject(err)
    })
}
VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalReplace.call(this, location, onResolve, onReject)
    }
    return originalReplace.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }
        return Promise.reject(err)
    })
}

const router = new VueRouter({
    routes:[
        //主路由
        {name:"Start",path:'/',redirect:"ActivityAudit"},
        {name:"Setting",path:'/Setting',component:Setting},
        {name:"QualificationAudit",path:'/QualificationAudit',component:QualificationAudit},
        {name:"ActivityAudit",path:'/ActivityAudit',component:ActivityAudit},
        {name:"PieChart",path:'/PieChart',component:PieChart},
    ],
    mode: 'history'
});
    router.beforeEach((to,from,next)=>{
        console.log(to.name,from.name)
        if(to.name !== from.name){
            next();
        }
    });
export default router;