import MypageResMsg from "@/views/mypage/msg/MypageResMsg.vue";
import MypageSendMsg from "@/views/mypage/msg/MypageReqMsg.vue";
import MypageReadMsg from "@/views/mypage/msg/MypageReadMsg.vue";
import MypageBlock from "@/views/mypage/msg/MypageBlock.vue";
import MypageResMsgDetail from "@/views/mypage/msg/MypageResMsgDetail.vue";
import MypageReqMsgDetail from "@/views/mypage/msg/MypageReqMsgDetail.vue";
import MypageInfo from "@/views/mypage/info/MypageInfo.vue";

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
    }
];