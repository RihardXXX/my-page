<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="header">
      <AdminHeader />
    </el-tab-pane>
    <el-tab-pane label="aboutMe">
      <AdminAboutMe />
    </el-tab-pane>
    <el-tab-pane label="skills">
      Навыки
    </el-tab-pane>
    <el-tab-pane label="certificates">
      Сертификаты
    </el-tab-pane>
    <el-tab-pane label="reviews">
      Отзывы
    </el-tab-pane>
    <el-tab-pane label="portfolio">
      Портфолио
    </el-tab-pane>
    <el-tab-pane label="contacts">
      Контакты
    </el-tab-pane>
    <el-tab-pane label="footer">
      Футер
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
