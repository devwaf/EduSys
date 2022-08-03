import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useNotice = defineStore("Notice", {
    // state: () => {
    //     return{
    //         sideLiST:[],
    //     }
       
    // },
    actions: {
        // 学生端获取所有消息
        getAllNotice(userId: string) {
            return service({
                path: "/api/services/app/Homework/GetAllHomeworkMessage",
                query: {
                    userId
                }
            })
        },
        // 删除所有消息
        deleteNotice(noticeId: string, userId: string) {
            return service({
                path: "/api/services/app/Homework/DeleteHomeworkMessage",
                method: "delete",
                query: {
                    noticeId,
                    userId
                }
            })
        },
        // 教师端获取所有消息
       getTeacherNotice(userId: string) {
          return service({
                path: "/api/services/app/Homework/GetAllTeaHomeworkMessage",
                query: {
                    userId
                }
            })
           
        
            
        },
        deleteTeacherNotice(userId: string, message: string) {
            console.log(userId, message, 66666666666);

            return service({
                path: "/api/services/app/Homework/DeleteTeaHomeworkMessage",
                method: "delete",
                query: {
                    userId,
                    message
                }
            })
        }
    }
})