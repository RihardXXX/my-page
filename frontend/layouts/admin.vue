<template>
  <div :class="$style.admin">
    <div class="common-layout">
      <el-container>
        <el-header>
          <h3 :class="$style.title">
            Административная панель
          </h3>
        </el-header>
        <el-divider />
        <slot />
      </el-container>
    </div>
  </div>
</template>;
<script setup lang="ts">
</script>
<style lang="scss" module>
.admin {
  height: 100vh;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

</style>

<style lang="scss" scoped>
.el-divider {
  &--horizontal {
    margin: 0;
  }
}
</style>
