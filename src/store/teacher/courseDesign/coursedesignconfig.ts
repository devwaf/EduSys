import { defineStore } from 'pinia'
import { service } from "@/api/service"
import { usePageCard } from '../course/card'
import { ElMessage } from "element-plus"
export const usePageCurriculumInstall = defineStore("curriculumInstall", {
    state: () => {
        return {
            outlineSelect: [], //所有课设大纲
            semesterList: [], //开课学期
            curriculumInstallFormData: {
                classIds: [],
                name: "",
                type: "",
                teacherId: localStorage.getItem('userId'),
                outlineId: "",
                supervisor: '',
                outlineName: '',
                semester: "",
                credit: null,
                classDuration: null,
                textDuration: null,
                department: "",
                kind: "课设"
            },
            id: '',
            arrList: null,

        }
    },
    actions: {

        // 获取详情
        async getId(id: any) {
            this.id = id
            console.log(id, '2436');

            const res = await service({
                path: "/api/services/app/Course/GetCourse",
                query: { id: this.id },
            });

            if (res.success) {
                this.curriculumInstallFormData = res.result
                let card = usePageCard()

                card.selectedList = []
                this.curriculumInstallFormData.classIds.forEach(i => {
                    card.classList.forEach(item => {
                        if (i == item.id) {
                            item.checked = true
                            card.selectedList.push({
                                id: item.id,
                                schoolYear: item.schoolYear,
                                major: item.major,
                                name: item.name
                            })
                        }
                    })


                })

            }

        },


        //    获取所有课设大纲的下拉框
        async GetAllDesignSelect() {
            const res = await service({
                path: "/api/services/app/Outline/GetAllDesignSelect",
                query: {
                    teacherId: localStorage.getItem("userId"),
                    method: "get"
                }
            })

            this.outlineSelect = res.result
        },
        async GetTerm() {
            const res = await service({
                path: "/api/services/app/Course/GetTerm",
                query: {
                    teacherId: localStorage.getItem("userId"),

                }
            })
            this.semesterList = res.result
        },


        // 获取选择的班级
        getClass() {
            const card = usePageCard()
            console.log(card.selectedList, '9999999999');
            this.curriculumInstallFormData.classIds = []
            card.selectedList.forEach(async (item) => {
                this.curriculumInstallFormData.classIds.push(item.id)
            })
        },

        getOutlineName(id: any) {
            this.outlineSelect.forEach(item => {
                if (item.value == id) {
                    this.curriculumInstallFormData.outlineName = item.label
                }
            })
        },

        // 发布
        async AddCourse() {
            if (this.id) {

                const res = await service({
                    path: "/api/services/app/Course/UpdateCourse",
                    data: this.curriculumInstallFormData,
                    method: "put",
                });
                if (res.success) {
                    ElMessage({
                        message: res.result.message,
                        type: "warning"
                    })
                    // this.curriculumInstallFormData = []
                }
            } else {
                // this.curriculumInstallFormData.teacherId = localStorage.getItem('userId')
                const res = await service({
                    path: "/api/services/app/Course/AddCourse",
                    data: this.curriculumInstallFormData,
                    method: "post"
                });
                if (res.success) {
                    ElMessage({
                        message: res.result.message,
                        type: "warning"
                    })
                }
            }


            console.log(this.curriculumInstallFormData, '232435');

        },
        leavePage(router: any) {
            console.log(router, 999999);
            if (router !== "/coursedesign/coursedesignconfig") {
                // resetForm()
                this.curriculumInstallFormData = {
                    classIds: [],
                    name: "",
                    type: "",
                    teacherId: localStorage.getItem('userId'),
                    outlineId: "",
                    supervisor: '',
                    outlineName: '',
                    semester: "",
                    credit: null,
                    classDuration: null,
                    textDuration: null,
                    department: "",
                    kind: "课设"
                }
                this.selectedList = []
                const card = usePageCard()
                card.selectedList = []
            }
        }
    }
})