<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import pages from "../router/page"
import AsiderMenu from "./asider.vue"
import Breadcrumb from "../components/Breadcrumb/index.vue"
const whiteList: Array<string | symbol> = [
	"Home",
	"CurriculumDesign",
	"Curriculum",
	"Fill",
	"Graduation",
	"Home2",
	"Course",
	"Administration",
	"CourseManagement",
	"Outline",
	"AddOutline",
	"OutlineManagement",
	"CourseDesign",
	"OutlineConfig",
	"CourseDesignConfig",
	"CorrectionReplyForm",
	"CDFormCenter",
	"CDPrint",
	"Examination",
	"ReleaseTask",
	"PublishedTask",
	"TaskCorrect",
	"ETFormCenter",
	"ETPrint",
	"GraduationDesign"
]
const currentRoute = useRoute()
const crumbList = ref([])
const crumbData = ref([])

let aliveFlag = computed(() => {
	crumbcance({ path: currentRoute.path, name: currentRoute.meta.title })
	return whiteList.includes((currentRoute && currentRoute.name) || "")
})
let routePages = {},
	k: string
const initPages = () => {
	for (k in pages) {
		let path = k.toLowerCase()
		routePages[path] = {
			title: pages[k].meta.title,
			path: path
		}
	}
}
initPages()
const crumbcance = ({ path, name }) => {
	crumbData.value = []
	let paths = path.split("\/").filter(f => f != "")
	paths.forEach((p: String) => {
		p = p.toLowerCase()
		if (routePages[p]) crumbData.value.push(routePages[p])
	})
	if (crumbData.value.length == 1) {
		if (crumbData.value[0].path == "home" || crumbData.value[0].path == "curriculum" || crumbData.value[0].path == "coursedesign" || crumbData.value[0].path == "examination") {
			crumbData.value = []
		}
	}
}
</script>

<template>
	<div class="layout-content">
		<AsiderMenu class="float-left" />
		<div class="layout-main-content float-left">
			<div class="main-content">
				<Breadcrumb :data="crumbData" v-if="crumbData.length" />
				<router-view v-if="aliveFlag"></router-view>
				<router-view v-else v-slot="{ Component }">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</router-view>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.layout-content {
	display: flex;
	height: calc(100%);
	.layout-main-content {
		margin: 12px 0 0 15px;
		width: calc(100% - 210px);
		height: calc(100% - 60px);
		overflow-x: auto;
		overflow-y: hidden;
		.main-content {
			min-width: 1340px;
		}
		.main {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
