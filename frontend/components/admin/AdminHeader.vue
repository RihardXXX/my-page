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
          <el-select v-model="menuValidateForm.type" :disabled="isLoadingCreatNavItem" placeholder="Выберите тип меню" :style="{width: '100%'}">
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
            :disabled="isLoadingCreatNavItem"
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
            :disabled="isLoadingCreatNavItem"
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
      <el-table
        v-loading="isLoadingCreatNavItem || isLoadingMenuHeader || isLoadingDeleteNavItem"
        :data="menuNavigationHeader"
        border
        style="width: 100%; margin-top: 20px"
        :element-loading-svg="svg"
        class="custom-loading-svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        empty-text="отсутствуют элементы для хедара, создайте их"
      >
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
import { reactive, ref, computed } from 'vue';
import type { FormInstance } from 'element-plus';
import { useMutation, useQuery } from '@vue/apollo-composable';
// import { MenuItem } from '~/components/layouts/AppHeader.vue';
import { CREATE_NAV_ITEM, DELETE_NAV_ITEM } from '~/apollo/mutation';
import { GET_MENU_HEADER } from '~/apollo/query';

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

// ============== Получение меню навигации для Хедара
interface INavItem {
  __typename: string,
  name: string,
  nameSection: string,
  type: string,
  _id: string
}

// инициализация элементов меню
const { result: menuHeaderList, loading: isLoadingMenuHeader, refetch } = useQuery(GET_MENU_HEADER)

const menuNavigationHeader = computed<INavItem[] | []>(() => {
  return menuHeaderList.value.getMenuHeader
})
// =============

interface IValidForm {
  type: string | '',
  name: string| '',
  nameSection: string | ''
}

// форма для валидации ref for create item
const formCreateItem = ref<FormInstance>()
// данные для отправки на сервер
const menuValidateForm: IValidForm = reactive({
  type: '',
  name: '',
  nameSection: ''
})
// создание и удаление элементов меню
const { mutate: createNavItem, loading: isLoadingCreatNavItem, onDone: onDoneCreate } = useMutation(CREATE_NAV_ITEM)
const { mutate: deleteNavItem, loading: isLoadingDeleteNavItem, onDone: onDoneDelete } = useMutation(DELETE_NAV_ITEM)
// валидация и отправка на сервер
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      createNavItem({
        name: menuValidateForm.name,
        nameSection: menuValidateForm.nameSection,
        type: menuValidateForm.type
      })
      onDoneCreate(() => {
        // обновление состояния меню и стирание инпутов
        refetch()
        formEl.resetFields()
      })
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

// delete item
const deleteMenuItem = (row: INavItem) => {
  deleteNavItem({
    deleteNavItemId: row._id
  })
  onDoneDelete(() => {
    refetch()
  })
}

// модалка для редактирования элементов меню
const dialogEditMenuItem = ref(false)

// форма для валидации ref for create item
const formEditItem = ref<FormInstance>()

// данные для редактирования в модалке
const formEditNavItem: IValidForm = reactive({
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
      console.log('error submit!');
      return false;
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
