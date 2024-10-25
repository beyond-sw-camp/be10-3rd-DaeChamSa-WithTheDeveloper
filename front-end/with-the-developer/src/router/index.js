import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import SearchResults from "@/views/SearchResults.vue";
import RegisterView from "@/views/RegisterView.vue";
import TosView from "@/views/TosView.vue";
import LoginView from "@/views/LoginView.vue";
import FindIdView from "@/views/FindIdView.vue";
import MainPageBefore from "@/views/MainPageBefore.vue";
import Cart from "@/views/Cart.vue";
import DbtiTestView from "@/views/DbtiTestView.vue";
import AdminUser from "@/views/Admin-User.vue";
import AdminGoods from "@/views/AdminGoods.vue";
import AdminTag from "@/views/Admin-Tag.vue";
import PayFail from "@/views/PayFail.vue";
import PayComplete from "@/views/PayComplete.vue";
import DbtiResultView from "@/views/DbtiResultView.vue";
import JobSelectView from "@/views/JobSelectView.vue";
import CommunityBoardView from "@/views/CommunityBoardView.vue";
import CommunityPostView from "@/views/CommunityPostView.vue";
import CommunityCreateView from "@/views/CommunityCreateView.vue";
import CommunityUpdateView from "@/views/CommunityUpdateView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPageBefore
        },
        {
            path: '/search',
            component: SearchResults // 검색 결과 페이지
        },
        {
            path: '/register/tos',
            component: TosView  // 약관동의 페이지
        },
        {
            path: '/register',
            component: RegisterView // 회원가입 페이지
        },
        {
            path: '/login',
            component: LoginView    // 로그인 페이지
        },
        {
            path: '/find-id',
            component: FindIdView   // 아이디 찾기
        },
        {
            path: '/dbti-test',
            component: DbtiTestView // 성향 테스트
        },
        {
            path: '/dbti-result/:result',
            name: 'ResultPage',
            component: DbtiResultView,   // 성향테스트 결과
            props: true
        },
        {
            path: '/preifx/job',
            component: JobSelectView    // 수식언 직무태그 선택
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
        }
    ]
});

export default router;