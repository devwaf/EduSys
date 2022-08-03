import { defineStore } from "pinia"
import { service } from "../../../api/service"
import { usePageCurriculum } from "./teacherCurriculum";
import { usePageHomeCourseDesign } from "./courseDesign";
export const usePageHome = defineStore("Home", {
	state: () => {
		return {

		}
	},
	actions: {
		getExamine(router: any) {
			let courseDesign = usePageHomeCourseDesign()
			let curriculum = usePageCurriculum()
			if (router !== '/home2') {
				
				if (courseDesign.examine) {
					courseDesign.outlineName = ''
					courseDesign.courseName = ''
					courseDesign.curriculumList = []
					console.log(11111111111);
					courseDesign.examine=true
					console.log(11111111111111);
					
				}
				if (curriculum.examine) {
					curriculum.curriculumList = []
					curriculum.outlineId = ""
					curriculum.outlineName = ""
					curriculum.courseName = ""
					curriculum.examine=true
					console.log(2222222222222222);
					
				}
			}	
			if(router=="/login"){
				curriculum.examine=true
				courseDesign.examine=true
			}	
			}


		
	}
})
