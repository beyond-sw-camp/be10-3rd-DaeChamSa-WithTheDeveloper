import { createStore } from 'vuex';
import axios from "axios";
const store = createStore({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        isLoggedIn: !!localStorage.getItem('accessToken'),
        bookmarkList : [],
        userRole: localStorage.getItem('userRole') || null
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
            state.isLoggedIn = !!token; // 토큰이 있을 경우 로그인 상태로 변경
            if (token) {
                localStorage.setItem('accessToken', token); // 토큰을 localStorage에 저장
            }
        },
        logout(state) {
            state.accessToken = null;
            state.isLoggedIn = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userCode');
            localStorage.removeItem('userId');
            alert('로그아웃 성공');
        },
        setMyBookmark(state, data) {
            state.bookmarkList.value = data;
        },
        setUserRole(state, role){
            state.userRole = role;
        }
    },
    actions: {
        login({ commit }, token) {
            commit('setAccessToken', token);
        },
        logout({ commit }) {
            commit('logout');
        },
        async fetchItems({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/bookmark',{
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`
                    }
                }); // Spring Boot API 엔드포인트 호출
                commit('setMyBookmark', response.data); // 데이터 저장
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        setRole({ commit }, role) {
            commit('setUserRole', role);
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        accessToken: (state) => state.accessToken,
        bookmarkList: (state) => state.bookmarkList,
        userRole: (state) => state.userRole
    }
});

export default store;