<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">注册</h2>
      <el-form
        ref="ruleFormRef"
        :model="registerForm"
        label-width="auto"
        :rules="rules"
        status-icon
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="帐号" prop="nickname">
          <el-input v-model="registerForm.nickname" placeholder="请输入帐号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input
            v-model="registerForm.college"
            placeholder="请输入学院名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input
            v-model="registerForm.major"
            placeholder="请输入专业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            type="number"
            v-model="registerForm.phone"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="registerForm.email"
            placeholder="请输入有效的邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="register-button"
            @click="handleRegister(ruleFormRef)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import {
  ElMessage,
  ElForm,
  ElInput,
  ElButton,
  ElCard,
  FormRules,
  FormInstance
} from 'element-plus'
import request from '@/utils/request/request'
import { useRouter } from 'vue-router'
import { routerPath } from '@/router/index'
import { UserData } from '@/types/user'

interface RegisterForm {
  username: string
  nickname: string
  password: string
  confirmPassword: string
  college: string
  major: string
  phone: string
  email: string
  channel_id: string
}

interface RegisterResponse {
  code: number
  message: string
  data: UserData
}

export default defineComponent({
  displayname: 'RegisterView',
  components: {
    ElForm,
    ElInput,
    ElButton,
    ElCard
  },
  setup() {
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const registerForm = reactive<RegisterForm>({
      username: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      college: '',
      major: '',
      phone: '',
      email: '',
      channel_id: '2'
    })

    const confirmPasswordValidator = (rule, value, callback) => {
      if (value !== registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    const phoneNumberValidator = (rule, value, callback) => {
      const regex = /^1[3-9]\d{9}$/ // 中国手机号码正则表达式
      if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }

    const rules = reactive<FormRules<RegisterForm>>({
      username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      nickname: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 6, message: '昵称长度必须大于6', trigger: 'blur' },
        { max: 16, message: '昵称长度必须小雨16', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 4, message: '密码长度必须大于4', trigger: 'blur' },
        { max: 20, message: '密码长度必须小于20', trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 4, message: '密码长度必须大于4', trigger: 'blur' },
        { max: 20, message: '密码长度必须小于20', trigger: 'blur' },
        { validator: confirmPasswordValidator }
      ],
      college: [{ required: true, message: '请输入学院名称', trigger: 'blur' }],
      major: [{ required: true, message: '请输入专业名称', trigger: 'blur' }],
      phone: [
        {
          required: true,
          message: '电话号码为空或格式不正确',
          trigger: 'blur'
        },
        { len: 11, message: '手机号码输入格式不对', trigger: 'blur' },
        { validator: phoneNumberValidator }
      ],
      email: [
        { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
      ]
    })

    const handleRegister = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((isValid) => {
        if (isValid) {
          httpUserRegister()
        } else {
          ElMessage.error('请完善信息')
        }
      })
    }

    function httpUserRegister() {
      request({
        url: 'api/token/register',
        method: 'post',
        data: {
          uname: registerForm.username,
          pwd: registerForm.password,
          nickname: registerForm.nickname,
          college: registerForm.college,
          major: registerForm.major,
          phone: registerForm.phone,
          email: registerForm.email,
          channel_id: registerForm.channel_id
        }
      })
        .then((res) => {
          let register = res as RegisterResponse
          if (register.code == 0) {
            ElMessage.success('注册成功，自动登录...')
            localStorage.setItem('userInfo', JSON.stringify(register.data))
            router.push(routerPath.homePath)
          } else {
            ElMessage.error(register.message)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }

    return {
      registerForm,
      rules,
      handleRegister,
      ruleFormRef
    }
  }
})
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #a8c0ff; /* 从淡蓝色到淡紫色 */
  background-image: linear-gradient(to right, #a8c0ff, #e4b5e1);
}

.register-card {
  width: 400px;
  padding: 20px;
  background: #ffffff; /* 注册框背景颜色 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}

.register-button {
  width: 100%;
  margin-top: 10px;
}
</style>
