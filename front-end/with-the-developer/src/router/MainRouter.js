import MainPageBefore from "@/views/main/MainPageBefore.vue";
import MainPageAfter from "@/views/main/MainPageAfter.vue";

export default [
    {
        path: '/',
        component: MainPageBefore
    },
    {
        path: '/main',
        component: MainPageAfter
    }
];