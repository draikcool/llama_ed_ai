import { createRouter, createWebHistory, Router } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'

export const routerPath = {
  homePath: '/',
  loginPath: '/login',
  register: '/register'
}

const routes = [
  {
    name: 'home',
    path: routerPath.homePath,
    component: () => HomeView
  },
  {
    name: 'login',
    path: routerPath.loginPath,
    component: () => LoginView
  },
  {
    name: 'register',
    path: routerPath.register,
    component: () => RegisterView
  }
]

export const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

export function openNewTab(path: string) {
  const newTab = window.open(path, '_blank')
  if (newTab) {
    // 新标签页成功打开
    newTab.focus()
  } else {
    // 弹出被阻止，可以尝试提示用户手动打开
    alert('新标签页打开被阻止，请允许弹出窗口后重试')
  }
}
