import DbtiTestView from "@/views/prefix/DbtiTestView.vue";
import DbtiResultView from "@/views/prefix/DbtiResultView.vue";
import JobSelectView from "@/views/prefix/JobSelectView.vue";
import PrefixResultView from "@/views/prefix/PrefixResultView.vue";

export default [
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
];