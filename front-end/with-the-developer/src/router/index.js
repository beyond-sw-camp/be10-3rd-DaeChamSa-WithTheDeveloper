import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import SearchResults from "@/views/SearchResults.vue";
import RegisterView from "@/views/RegisterView.vue";
import TosView from "@/views/TosView.vue";
import LoginView from "@/views/LoginView.vue";
import FindIdView from "@/views/FindIdView.vue";
import DbtiTestView from "@/views/DbtiTestView.vue";
import MainPageBefore from "@/views/MainPageBefore.vue";
import MainPageAfter from "@/views/MainPageAfter.vue";
import MypageProfile from "@/views/MypageProfile.vue";
import MypageBookmark from "@/views/MypageBookmark.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
            path:'/',
            component: MainPageBefore // 메인페이지(로그인 전)
        },
        {
            path:'/main',
            component: MainPageAfter // 메인페이지(로그인 후)
        },
        {
            path:'/mypage/profile',
            component: MypageProfile // 메인페이지(로그인 후)
        }
        ,
        {
            path:'/mypage/bookmark',
            component: MypageBookmark // 메인페이지(로그인 후)
        },
        {
            path: '/test',
            component: DbtiTestView // 성향 테스트
        }
    ]
});

export default router;