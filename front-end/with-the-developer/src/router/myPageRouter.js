import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import MypageResMsg from "@/views/mypage/msg/MypageResMsg.vue";
import MypageSendMsg from "@/views/mypage/msg/MypageSendMsg.vue";
import MypageReadMsg from "@/views/mypage/msg/MypageReadMsg.vue";
import MypageBlock from "@/views/mypage/msg/MypageBlock.vue";
import MypageResMsgDetail from "@/views/mypage/msg/MypageResMsgDetail.vue";
import MypageReqMsgDetail from "@/views/mypage/msg/MypageReqMsgDetail.vue";
import MypageInfo from "@/views/mypage/info/MypageInfo.vue";

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