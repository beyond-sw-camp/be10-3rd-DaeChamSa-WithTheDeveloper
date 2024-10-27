import TosView from "@/views/user/TosView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import LoginView from "@/views/user/LoginView.vue";
import FindIdView from "@/views/user/FindIdView.vue";
import ReSettingPwPage from "@/views/user/ReSettingPwPage.vue";
import KakaoLoginCompView from "@/views/user/KakaoLoginCompView.vue";

export default [
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
        path: '/reset-pw',
        component: ReSettingPwPage  // 비밀번호 재설정
    },
    {
        path: '/kakao',
        component: KakaoLoginCompView   // 카카오 로그인 이후 동작
    }
]
