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
import MypageInfo from "@/views/MypageInfo.vue";
import MypageResMsg from "@/views/MypageResMsg.vue";
import MypageSendMsg from "@/views/MypageSendMsg.vue";
import DbtiResultView from "@/views/DbtiResultView.vue";
import GoodsList from "@/views/GoodsList.vue";
import JobSelectView from "@/views/JobSelectView.vue";
import CommunityBoardView from "@/views/CommunityBoardView.vue";
import CommunityPostView from "@/views/CommunityPostView.vue";
import CommunityCreateView from "@/views/CommunityCreateView.vue";
import CommunityUpdateView from "@/views/CommunityUpdateView.vue";
import PrefixResultView from "@/views/PrefixResultView.vue";
import MypageReadMsg from "@/views/MypageReadMsg.vue";
import MainPageAfter from "@/views/MainPageAfter.vue";
import MypageBlock from "@/views/MypageBlock.vue";
import MypageMsgDetail from "@/views/MypageResMsgDetail.vue";
import MypageResMsgDetail from "@/views/MypageResMsgDetail.vue";
import MypageReqMsgDetail from "@/views/MypageReqMsgDetail.vue";

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // savedPosition이 있는 경우(예: 뒤로 가기), 해당 위치로 이동
        if (savedPosition) {
            return savedPosition;
        } else {
            // 새로운 페이지 이동 시 맨 위로 스크롤
            return { top: 0 };
        }
    },
    routes: [
        {
            path: '/',
            component: MainPageBefore
        },
        {
          path: '/main',
          component: MainPageAfter
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
            path: '/prefix/test',
            component: DbtiTestView // 성향 테스트
        },
        {
            path: '/prefix/dbti-result/:result',
            name: 'ResultPage',
            component: DbtiResultView,   // 성향테스트 결과
            props: true
        },
        {
            path: '/prefix/job-tag',
            component: JobSelectView    // 수식언 직무태그 선택
        },
        {
            path: '/prefix/result',
            component: PrefixResultView // 수식언 결과 페이지
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
        {
            path: '/mypage/info',
            name: 'profile',
            component: MypageInfo
        },
        {
            path: '/mypage/resMsg',
            name: 'messages',
            component: MypageResMsg
        },
        {
            path: '/mypage/sendMsg',
            component: MypageSendMsg
        },
        {
            path: '/mypage/readMsg',
            component: MypageReadMsg
        },
        {
            path: '/mypage/block',
            component: MypageBlock
        },
        {
            path: '/test',
            component: DbtiTestView // 성향 테스트
        },
        // *** 관리자 페이지
        {
            path: '/admin/user/status',
            component: AdminUser,
        },
        {
            path: '/admin/goods',
            component: AdminGoods,
        },
        {
            path: '/jop-tag',
            component: AdminTag,
        },
        {
            path: '/mypage/resMsgDetail/:msgCode',
            name: 'resMsgDetail',
            component: MypageResMsgDetail,
            props: true
        },
        {
            path: '/mypage/reqMsgDetail/:msgCode',
            name: 'reqMsgDetail',
            component: MypageReqMsgDetail,
            props: true
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