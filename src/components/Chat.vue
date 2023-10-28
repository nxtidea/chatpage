<template>
  <div class="chat" ref="currentMessage">
    <div class="profile">
      <img v-if="chat.isAi" src="@/assets/bot.svg" alt="" />
      <img v-else src="@/assets/user.svg" alt="" />
    </div>
    <div class="message" v-html="chat.value">
    </div>
  </div>
</template>
  
<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import MapContainer from "./MapContainer.vue";
const chatmsg = defineProps({
  chat: {
    type: Object || null,
  },
});

const currentMessage = ref(null);


onMounted(async () => {
  await nextTick();
  const div = currentMessage.value;
  div.scrollIntoView({ behavior: "smooth" });
});
</script>
  
<style scoped>
.message:deep(ol) {
  margin-left: 1rem;
}

.message:deep(ul) {
  margin-left: 1rem;
}
</style>