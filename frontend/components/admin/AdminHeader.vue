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
      <el-form
        ref="formRef"
        label-position="top"
        :model="menuValidateForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Выберите тип меню"
          prop="type"
          :rules="[ {
            required: true,
            message: 'пожалуйста выберите тип создаваемого элемента меню',
            trigger: 'change',
          },]"
        >
          <el-select v-model="menuValidateForm.type" placeholder="Выберите тип меню" :style="{width: '100%'}">
            <el-option label="меню со скроллом к секции" value="eventName" />
            <el-option label="меню переход на другую страницу в приложении" value="pageItem" />
            <el-option label="меню ссылка на сторонний ресурс" value="absolutLink" />
          </el-select>
        </el-form-item>
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
          :label="helpText"
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
      <el-table :data="navData" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="name" label="Имя элемента меню" width="200" />
        <el-table-column prop="nameSection" label="Значение элемента меню" width="350" />
        <el-table-column prop="type" label="Тип элемента меню" />
        <el-table-column fixed="right" label="Операции над элементом меню" width="300">
          <template #default="scope">
            <el-button type="warning" @click.prevent="editMenuItem(scope.row)">
              редактировать
            </el-button>
            <el-popconfirm
              confirm-button-text="да"
              cancel-button-text="нет"
              title="Вы действительно хотите удалить элемент меню"
              width="400"
              @confirm="deleteMenuItem(scope.row)"
            >
              <template #reference>
                <el-button type="danger">
                  удалить
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { MenuItem } from '~/components/layouts/AppHeader.vue'

// форма для валидации
const formRef = ref<FormInstance>()

let idx = 1

// данные для отправки на сервер
const menuValidateForm = reactive({
  type: '',
  name: '',
  nameSection: ''
})

// валидация и отправка на сервер
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log('menuValidateForm: ', menuValidateForm)
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

// подсказка для лейбла инпута
const helpText = computed<string>(() => {
  switch (menuValidateForm.type) {
    case 'eventName':
      return 'сюда пишем название секции куда будем скролить на английском'
    case 'pageItem':
      return 'сюда пишем название страницы куда будем переходить'
    case 'absolutLink':
      return 'сюда пишем абсолютную ссылку для перезода на сторонную страницу'
    default:
      return 'сюда пишем название секции куда будем скролить на английском'
  }
})

// меню которые уже созданы и в БД
const navData: Array<MenuItem> = [
  {
    id: idx++,
    name: 'обо мне',
    nameSection: 'aboutMe',
    type: 'eventName'
  },
  {
    id: idx++,
    name: 'блог',
    nameSection: 'blog',
    type: 'pageItem'
  },
  {
    id: idx++,
    name: 'поисковая ссылка',
    nameSection: 'yandex.ru',
    type: 'absolutLink'
  }
]

// edit nav
const editMenuItem = (row: MenuItem) => {
  console.log(row)
  // navData.splice(index, 1)
}

// delete item
const deleteMenuItem = (row: MenuItem) => {
  console.log(row.id)
  // navData.splice(index, 1)
}

// получение элементов меню с сервера
// https://nuxt.com/docs/api/composables/use-fetch подробная инфа
// const { pending, data: posts } = await useLazyFetch('/api/posts')

</script>

<style lang="scss" module>
.help {
  margin: 2rem 0;
}
</style>
