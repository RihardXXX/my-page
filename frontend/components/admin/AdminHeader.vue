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

      <div :class="$style.managedList">
        <el-button type="success" plain @click="refetch()">
          Обновить список
        </el-button>
        <el-popconfirm
          confirm-button-text="да"
          cancel-button-text="нет"
          title="Вы действительно хотите удалить все элементы списка меню хедара"
          width="400"
          @confirm="deleteAllNavItem()"
        >
          <template #reference>
            <el-button type="danger" plain>
              Удалить все элементы
            </el-button>
          </template>
        </el-popconfirm>
      </div>

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
      <ModalEditNavItem
        :id="propsModalEdit.id"
        :is-show-modal="isShowModal"
        :open-close="openClose"
        :refetch-item-l-ist="refetchItemLIst"
        :type="propsModalEdit.type"
        :name="propsModalEdit.name"
        :name-section="propsModalEdit.nameSection"
      />
    </client-only>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ElNotification } from 'element-plus'
import ModalEditNavItem, { PropsModalEditNavItem } from '~/components/admin/ModalEditNavItem.vue'
import { CREATE_NAV_ITEM, DELETE_NAV_ITEM, DELETE_ALL_NAV_ITEM } from '~/apollo/mutation'
import { GET_MENU_HEADER } from '~/apollo/query'
import { INavItemValidForm } from '~/interfaces'
import { generateHelpText } from '~/utils'
import { INavItem } from "~/interfaces";

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


// инициализация элементов меню
const { result: menuHeaderList, loading: isLoadingMenuHeader, refetch } = useQuery(GET_MENU_HEADER)

const menuNavigationHeader = computed<INavItem[] | []>(() => {
  const menu = menuHeaderList.value.getMenuHeader

  return menu.length ? menu : []
})
// =============

// форма для валидации ref for create item
const formCreateItem = ref<FormInstance>()
// данные для отправки на сервер
const menuValidateForm: INavItemValidForm = reactive({
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
        ElNotification({
          title: 'Внимание',
          message: `создан элемент меню ${menuValidateForm.name}`,
          type: 'info'
        })
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
    ElNotification({
      title: 'Внимание',
      message: `удален элемент меню ${row.name}`,
      type: 'info'
    })
  })
}

const isShowModal = ref(false)
const refetchItemLIst = ():void => {
  refetch()
}

const openClose = ():void => {
  isShowModal.value = !isShowModal.value
}

// модалка для редактирования элементов меню
const propsModalEdit = ref<PropsModalEditNavItem>({
  id: '',
  type: '',
  name: '',
  nameSection: ''
})

// edit nav
const editMenuDialogShow = (row: INavItem):void => {
  openClose()
  propsModalEdit.value.id = row._id
  propsModalEdit.value.type = row.type
  propsModalEdit.value.name = row.name
  propsModalEdit.value.nameSection = row.nameSection
}

const { mutate: deleteAllNav, onDone: onDoneAllNavItem, onError: onErrorNavItem } = useMutation(DELETE_ALL_NAV_ITEM)

// удаление всех элементов списка меню
const deleteAllNavItem = ():void => {
  deleteAllNav()

  onDoneAllNavItem(():void => {
    refetch()
    ElNotification({
      title: 'Внимание',
      message: 'Все элементы меню хедара удалены',
      type: 'info'
    })
  })

  onErrorNavItem((e):void => {
    console.log('error deleteAllNavItem: ', e)
  })
}

</script>

<style lang="scss" module>
.help {
  margin: 2rem 0;
}

.managedList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
