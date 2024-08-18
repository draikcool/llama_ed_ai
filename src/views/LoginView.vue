<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">登录</h2>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="loginForm"
        label-width="auto"
        status-icon
        class="login-form"
      >
        <el-form-item prop="username" label="帐号">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            class="input-with-background"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            class="input-with-background"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="bottom-button">
          <el-button type="info" @click="forgetPassword">忘记密码？</el-button>
          <el-button type="success" @click="goToRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routerPath } from '@/router/index'
import request from '@/utils/request/request'
import { UserData } from '@/types/user'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCard,
  FormRules,
  FormInstance,
  ElMessage
} from 'element-plus'

interface LoginFrom {
  username: string
  password: string
}

interface LoginResponse {
  code: number
  message: string
  data: UserData
}

export default defineComponent({
  displayname: 'LoginView',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElCard
  },
  setup() {
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const loginForm = reactive<LoginFrom>({
      username: '',
      password: ''
    })

    const rules = reactive<FormRules<LoginFrom>>({
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 6, message: '昵称长度必须大于6', trigger: 'blur' },
        { max: 16, message: '昵称长度必须小雨16', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 4, message: '密码长度必须大于4', trigger: 'blur' },
        { max: 20, message: '密码长度必须小于20', trigger: 'blur' }
      ]
    })

    const handleLogin = () => {
      request({
        url: 'api/token/login',
        method: 'post',
        data: {
          nickname: loginForm.username,
          pwd: loginForm.password
        }
      })
        .then((res) => {
          let login = res as LoginResponse
          if (login.code == 0) {
            ElMessage.success('登录成功')
            localStorage.setItem('userInfo', JSON.stringify(login.data))
            router.push(routerPath.homePath)
          } else {
            ElMessage.error(login.message)
          }
          console.log(typeof res)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const forgetPassword = () => {
      console.log('忘记密码的逻辑将在这里处理')
    }

    const goToRegister = () => {
      router.push(routerPath.register)
      console.log('注册的逻辑将在这里处理')
    }

    return {
      loginForm,
      rules,
      handleLogin,
      forgetPassword,
      goToRegister
    }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #a8c0ff; /* 从淡蓝色到淡紫色 */
  background-image: linear-gradient(to right, #a8c0ff, #e4b5e1);
}

.login-card {
  width: 400px;
  padding: 20px;
  background: #ffffff; /* 注册框背景颜色 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-with-background .el-input__inner {
  background-color: #eef1f6; /* 输入框背景颜色 */
  border-color: #dcdfe6;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}

/* 可以添加更多的样式调整以满足设计需求 */
</style>
