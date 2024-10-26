import TeamBoardView from "@/views/team/TeamBoardView.vue";
import TeamPostView from "@/views/team/TeamPostView.vue";
import TeamCreateView from "@/views/team/TeamCreateView.vue";
import TeamUpdateView from "@/views/team/TeamUpdateView.vue";

export default [
    {
        path: '/team',
        name: 'teamList',
        component: TeamBoardView
    },
    {
        path: '/team/:id',
        name: 'teamPostDetail',
        component: TeamPostView,
        props: true
    },
    {
        path: '/team/create',
        name: 'teamPostCreate',
        component: TeamCreateView
    },
    {
        path: '/team/update/:id',
        name: 'teamPostUpdate',
        component: TeamUpdateView
    }
];