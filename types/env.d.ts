/**
 * @name: env.d
 * @author: 黄俊炎
 * @date: 2022-08-09 14:27
 * @description：env.d
 * @update: 2022-08-09 14:27
 */

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BASE_URL: string
  readonly ENV: string
  readonly VITE_PROJECT_NAME: string
  readonly VITE_BASE_PATH: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
