
<template>
  <Siderbar></Siderbar>
  <div v-if="showInfoForm">
    <InfoForm></InfoForm>
  </div>
  <div id="main_container">
    <ChatContainer></ChatContainer>
    <Inputbar></Inputbar>
  </div>
</template>



<script setup>
import Siderbar from "@/components/Sidebar.vue";
import ChatContainer from "@/components/ChatContainer.vue";
import Inputbar from "@/components/InputBar.vue";
import InfoForm from "../components/InfoForm.vue";
import { showInfoForm, currentSession } from "../store";
</script>
