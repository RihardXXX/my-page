<template>
  <section :class="$style.aboutMe">
    <h4>Создание карточки для секции информация обо мне и пути картинки главного героя</h4>
    <ul :class="$style.help">
      <li>1. Карточки бывают разных типов</li>
      <li>2. Каждый тип карточки для каждой секции мы сами выбираем</li>
      <li>3. Загружаем фото главного героя для секции обо мне</li>
    </ul>

    <el-card class="box-card">
      <h5>Создание карточки обо мне</h5>
      <el-form
        ref="formCreateCard"
        label-position="top"
        :model="cardValidateForm"
        class="demo-ruleForm"
        :disabled="isCards"
      >
        <el-form-item
          label="Выберите тип карточки для секции обо мне"
          prop="type"
          :rules="[ {
            required: true,
            message: 'пожалуйста выберите тип создаваемой карточки',
            trigger: 'change',
          },]"
        >
          <client-only>
            <el-select :key="122" v-model="cardValidateForm.type" :disabled="isLoadingCreateCard" placeholder="Выберите тип карточки" :style="{width: '100%'}">
              <el-option :key="122" label="карточка для секции обо мне" value="cardAboutMe" />
            </el-select>
          </client-only>
        </el-form-item>
        <el-form-item
          label="Приветствие сверху карточки"
          prop="welcome"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.welcome"
            type="text"
            autocomplete="off"
            :disabled="isLoadingCreateCard"
          />
        </el-form-item>
        <el-form-item
          label="Основной текст карточки"
          prop="title"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.title"
            type="text"
            autocomplete="off"
            :disabled="isLoadingCreateCard"
          />
        </el-form-item>
        <el-form-item
          label="Описание карточки"
          prop="description"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.description"
            maxlength="40"
            placeholder="описание карточки"
            show-word-limit
            type="textarea"
            :disabled="isLoadingCreateCard"
          />
        </el-form-item>
        <el-form-item
          label="Название кнопки"
          prop="buttonName"
          :rules="[
            { required: true, message: 'поле обязательно для заполнения' },
            { type: 'string', message: 'заполните поле строкой' },
          ]"
        >
          <el-input
            v-model.trim="cardValidateForm.buttonName"
            type="text"
            autocomplete="off"
            :disabled="isLoadingCreateCard"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoadingCreateCard" @click="submitForm(formCreateCard)">
            создать
          </el-button>
          <el-button :disabled="isLoadingCreateCard" @click="resetForm(formCreateCard)">
            сбросить
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h6>Карточка созданная для секции обо мне</h6>
        </div>
      </template>

      <div v-show="isCards" :class="$style.managedList">
        <el-button class="button" type="warning" :disabled="isLoadingCreateCard || isLoadingGetCard || isLoadingDeleteCard" @click.prevent="editMenuDialogShow()">
          редактировать карточку
        </el-button>
        <el-popconfirm
          confirm-button-text="да"
          cancel-button-text="нет"
          title="Вы действительно хотите удалить карточку в секции обо мне"
          width="400"
          @confirm="deleteCardAboutMe()"
        >
          <template #reference>
            <el-button type="danger" plain :disabled="isLoadingCreateCard || isLoadingGetCard || isLoadingDeleteCard">
              удалить карточку обо мне
            </el-button>
          </template>
        </el-popconfirm>
      </div>

      <el-table v-if="isCards" :data="cardData" border style="width: 100%; margin-top: 1rem">
        <el-table-column prop="key" label="место в карточке" width="300" />
        <el-table-column prop="value" label="значение" />
      </el-table>

      <h6 v-else>
        карточка отсутствует для секции обо мне
      </h6>
    </el-card>

    <el-card class="box-card">
      <h5 style="margin-bottom: 1rem">
        добавить фото
      </h5>

      <el-button type="primary" @click="addFile">
        выбрать фото
      </el-button>

      <el-button class="ml-3" type="success" style="margin-left: 1rem" :disabled="!fileData || isLoadingFileUploadServer" @click="sendFileOnServer">
        отправить на сервер
      </el-button>

      <input ref="file" type="file" style="display: none" @change="onChangeFile">

      <el-text class="mx-1" type="primary" style="margin-left: 2rem">
        формат допустимых файлов: png, jpg, jpeg
      </el-text>

      <el-text v-show="isErrorFileUploadServer" class="mx-1" type="danger" style="margin-left: 2rem">
        формат  файла недопустим
      </el-text>

      <br>

      <h5 style="margin-top: 1rem">
        загруженные на клиент
      </h5>

      <div v-show="fileData" :style="{ display: 'block', marginTop: '2rem' }">
        <el-text type="primary">
          {{ fileData?.name }}
          <el-button type="danger" :icon="Delete" circle @click="clearFileData" />
        </el-text>
      </div>

      <el-divider />

      <h5 style="margin-bottom: 1rem">
        загруженные на сервер
      </h5>


      <el-text v-show="fileServer" type="primary">
        {{ fileServer?.name }}
        <el-button type="danger" :icon="Delete" circle @click="removeFileFromServer(fileServer?.fileId)" />
      </el-text>

      <br>

      <el-image v-show="fileServer?.url" style="width: 100px; height: 100px" :src="`https://drive.google.com/uc?export=view&id=${fileServer?.fileId}`" fit="contain" />

    </el-card>

    <client-only>
      <ModalEditCardForSection
        :id="propsModalEdit.id"
        :is-show-modal="isShowModal"
        :open-close="openClose"
        :refetch-card-for-section="refetchCards"
        :welcome="propsModalEdit.welcome"
        :title="propsModalEdit.title"
        :description="propsModalEdit.description"
        :button-name="propsModalEdit.buttonName"
        :type="propsModalEdit.type"
      />
    </client-only>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  Delete
} from '@element-plus/icons-vue'
import object from 'async-validator/dist-types/validator/object'
import { ICardBase, ICardValidForm } from '~/interfaces'
import { CREATE_CARD_FOR_SECTION, DELETE_CARD_FOR_SECTION } from '~/apollo/mutation'
import { GET_CARD_ABOUT_ME } from '~/apollo/query'
import ModalEditCardForSection, { IEditCard } from '~/components/admin/ModalEditCardForSection.vue'

// форма для валидации ref for create item
const formCreateCard = ref<FormInstance>()
// данные для отправки на сервер
const cardValidateForm: ICardValidForm = reactive({
  type: '',
  title: '',
  welcome: '',
  buttonName: '',
  description: ''
})

const { mutate: createCardForSection, loading: isLoadingCreateCard, onDone: onDoneCreateCard } = useMutation(CREATE_CARD_FOR_SECTION)
const { mutate: deleteCardForSection, loading: isLoadingDeleteCard, onDone: onDoneDeleteCard } = useMutation(DELETE_CARD_FOR_SECTION)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.validate((valid) => {
    if (valid) {
      createCardForSection({
        fields: {
          type: cardValidateForm.type,
          welcome: cardValidateForm.welcome,
          title: cardValidateForm.title,
          description: cardValidateForm.description,
          buttonName: cardValidateForm.buttonName
        } as ICardValidForm
      })

      onDoneCreateCard(() => {
        ElNotification({
          title: 'Внимание',
          message: 'создана карточка для секции обо мне',
          type: 'info'
        })
        refetchCardAboutMe()
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

const { result: resultData, loading: isLoadingGetCard, refetch: refetchCardAboutMe } = useQuery(GET_CARD_ABOUT_ME)

const cardAboutMe = computed<ICardBase[] | []>(() => {
  const cards = resultData.value.getCardAboutMe.filter((card: ICardBase) => card.type === 'cardAboutMe')

  return cards.length ? cards : []
})

const isCards = computed<boolean>(() => {
  return !!cardAboutMe?.value.length
})

const deleteCardAboutMe = (): void => {
  const id = cardAboutMe.value[0]._id
  console.log('delete card', id)
  deleteCardForSection({
    deleteCardForSectionId: id
  })

  onDoneDeleteCard(() => {
    refetchCardAboutMe()
  })
}

const cardData = computed<[] | object[]>(() => {
  if (cardAboutMe.value.length) {
    const card = cardAboutMe.value[0]
    return [
      {
        key: 'приветствие сверху карточки',
        value: card.welcome
      },
      {
        key: 'заголовок',
        value: card.title
      },
      {
        key: 'описание в карточке',
        value: card.description
      },
      {
        key: 'текст кнопки',
        value: card.buttonName
      }
    ]
  }
  return []
})

const isShowModal = ref(false)

const openClose = ():void => {
  isShowModal.value = !isShowModal.value
}

const refetchCards = ():void => {
  refetchCardAboutMe()
}

// модалка для карточки
const propsModalEdit = ref<IEditCard>({
  id: '',
  welcome: '',
  title: '',
  description: '',
  buttonName: '',
  type: ''
})

// edit nav
const editMenuDialogShow = ():void => {
  const card = cardAboutMe.value[0]

  propsModalEdit.value.id = card._id
  propsModalEdit.value.title = card.title
  propsModalEdit.value.description = card.description
  propsModalEdit.value.welcome = card.welcome
  propsModalEdit.value.buttonName = card.buttonName
  propsModalEdit.value.type = card.type
  openClose()
}

// добавление файла
const fileData = ref()
const isErrorFileUploadServer = ref<boolean>(false)
const isLoadingFileUploadServer = ref<boolean>(false)
const file = ref<HTMLInputElement | null>(null)

const addFile = ():void => {
  if (!file.value) {
    return
  }
  file.value?.click()
}

const onChangeFile = () => {
  if (file.value?.files?.length === 0) {
    return
  }
  fileData.value = file.value?.files?.[0]
}

const clearFileData = (): void => {
  fileData.value = null
  isErrorFileUploadServer.value = false
}

const sendFileOnServer = async ():Promise<void> => {
  if (!fileData.value) {
    return
  }

  isErrorFileUploadServer.value = false
  const formData = new FormData()
  formData.append('file', fileData.value)
  formData.append('app', 'my-page')
  formData.append('category', 'about-my')

  try {
    isLoadingFileUploadServer.value = true
    const response = await fetch('/files/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (result.status) {
      fileData.value = null
    }
    isLoadingFileUploadServer.value = false
  } catch (e) {
    isErrorFileUploadServer.value = true
    isLoadingFileUploadServer.value = false
    console.log('error sendFileOnServer/fetch', e)
  }
}

const fileServer = ref<{
  url: string,
  name: string,
  fileId: string,
} | null>(null)

// const imgFile = computed<string>(() => {
//   if (fileServer.value?.url) {
//     let reader = new FileReader();
//     reader.readAsDataURL(fileServer.value.url);
//   }
//   return ''
// })

const removeFileFromServer = async (fileId: string | undefined): Promise<void> => {
  console.log('удалить файлы с сервера', fileId)
  try {
    const response = await fetch('/files/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        fileId,
      })
    })
    const result = await response.json()
    console.log('response: ', result)
  } catch (e) {
    console.log('error removeFileFromServer: ', e)
  }
}

const initialFilesGoogleDrive = async (): Promise<void> => {
  try {
    const response = await fetch('/files/getAboutMePhoto')
    const { result } = await response.json()
    fileServer.value = result
  } catch (e) {
    console.log('error initialFilesGoogleDrive: ', e)
  }
}

onMounted(async () => {
  // инициализация файлов загруженных на сервер
  await initialFilesGoogleDrive()
})

</script>

<style lang="scss" module>

.aboutMe {
  width: 100%;
}

.help {
  margin: 2rem 0;
}

.managedList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
