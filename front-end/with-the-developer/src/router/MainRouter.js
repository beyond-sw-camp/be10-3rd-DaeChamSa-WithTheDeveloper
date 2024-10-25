import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import MainPageBefore from "@/views/main/MainPageBefore.vue";
import MainPageAfter from "@/views/main/MainPageAfter.vue";

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