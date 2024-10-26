import MypageResMsg from "@/views/mypage/msg/MypageResMsg.vue";
import MypageSendMsg from "@/views/mypage/msg/MypageReqMsg.vue";
import MypageReadMsg from "@/views/mypage/msg/MypageReadMsg.vue";
import MypageBlock from "@/views/mypage/msg/MypageBlock.vue";
import MypageResMsgDetail from "@/views/mypage/msg/MypageResMsgDetail.vue";
import MypageReqMsgDetail from "@/views/mypage/msg/MypageReqMsgDetail.vue";
import MypageInfo from "@/views/mypage/info/MypageInfo.vue";
import MyPageTeamBookmark from "@/views/mypage/bookmark/MyPageTeamBookmark.vue";
import MyPageRecruitBookmark from "@/views/mypage/bookmark/MyPageRecruitBookmark.vue";
import MyPageProjectBookmark from "@/views/mypage/bookmark/MyPageProjectBookmark.vue";
import MyPageCommunityBookmark from "@/views/mypage/bookmark/MyPageCommunityBookmark.vue";
import MyPageComuPost from "@/views/mypage/post/MyPageComuPost.vue";
import MyPageTeamPost from "@/views/mypage/post/MyPageTeamPost.vue";
import MyPageProjectPost from "@/views/mypage/post/MyPageProjectPost.vue";
import MyPageRecruitPost from "@/views/mypage/post/MyPageRecruitPost.vue";

export default [
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
    },
    {
        path: '/mypage/bookmark/team',
        name: 'teamBookmark',
        component: MyPageTeamBookmark
    },
    {
        path: '/mypage/bookmark/recruit',
        name: 'recruitBookmark',
        component: MyPageRecruitBookmark
    },
    {
        path: '/mypage/bookmark/project',
        name: 'projectBookmark',
        component: MyPageProjectBookmark
    },
    {
        path: '/mypage/bookmark/community',
        name: 'communityBookmark',
        component: MyPageCommunityBookmark
    },
    {
        path: '/mypage/post/community',
        name: 'communityPost',
        component: MyPageComuPost
    },
    {
        path: '/mypage/post/team',
        name: 'teamPost',
        component: MyPageTeamPost
    },
    {
        path: '/mypage/post/project',
        name: 'projectPost',
        component: MyPageProjectPost
    },
    {
        path: '/mypage/post/recruit',
        name: 'recruitPost',
        component: MyPageRecruitPost
    }
];