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
        ref="formCreateItem"
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
          :label="helpTextCreate"
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
          <el-button type="primary" @click="submitForm(formCreateItem)">
            создать
          </el-button>
          <el-button @click="resetForm(formCreateItem)">
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
            <el-button type="warning" @click.prevent="editMenuDialogShow(scope.row)">
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
    <client-only>
      <el-dialog v-model="dialogEditMenuItem" title="Shipping address">
        <el-form
          ref="formEditItem"
          label-position="top"
          :model="formEditNavItem"
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
            <el-select v-model="formEditNavItem.type" placeholder="Выберите тип меню" :style="{width: '100%'}">
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
              v-model.number="formEditNavItem.name"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            :label="helpTextEdit"
            prop="nameSection"
            :rules="[
              { required: true, message: 'поле обязательно для заполнения' },
              { type: 'string', message: 'заполните поле строкой' },
            ]"
          >
            <el-input
              v-model.number="formEditNavItem.nameSection"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditMenuItem = false">
              отмена
            </el-button>
            <el-button type="primary" @click="editMenuItemSave(formEditItem)">
              сохранить изменения
            </el-button>
          </span>
        </template>
      </el-dialog>
    </client-only>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { MenuItem } from '~/components/layouts/AppHeader.vue'

// форма для валидации ref for create item
const formCreateItem = ref<FormInstance>()

let idx = 1

interface INavItem {
  type: string,
  name: string,
  nameSection: string
}

// данные для отправки на сервер
const menuValidateForm: INavItem = reactive({
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

const generateHelpText = (typeItem: string | ''): string => {
  switch (typeItem) {
    case 'eventName':
      return 'сюда пишем название секции куда будем скролить на английском'
    case 'pageItem':
      return 'сюда пишем название страницы куда будем переходить'
    case 'absolutLink':
      return 'сюда пишем абсолютную ссылку для перезода на сторонную страницу'
    default:
      return 'сюда пишем название секции куда будем скролить на английском'
  }
}

// подсказка для лейбла инпута при создании
const helpTextCreate = computed<string>(() => {
  return generateHelpText(menuValidateForm.type)
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

// delete item
const deleteMenuItem = (row: MenuItem) => {
  console.log(row.id)
  // navData.splice(index, 1)
}

// получение элементов меню с сервера
// https://nuxt.com/docs/api/composables/use-fetch подробная инфа
// const { pending, data: posts } = await useLazyFetch('/api/posts')

// модалка для редактирования элементов меню
const dialogEditMenuItem = ref(false)

// форма для валидации ref for create item
const formEditItem = ref<FormInstance>()

// данные для редактирования в модалке
const formEditNavItem: INavItem = reactive({
  type: '',
  name: '',
  nameSection: ''
})

// edit nav
const editMenuDialogShow = (row: INavItem):void => {
  console.log(row)
  dialogEditMenuItem.value = true
  formEditNavItem.name = row.name
  formEditNavItem.nameSection = row.nameSection
  formEditNavItem.type = row.type
}

// отправка на сервер чтобы внедрить изменения по меню
const editMenuItemSave = async (formEl: FormInstance | undefined):Promise<void> => {
  console.log('editMenuItemSave')
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log('formEditNavItem: ', formEditNavItem)
      // после отправки на сервер закрываем окно
      dialogEditMenuItem.value = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// подсказка для лейбла инпута при редактировании в модалке
const helpTextEdit = computed<string>(() => {
  return generateHelpText(formEditNavItem.type)
})

</script>

<style lang="scss" module>
.help {
  margin: 2rem 0;
}
</style>
