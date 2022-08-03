import Login from "../pages/login/index.vue"
import Register from "../pages/register/index.vue"

// 学生
import Home from "../pages/home/index.vue"
import CurriculumDesign from "../pages/CurriculumDesign/index.vue"
import Curriculum from "../pages/curriculum/index.vue"
import Fill from "../pages/curriculum/fill/index.vue"
import Graduation from "../pages/graduation/index.vue"

// 教师
import Home2 from "../pages/home1/index.vue"
// import Teacher from "../pages/teacher/index.vue"
// 2.课程配置
import Course from "../pages/teacher/course/administration/index.vue" //课程配置
import Administration from "../pages/teacher/course/administration/index.vue" // 课程管理
import CourseManagement from "../pages/teacher/course/management/index.vue" // 新建课程

// 3.课程大纲配置
import Outline from "../pages/teacher/outline/index.vue" //课程大纲配置
import AddOutline from "../pages/teacher/outline/index.vue" // 新建大纲
import OutlineManagement from "../pages/teacher/outline/management/index.vue" // 大纲管理

// 4.课设
import CourseDesign from "../pages/teacher/courseDesign/index.vue" // 课设中心
import CourseDesignConfig from "../pages/teacher/courseDesign/courseDesignConfig/index.vue" // 课设配置
import OutlineConfig from "../pages/teacher/courseDesign/outlineConfig/index.vue" // 大纲配置
import CorrectionReplyForm from "../pages/teacher/courseDesign/correctionReplyForm/index.vue" // 批改答辩记录表
import CDFormCenter from "../pages/teacher/courseDesign/formCenter/index.vue" // 表单中心
// import CDPrint from "../pages/teacher/courseDesign/print/index.vue" // 打印

// 5.笔试、机试
import Examination from "../pages/teacher/examination/index.vue" // 笔试 / 机试中心
import ReleaseTask from "../pages/teacher/examination/releaseTask/index.vue" //发布作业
import PublishedTask from "../pages/teacher/examination/releaseTask/publishedTask/index.vue" //已发布作业
import TaskCorrect from "../pages/teacher/examination/taskCorrect/index.vue" // 批改作业
import ETFormCenter from "../pages/teacher/examination/formCenter/index.vue" //表单中心
// import ETPrint from "../pages/teacher/examination/print/index.vue" //打印

// 6.毕业设计
import GraduationDesign from "../pages/teacher/graduationDesign/index.vue"

const Components = {
	Login,
	Register,

	// 学生
	Home,
	Graduation,
	CurriculumDesign,
	Curriculum,
	Fill,

	// 教师
	Home2,
	// 课程配置

	Course,
	Administration,
	CourseManagement,

	// 课程大纲配置
	Outline,
	AddOutline,
	OutlineManagement,

	// 课设
	CourseDesign,
	CourseDesignConfig,
	OutlineConfig,
	CorrectionReplyForm,
	CDFormCenter,
	// CDPrint,

	Examination,
	ReleaseTask,
	PublishedTask,
	TaskCorrect,
	ETFormCenter,
	// ETPrint,

	GraduationDesign
}

export default Components
