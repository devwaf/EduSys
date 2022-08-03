import { defineStore } from 'pinia'
import pages from "../router/page";

export const usePageStore = defineStore("page", {
    state: () => {
        return {
            pages,
            // token: ''
            // userId: ''
        }
    },
    actions: {
        addPage(page: any) {
            pages.push(page)
        },
        // getUserId(page: String) {
        //     userId: page
        // }
    }
})