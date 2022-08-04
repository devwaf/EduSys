<script lang="ts" setup>
import { reactive, computed, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { usePageStore } from "../store/page"
import { getMenuList } from "../utils/menu"
const pageStore = usePageStore()
let menuList = reactive(getMenuList(pageStore.pages))
console.log(menuList, 777777)

let route = useRoute()
let activeName = ref(route.path)
let showDom = ref(true)
const router = useRouter()
watch(route, r => {
	activeName.value = r.path.toLocaleLowerCase()
})

const activeSub = computed(() => {
	let index = menuList.findIndex(menu => menu.path.toLocaleLowerCase() == activeName.value)
	if (index > -1) return menuList[index].path
	let subPath = ""

	menuList.forEach(menu => {
		if (menu.hasOwnProperty("children") && menu.children.length > 0) {
			menu.children.forEach(c => {
				if (c.path.toLocaleLowerCase() == activeName.value) subPath = menu.path
			})
		}
	})
	return subPath
})

let showSub = ref([])

const switchSub = menu => {
	let index = showSub.value.indexOf(menu.path)
	if (index > -1) {
		showSub.value.splice(index, 1)
		return
	}
	showSub.value.push(menu.path)
	setTimeout(() => {
		let dom = document.querySelector(`.sub-content-animate[data-id=${menu.name}]`)
		dom.className = "sub-content-animate"
		dom = null
	}, 80)
}
const to = (path: any) => {
	console.log(path, "跳转")
	if (path == "/Course") {
		path = "/course/administration"
	}
	if (path == "/Outline") {
		path = "/outline/addoutline"
	}
	if (path == "/Curriculum") {
		path = "/curriculum/fill"
	}
	if (path == "/Examination") {
		path = "/examination/releasetask"
	}
	if (route.name != path) router.push(path)
}
const too = (path: any) => {
	console.log(path, "77777777777777")
}
</script>

<template>
	<div class="asider-menu">
		<div class="menu-content">
			<div
				class="menu-item"
				:class="{ 'menu-sub-item': Object.hasOwnProperty('children') }"
				v-for="(menu, eIndex) in menuList"
				:key="eIndex"
			>
				<template v-if="menu.children.length > 0">
					<div
						class="sub-item-lable"
						:class="{
							'is-active': activeSub == menu.path || activeName == menu.path
						}"
						@click.stop="switchSub(menu)"
					>
						<!-- @click="to(menu.path)" -->
						<svg class="icon home-icon" aria-hidden="true">
							<use :xlink:href="menu.icon" />
						</svg>
						<span class="label-text"> {{ menu.label }} </span>
						<svg-icon
							:icon="showSub.includes(menu.path) ? 'arrow-up' : 'arrow-down'"
							color="#fff"
						></svg-icon>
					</div>
					<div
						class="sub-content-animate"
						:data-id="menu.name"
						:class="showSub.includes(menu.path) ? 'active' : 'close'"
					>
						<div class="sub-item" :key="index + 'sub-menu'" v-for="(sub, index) in menu.children">
							<div
								class="menu-inner"
								:class="{ isActive: sub.path == activeName }"
								@click.stop="to(sub.path)"
							>
								<svg-icon :icon="sub.icon" class="sub-svg" />
								{{ sub.label }}
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div
						class="menu-inner"
						:class="{ 'is-active': menu.path == activeName }"
						@click.stop="to(menu.path)"
					>
						<svg class="icon home-icon" aria-hidden="true">
							<use :xlink:href="menu.icon" />
						</svg>
						{{ menu.label }}
					</div>
				</template>
			</div>
		</div>

		<!-- <el-menu
      active-text-color="#79bbff"
      class="el-menu-vertical-demo"
      :default-active="activeName"
      text-color="#337ecc"
      router
      @close="to"
    >
      <template v-for="(menu, eIndex) in menuList">
        <el-sub-menu
          :index="menu.path"
          :key="eIndex"
          v-if="menu.children.length > 0"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span @click="too">{{ menu.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="sub.path"
              :key="index + 'sub-menu'"
              v-for="(sub, index) in menu.children"
              @close="to"
            >
              {{ sub.label }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item :index="menu.path" :key="eIndex + 'menu'" v-else>
          <el-icon><icon-menu /></el-icon>
          <span>{{ menu.label }}</span>
        </el-menu-item>
      </template>
    </el-menu> -->
		<!-- <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      router
      @close="to"
      @open="handleOpen"
    >
      <template v-for="(menu, eIndex) in menuList">
        <el-sub-menu
          :index="menu.path"
          :key="eIndex"
          v-if="menu.children.length > 0"
        >
          <template #title>
            <svg class="icon home-icon" aria-hidden="true">
              <use :xlink:href="menu.icon" />
            </svg>
            <span>{{ menu.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="sub.path"
              :key="index + 'sub-menu'"
              v-for="(sub, index) in menu.children"
              @close="to"
            >
              <svg-icon :icon="sub.icon" class="sub-svg" />
              {{ sub.label }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item :index="menu.path" :key="eIndex + 'menu'" v-else>
          <svg class="icon home-icon" aria-hidden="true">
            <use :xlink:href="menu.icon" />
          </svg>
          <span @click="too">{{ menu.label }}</span>
        </el-menu-item>
      </template>
    </el-menu> -->
	</div>
</template>

<style lang="scss" scoped>
.asider-menu {
	width: 200px;
	height: 100%;
	padding: 10px 0;
	padding-bottom: 80px;
	overflow-y: auto;
	overflow-x: hidden;
	background-color: #565858;
	box-sizing: border-box;
	.menu-content {
		color: #fff;
		font-size: 15px;
		.menu-inner,
		.sub-item-lable {
			display: flex;
			align-items: center;
			height: 56px;
			line-height: 56px;
			text-align: left;
			padding-left: 26px;
			cursor: pointer;
			user-select: none;
			// &:hover {
			//   background-color: #2ebba3;
			//   color: #f9f9f9;
			// }
			&.is-active {
				padding-left: 21px;
				background: rgba(46, 187, 163, 0.6);
				border-left: 5px solid #2ebaa2;
			}
		}

		.sub-item {
			.menu-inner {
				padding-left: 50px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.isActive {
				color: #2ebba3;
			}
		}

		.sub-item-lable {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.label-text {
				flex: 1;
				height: 56px;
				line-height: 56px;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.svg-icon {
				width: 20px;
				height: 20px;
				padding: 10px;
			}
		}
		.sub-content-animate {
			transition: all 0.1s linear;
			&.active {
				max-height: 300px;
			}
			&.close {
				max-height: 0;
				overflow: hidden;
			}
		}
	}
	.sub-svg {
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
	:deep(.el-menu) {
		user-select: none;
		border: 0;
		background-color: #565858;
		.el-menu-item {
			color: #fff;
			background-color: #2ebaa2;
		}
		.el-menu-item:hover {
			color: #fff;
			background-color: #2ebba3;
		}
		.is-active {
			color: #fff;
			background-color: #2ebba3;
		}

		.el-sub-menu__title {
			color: #fff !important;
		}
		// .el-sub-menu__title:hover {
		//   background-color: #2ebba3;
		// }
		.el-menu--inline .el-menu-item-group .el-menu-item {
			padding-left: 70px;
		}
		.el-menu-item-group.el-menu-item.is-active {
			background-color: #565858;
			color: #2ebba3;
		}
	}
}
.home-icon {
	width: 24px;
	height: 24px;
	margin-right: 10px;
}
.sub-icon {
	width: 14px;
	height: 14px;
	margin-right: 10px;
}
.asider-menu::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
.asider-menu::-webkit-scrollbar-track {
	background-color: transparent;
}
.asider-menu::-webkit-scrollbar-thumb {
	background-color: #9ca0a0;
	border-radius: 10px;
}
</style>
