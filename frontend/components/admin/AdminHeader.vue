<template>
  <section>
    <h4>Создание элементов меню для хедара</h4>
    <ul :class="$style.help">
      <li>1. Обычные элементы для скрола к секциям</li>
      <li>2. Внешние ссылки</li>
      <li>3. Для перехода на другие страницы приложения</li>
    </ul>
    <el-card class="box-card">
      <h5>Создание элемента меню</h5>
      <el-select v-model="typeMenu" class="m-2" placeholder="выберите тип меню" size="large" :style="{width: '100%'}">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-form
        ref="formRef"
        label-position="top"
        :model="menuValidateForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="название меню"
          prop="name"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.number="menuValidateForm.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="название секции к которому скролим на английском"
          prop="nameSection"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.number="menuValidateForm.nameSection"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">
            создать
          </el-button>
          <el-button @click="resetForm(formRef)">
            сбросить
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

// форма для валидации
const formRef = ref<FormInstance>()

// данные для отправки на сервер
const menuValidateForm = reactive({
  name: '',
  nameSection: ''
})

// валидация и отправка на сервер
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// сбросс формы
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

// выбор типа меню для хедара
const typeMenu = ref('')

const options = [
  {
    label: 'меню со скроллом к секции',
    value: 'Option1'
  },
  {
    label: 'меню ссылка на сторонний ресурс',
    value: 'Option2'
  },
  {
    label: 'меню переход на другую страницу в приложении',
    value: 'Option3'
  }
]
</script>

<style lang="scss" module>
.help {
  margin: 2rem 0;
}
</style>
