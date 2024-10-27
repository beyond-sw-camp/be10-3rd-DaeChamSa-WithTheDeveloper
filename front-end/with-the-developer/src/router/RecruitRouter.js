import RecruitBoardView from "@/views/recruit/RecruitBoardView.vue";
import RecruitPostView from "@/views/recruit/RecruitPostView.vue";
import RecruitCreateView from "@/views/recruit/RecruitCreateView.vue";

export default [
    {
        path: '/recruit',
        name: 'recruitList',
        component: RecruitBoardView
    },
    {
        path: '/recruit/:id',
        name: 'recruitPostDetail',
        component: RecruitPostView,
        props: true
    },
    {
        path: '/recruit/create',
        name: 'recruitPostCreate',
        component: RecruitCreateView
    }
]