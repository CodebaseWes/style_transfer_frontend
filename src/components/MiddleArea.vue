<template>
    <div id="MiddleArea" :class="loading ? 'loading' : null">
        <slot></slot>
    </div>      
</template>
<script>
export default {
  name: 'MiddleArea',
  props: ['loading']
}
</script>
<style scoped>

  #MiddleArea {
    max-width: 500px;
    background: #1c1717bd;
    margin: auto;
    padding: 5%;
    padding-top: 1px;
    height: 100%;
  }

  #MiddleArea.loading {
    max-width: 100%;
    padding-bottom: 0%;
  }

</style>
