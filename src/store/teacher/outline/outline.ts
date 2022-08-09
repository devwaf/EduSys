import { service } from "../../../api/service"
import { defineStore } from "pinia"

import { ElMessage } from "element-plus"
import { useRouter, useRoute } from "vue-router";
export const usePageOutline = defineStore("outline", {
    state: () => {
        return {
            outlineName: '',//大纲名称
            outlineId: "",//大纲id
            formationTable: [], //成绩权重        
            targetList: [], //毕业要求
            contrastList: [], //对照表
            courseList: [], //所有课程目标下拉框
            weightDate: [], 	//权重配置
            quantity: '',//试题数量
            examination: [], //考试配置
            num: ''
        }
    },
    actions: {
        // 获取全部毕业要求
        async GetAllGraduationRequirement() {
            const res = await service({ path: "/api/services/app/GraduationRequirement/GetAllGraduationRequirement" })
            this.targetList = []
            res.result.forEach(item => {
                this.targetList.push({
                    label: item.name,
                    value: item.id
                })
            })
        },
        // 大纲
        async getAddOutline() {
            if (this.outlineName == "") return
            if (this.outlineId) {
                // 修改大纲
                const res = await service({
                    path: "/api/services/app/Outline/UpdateOutline",
                    data: {
                        id: this.outlineId,
                        name: this.outlineName,
                        teacherId: localStorage.getItem("userId"),
                        kind: "课程"
                    },
                    method: "put"
                })
            } else {
                // 创建大纲
                const res = await service({
                    path: "/api/services/app/Outline/AddOutline",
                    data: {
                        name: this.outlineName,
                        teacherId: localStorage.getItem("userId"),
                        kind: "课程"
                    },
                    method: "post"
                })

                this.outlineId = res.result.id
                // 创建完成获取初始权重数据
                this.GetAllScoreWeight(this.outlineId) 
                this.GetAllGraduationRequirement()
            }

        },


        getID(id: string) {
            this.outlineId = id
            console.log(this.outlineId, 'id');
            this.GetOutline()
        },
        // 获取大纲
        async GetOutline() {
            console.log(111111111);
            console.log(this.outlineId, 'id的值');
            // console.log(this.num,'后');

            if (this.outlineId) {
                const res = await service({
                    path: "/api/services/app/Outline/GetOutline",
                    query: { id: this.outlineId }
                })
                this.outlineName = res.result.name
                this.GetAllGraduationRequirement()
                this.GetAllScoreWeight()
                this.GetAllCourseObjective()
                this.GetAllSwDetail()
                this.GetAllTestQuestion()
            }
            this.num = this.outlineId
            // console.log(this.num,'前');

        },
        // 添加按钮
        addition() {
            ElMessage({
                message: "请先创建大纲",
                type: "warning"
            })
        },
        // 获取所有权重
        async GetAllScoreWeight() {
            const data = await service({
                path: "/api/services/app/ScoreWeight/GetAllScoreWeight",
                query: { outlineId: this.outlineId }
            })
            this.formationTable = []
            this.formationTable = data.result


        },
        // 添加权重
        async AddScoreWeight() {

            if(this.formationTable.length==5){
                ElMessage({
                    message: "已添加至上限",
                    type: "warning"
                })
                return
            }
            const res = await service({
                path: "/api/services/app/ScoreWeight/AddScoreWeight",
                data: { outlineId: this.outlineId },
                method: "post"
            })
            this.formationTable.push({
                id: res.result.id,
                outlineId: this.outlineId,
                name: "",
                power: null,
                times: "0"
            })
            this.GetAllScoreWeight(this.outlineId)
        },
        // 修改权重
        async UpdateScoreWeight(list: any) {
            const res = await service({
                path: "/api/services/app/ScoreWeight/UpdateScoreWeight",
                data: {
                    outlineId: this.outlineId,
                    id: list.id,
                    name: list.name,
                    power: list.power,
                    times: list.times
                },
                method: "put"
            })
            if (res.success) {
                this.GetAllScoreWeight()
                this.GetAllSwDetail()
            }
        },
        // 删除权重
        async DeleteScoreWeight(id: string) {
            const res = await service({
                path: "/api/services/app/ScoreWeight/DeleteScoreWeight",
                query: { id: id },
                method: "Delete"
            })
            this.GetAllScoreWeight()
            this.GetAllSwDetail()
        },

        // 获取所有课程目标
        async GetAllCourseObjective() {
            const res = await service({
                path: "/api/services/app/CourseObjective/GetAllCourseObjective",
                query: { outlineId: this.outlineId }
            })
            this.courseList = []
            this.contrastList = res.result
            this.GetAllCourseObjectiveSelect()
        },

        // 课程目标下拉框
        async GetAllCourseObjectiveSelect() {
            const res = await service({
                path: "/api/services/app/CourseObjective/GetAllCourseObjectiveSelect",
                query: { outlineId: this.outlineId }
            })
            this.courseList = res.result
        },

        // 添加对照表
        async getAddContrast() {
            const res = await service({
                path: "/api/services/app/CourseObjective/AddCourseObjective",
                query: {
                    outlineId: this.outlineId
                },
                method: "post"
            })
            this.contrastList.push({
                id: res.result.id,
                content: "",
                name: "",
                graduationRequirementId: "",
                degreeSupport: ""
            })
            this.GetAllCourseObjective()
        },

        // 修改课程目标
        async UpdateCourseObjective(val: any) {
            const res = await service({
                path: "/api/services/app/CourseObjective/UpdateCourseObjective",
                data: val,
                method: "put"
            })
            this.GetAllCourseObjective(this.outlineId)
        },
        // 删除课程目标
        async DeleteCourseObjective(id: string) {
            const res = await service({
                path: "/api/services/app/CourseObjective/DeleteCourseObjective",
                query: { id: id },
                method: "delete"
            })
            if (res.result.result) {
                ElMessage({
                    message: res.result.message,
                    type: "success"
                })
            } else {
                ElMessage({
                    message: res.result.message,
                    type: "success"
                })
                ElMessage({
                    message: res.result.message,
                    type: "warning"
                })
            }

            this.GetAllCourseObjective()
        },
        // 获取所有权重配置
        async GetAllSwDetail() {
            const res = await service({
                path: "/api/services/app/ScoreWeight/GetAllSwDetail",
                query: { outlineId: this.outlineId },
                method: "get"
            })
            this.weightDate = res.result
        },

        // 修改权重配置
        async UpdateSwDetail(val: any) {
            const res = await service({
                path: "/api/services/app/ScoreWeight/UpdateSwDetail",
                data: { id: val.swDetailId, courseObjectiveId: val.courseObjectiveId },
                method: "put"
            })
        },
        // 获取所有题
        async GetAllTestQuestion() {
            const res = await service({
                path: "/api/services/app/TestQuestion/GetAllTestQuestion",
                method: "get",
                query: { outlineId: this.outlineId }
            })
            this.examination = res.result.testQuestions
            this.quantity = this.examination.length
        },
        // 添加题
        async getTopic() {
            const res = await service({
                path: "/api/services/app/TestQuestion/AddTestQuestion",
                method: "post",
                query: { outlineId: this.outlineId }
            })

            this.examination.push({
                id: res.result.id,
                titleNum: "",
                outlineId: this.outlineId,
                type: "",
                score: 0,
                courseObjectiveId:'',
                question: []
            })
        },
        // 修改大题
        async UpdateTestQuestion(val: any) {
            const res = await service({
                path: "/api/services/app/TestQuestion/UpdateTestQuestion",
                method: "put",
                data: {
                    id: val.id,
                    titleNum: val.titleNum,
                    outlineId: this.outlineId,
                    type: val.type,
                    score: val.score,
                    courseObjectiveId:val.courseObjectiveId
                }
            })
        },
        // 删除大题
        async DeleteTestQuestion(id: string) {
            const res = await service({
                path: "/api/services/app/TestQuestion/DeleteTestQuestion",
                method: "delete",
                query: { id: id }
            })

            this.GetAllTestQuestion(this.outlineId)
        },

        // 添加小题
        async getSubtopic(id: any) {
            const res = await service({
                path: "/api/services/app/Question/AddQuestion",
                query: {
                    outline: this.outlineId,
                    TestQuestionId: id
                },
                method: "post"
            })
            this.examination.forEach(item => {
                if (item.id == id) {
                    item.question.push({
                        id: res.result.id,
                        testQuestionId: id,
                        titleNum: 0,
                        score: 0,
                        courseObjectiveId: ""
                    })
                }
            })
        },
        // 修改小题
        async UpdateQuestion(val: any) {
            const res = await service({
                path: "/api/services/app/Question/UpdateQuestion",
                data: val,
                method: "put"
            })
        },
        // 删除小题
        async DeleteQuestion(id: string, row: string) {
            const res = await service({
                path: "/api/services/app/Question/DeleteQuestion",
                method: "delete",
                query: { id: id }
            })
            this.GetAllTestQuestion(this.outlineId)
            // 如果删除最后一个小题，则删除大题
            // this.examination.forEach((item) => {
            //     if (item.id == row) {
            //         if (item.question.length == 1) {
            //             this.DeleteTestQuestion(row)
            //         }
            //     }
            // });
        },
        // 大纲是否完整
        async CheckOutline() {
            const res = await service({
                path: "/api/services/app/Outline/CheckOutline",
                method: "post",
                query: { outlineId: this.outlineId }
            })
            ElMessage({
                message: res.result.message,
                type: "success"
            })

        },
        leavePage(router: any) {

            if (router !== "/outline/addoutline") {
                console.log(11111111111111111111);

                this.outlineName = ''
                this.outlineId = ""
                this.formationTable = []
                this.contrastList = []
                this.targetList = []
                this.weightDate = []
                this.courseList = []
                this.quantity = ''
                this.examination = []
            }

        }

    }
})