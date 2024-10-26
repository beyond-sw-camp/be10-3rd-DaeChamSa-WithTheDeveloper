import CommunityBoardView from "@/views/community/CommunityBoardView.vue";
import CommunityPostView from "@/views/community/CommunityPostView.vue";
import CommunityCreateView from "@/views/community/CommunityCreateView.vue";
import CommunityUpdateView from "@/views/community/CommunityUpdateView.vue";

export default [
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
];