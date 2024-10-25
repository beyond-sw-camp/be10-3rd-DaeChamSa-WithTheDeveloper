import {createRouter, createWebHistory} from "vue-router";
import SearchResults from "@/views/SearchResults.vue";
import MainPageBefore from "@/views/MainPageBefore.vue";
import Cart from "@/views/Cart.vue";
import AdminUser from "@/views/Admin-User.vue";
import AdminGoods from "@/views/AdminGoods.vue";
import AdminTag from "@/views/Admin-Tag.vue";
import PayFail from "@/views/PayFail.vue";
import PayComplete from "@/views/PayComplete.vue";
import PrefixRouter from "@/router/PrefixRouter.js";
import UserRouter from "@/router/UserRouter.js";

const routes = [
    {
        path: '/',
        component: MainPageBefore
    },
    {
        path: '/search',
        component: SearchResults // 검색 결과 페이지
    },
    {
        path: '/cart-goods',
        component: Cart  // 장바구니
    },
    {
        path: '/payment/fail',
        component: PayFail
    },
    {
        path: '/payment/complete',
        component: PayComplete
    },
    // *** 관리자 페이지
    {
        path: '/admin/user/status',
        component: AdminUser,
    },
    {
        path: '/goods',
        component: AdminGoods,
    },
    {
        path: '/jop-tag',
        component: AdminTag,
    },
    // *** 관리자

    // 성향 라우터
    ...PrefixRouter,
    
    // 유저 라우터
    ...UserRouter,
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 페이지 이동 전에 실행되는 가드
router.beforeEach((to, from, next) => {
    const allowedPages = ['/prefix/result', '/prefix/job-tag']; // `dbti`와 `jobTag`가 필요한 페이지 목록
    if (!allowedPages.includes(to.path)) {
        // 페이지가 허용되지 않은 경우 localStorage에서 항목 삭제
        localStorage.removeItem('dbti');
        localStorage.removeItem('jobTag');
    }
    next(); // 페이지 이동 허용
});

export default router;