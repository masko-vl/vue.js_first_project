<template>
    <b-alert show dismissible>
    {{ message }} <b>&rArr;</b>
  </b-alert>
</template>
<script>
export default {
    name:'alert',
    props: {
        show: false,
        message: ""
        },
    
    
}
</script>
