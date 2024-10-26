import ProjectBoardView from "@/views/project/ProjectBoardView.vue";
import ProjectPostView from "@/views/project/ProjectPostView.vue";
import ProjectCreateView from "@/views/project/ProjectCreateView.vue";
import ProjectUpdateView from "@/views/project/ProjectUpdateView.vue";

export default [
    {
        path: '/project',
        name: 'projectList',
        component: ProjectBoardView
    },
    {
        path: '/project/:id',
        name: 'projectPostDetail',
        component: ProjectPostView,
        props: true
    },
    {
        path: '/project/create',
        name: 'projectPostCreate',
        component: ProjectCreateView
    },
    {
        path: '/project/update/:projPostCode',
        name: 'projectPostUpdate',
        component: ProjectUpdateView
    },
];