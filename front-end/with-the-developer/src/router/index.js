import {createRouter, createWebHistory} from "vue-router";
import SearchResults from "@/views/SearchResults.vue";
import Cart from "@/views/Cart.vue";
import DbtiTestView from "@/views/DbtiTestView.vue";
import AdminUser from "@/views/admin/Admin-User.vue";
import AdminGoods from "@/views/admin/AdminGoods.vue";
import AdminTag from "@/views/admin/Admin-Tag.vue";
import PayFail from "@/views/PayFail.vue";
import PayComplete from "@/views/PayComplete.vue";
import PrefixRouter from "@/router/PrefixRouter.js";
import UserRouter from "@/router/UserRouter.js";
import GoodsList from "@/views/GoodsList.vue";
import CommunityBoardView from "@/views/CommunityBoardView.vue";
import CommunityPostView from "@/views/CommunityPostView.vue";
import CommunityCreateView from "@/views/CommunityCreateView.vue";
import CommunityUpdateView from "@/views/CommunityUpdateView.vue";
import MainRouter from "@/router/MainRouter.js";
import MyPageRouter from "@/router/myPageRouter.js";

const routes = [
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
        {
            path: '/goods',
            component: GoodsList
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

        // *** 커뮤니티
        {
            path: '/community', // 게시판 목록 페이지
            name: 'communityList',
            component: CommunityBoardView
        },
        {
            path: '/community/:id', // 게시글 상세 페이지
            name: 'CommunityPostDetail',
            component: CommunityPostView,
            props: true, // URL 파라미터를 props로 전달
        },
        {
            path: '/community/create',
            name: 'communityPostCreate',
            component: CommunityCreateView
        },
        {
            path: '/community/update/:comuCode',
            name: 'communityPostUpdate',
            component: CommunityUpdateView
        },
        // 성향 라우터
        ...PrefixRouter,

        // 유저 라우터
        ...UserRouter,

        // 메인 페이지 라우터
        ...MainRouter,

        // 마이 페이지 라우터
        ...MyPageRouter
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // 라우팅 시 화면 최 상단으로 이동됨.
    scrollBehavior(to, from, savedPosition) {
        // savedPosition이 있는 경우(예: 뒤로 가기), 해당 위치로 이동
        if (savedPosition) {
            return savedPosition;
        } else {
            // 새로운 페이지 이동 시 맨 위로 스크롤
            return { top: 0 };
        }
    }
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