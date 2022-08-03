import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import { createHtmlPlugin } from "vite-plugin-html"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import * as path from "path"

// https://vitejs.dev/config/
export default ({ mode }) => {
	const ENV = loadEnv(mode, "./env")
	return defineConfig({
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: ENV.VITE_APP_NAME
					}
				}
			}),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "src/icons")],
				// Specify symbolId format
				symbolId: "icon-[dir]-[name]"
				/**
				 * custom insert position
				 * @default: body-last
				 */
				//  inject?: 'body-last' | 'body-first'

				/**
				 * custom dom id
				 * @default: __svg__icons__dom__
				 */
				//  customDomId: '__svg__icons__dom__',
			})
		],

		envDir: "./env",

		css: {
			preprocessorOptions: {
				scss: {}
			}
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@api": path.resolve(__dirname, "./src", "./api")
			}
		},
		server: {
			port: 8088,
			open: true,
			hmr: true, //禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。
			proxy: {
				"^/apiservice": {
					target: "http://101.133.234.110:10203",
					changeOrigin: true,

					// rewrite: path => path.replace(/^\/api/, '')
				}
			}
		},

		build: {
			outDir: "dist",
			assetsDir: "assets"
		}
	})
}
