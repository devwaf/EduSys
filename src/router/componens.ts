import Login from "../pages/login/index.vue"
import Register from "../pages/register/index.vue"

// 学生
import Home from "../pages/home/index.vue"
import Curriculumdesign from "../pages/CurriculumDesign/index.vue"
import Curriculum from "../pages/curriculum/index.vue"
import Fill from "../pages/curriculum/fill/index.vue"
import Graduation from "../pages/graduation/index.vue"

// 教师
import Home2 from "../pages/home1/index.vue"
// import Teacher from "../pages/teacher/index.vue"
// 2.课程配置
import Course from "../pages/teacher/course/administration/index.vue" //课程配置
import Administration from "../pages/teacher/course/administration/index.vue" // 课程管理
import Coursemanagement from "../pages/teacher/course/management/index.vue" // 新建课程

// 3.课程大纲配置
import Outline from "../pages/teacher/outline/index.vue" //课程大纲配置
import Addoutline from "../pages/teacher/outline/index.vue" // 新建大纲
import Outlinemanagement from "../pages/teacher/outline/management/index.vue" // 大纲管理

// 4.课设
import Coursedesign from "../pages/teacher/courseDesign/index.vue" // 课设中心
import Coursedesignconfig from "../pages/teacher/courseDesign/courseDesignConfig/index.vue" // 课设配置
import Outlineconfig from "../pages/teacher/courseDesign/outlineConfig/index.vue" // 大纲配置
import Correctionreplyform from "../pages/teacher/courseDesign/correctionReplyForm/index.vue" // 批改答辩记录表
import Cdformcenter from "../pages/teacher/courseDesign/formCenter/index.vue" // 表单中心
// import Cdprint from "../pages/teacher/courseDesign/print/index.vue" // 打印

// 5.笔试、机试
import Examination from "../pages/teacher/examination/index.vue" // 笔试 / 机试中心
import Releasetask from "../pages/teacher/examination/releaseTask/index.vue" //发布作业
import Publishedtask from "../pages/teacher/examination/releaseTask/publishedTask/index.vue" //已发布作业
import Taskcorrect from "../pages/teacher/examination/taskCorrect/index.vue" // 批改作业
import Etformcenter from "../pages/teacher/examination/formCenter/index.vue" //表单中心
// import Etprint from "../pages/teacher/examination/print/index.vue" //打印

// 6.毕业设计
import Graduationdesign from "../pages/teacher/graduationDesign/index.vue"

const Components = {
	Login,
	Register,

	// 学生
	Home,
	Graduation,
	Curriculumdesign,
	Curriculum,
	Fill,

	// 教师
	Home2,
	// 课程配置

	Course,
	Administration,
	Coursemanagement,

	// 课程大纲配置
	Outline,
	Addoutline,
	Outlinemanagement,

	// 课设
	Coursedesign,
	Coursedesignconfig,
	Outlineconfig,
	Correctionreplyform,
	Cdformcenter,
	// Cdprint,

	Examination,
	Releasetask,
	Publishedtask,
	Taskcorrect,
	Etformcenter,
	// Etprint,

	Graduationdesign
}

export default Components
