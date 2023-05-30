<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="страница автора сайта">
      <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane label="хедар">
          <AdminHeader />
        </el-tab-pane>
        <el-tab-pane label="обо мне">
          <AdminAboutMe />
        </el-tab-pane>
        <el-tab-pane label="навыки">
          Навыки
        </el-tab-pane>
        <el-tab-pane label="сертификаты">
          Сертификаты
        </el-tab-pane>
        <el-tab-pane label="отзывы">
          Отзывы
        </el-tab-pane>
        <el-tab-pane label="портфолио">
          Портфолио
        </el-tab-pane>
        <el-tab-pane label="контакты">
          Контакты
        </el-tab-pane>
        <el-tab-pane label="футер">
          Футер
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>

    <el-tab-pane label="сервис">
      сервис
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import AdminHeader from '~/components/admin/AdminHeader.vue'
import AdminAboutMe from '~/components/admin/AdminAboutMe.vue'
// This will work in both `<script setup>` and `<script>`
definePageMeta({
  layout: 'admin'
})
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 100vh;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
