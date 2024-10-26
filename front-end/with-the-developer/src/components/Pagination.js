import {ref, computed} from "vue";

export function usePagination(countItem, itemsPage){
    const currentPage = ref(1);

    const totalPage = computed(() => {
        if(!countItem.value || countItem.value.length === 0 ) {
            return 1; // 총 페이지 수 1
        }
    return Math.ceil(countItem.value.length/itemsPage);
});

    const paginatedItems = computed(() => {

        if (!Array.isArray(countItem.value) || countItem.value.length === 0) {
            return [];
        }

        const start = (currentPage.value-1) * itemsPage;
        const end = start + itemsPage;
        return countItem.value.slice(start, end);
    });

    const setPage = (page) => {
        if(page < 1 || page > totalPage.value) return;
        currentPage.value = page;
    };

    const setTotalPage = (pageCount) => {
        totalPage.value = pageCount;
    }

    return {
        currentPage,
        totalPage,
        paginatedItems,
        setPage,
        setTotalPage
    };
}