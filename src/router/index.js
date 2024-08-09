import VueRouter from 'vue-router'
import ActivityAudit from './ActivityAudit.vue'
import OilBarByAll from './OilBarByAll.vue'
import OilBarByDay from './OilBarByDay.vue'
import OilLineByColDay from './OilLineByColDay.vue'
import OilLineByMessDay from './OilLineByMessDay.vue'
import WaterBarByAll from './WaterBarByAll.vue'
import WaterBarByDay from './WaterBarByDay.vue'
import WaterLineByColDay from './WaterLineByColDay.vue'
import WaterLineByMessDay from './WaterLineByMessDay.vue'
import WaterLineByVDay from './WaterLineByVDay.vue'
import OneSegData from './OneSegData.vue'
import home from './home.vue'

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
        {name:"ActivityAudit",path:'/ActivityAudit',component:ActivityAudit},
        {name:"OilBarByAll",path:'/QualificationAudit/OilBarByAll',component:OilBarByAll},
        {name:"OilBarByDay",path:'/QualificationAudit/OilBarByDay',component:OilBarByDay},
        {name:"OilLineByColDay",path:'/Setting/OilLineByColDay"',component:OilLineByColDay},
        {name:"OilLineByMessDay",path:'/Setting/OilLineByMessDay',component:OilLineByMessDay},
        {name:"WaterBarByAll",path:'/QualificationAudit/WaterBarByAll',component:WaterBarByAll},
        {name:"WaterBarByDay",path:'/QualificationAudit/WaterBarByDay',component:WaterBarByDay},
        {name:"WaterLineByColDay",path:'/Setting/WaterLineByColDay',component:WaterLineByColDay},
        {name:"WaterLineByMessDay",path:'/Setting/WaterLineByMessDay',component:WaterLineByMessDay},
        {name:"WaterLineByVDay",path:'/Setting/WaterLineByVDay',component:WaterLineByVDay},
        {name:"OneSegData",path:'/ActivityAudit/OneSegData',component:OneSegData},
        {name:"Home",path:'/home',component:home},
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