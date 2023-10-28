<template>
    <div id="blackmap">
        <!-- <div id="formTitle">新的旅程</div> -->
        <el-form id="formBody" :model="form" label-width="auto">
            <el-form-item label="出发地">
                <el-input v-model="form.beginning" placeholder="从哪里出发？" />
            </el-form-item>
            <el-form-item label="目的地">
                <el-input v-model="form.endding" placeholder="到哪里去？" />
            </el-form-item>
            <el-form-item label="旅行时间">
                <el-date-picker v-model="form.duration" type="daterange" range-separator="到" start-placeholder="开始日期"
                    end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item label="交通方式">
                <el-select v-model="form.transportation">
                    <el-option v-for="transportation in transportations" :label="transportation" :value="transportation" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { currentSession, showInfoForm, journalSessions } from '../store';

// do not use same name with ref
const form = reactive({
    beginning: '',
    endding: '',
    duration: [],
    transportation: '',
})

const onSubmit = () => {
    currentSession.value.info = form
    currentSession.value.info.duration[0] = transformTime(form.duration[0])
    currentSession.value.info.duration[1] = transformTime(form.duration[1])
    showInfoForm.value = !showInfoForm.value
    console.log(journalSessions)
    currentSession.value.name = form.beginning + ' - ' + form.endding

    // fetchAnswer()
}


const transportations = ["飞机", "火车"]

const transformTime = (time) => {
    const date = time;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate
};

const fetchAnswer = async () => {

    const tempSession = journalSessions.find(session => session.focused === true)
    try {
        tempSession.loading = true;
        tempSession.wrapper.push({
            isAi: true,
            value: "正在生成旅行计划....",
        });

        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => {
            controller.abort();
        }, 300000); // 5 minutes in milliseconds

        const res = await fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: tempSession.question,
                info: tempSession.info,
            }),
            signal, // pass the signal option
        });
        const data = await res.json();
        const parsedData = data.bot.trim();
        tempSession.wrapper.pop();
        tempSession.wrapper.push({
            isAi: true,
            value: parsedData,
        });
    } catch (error) {
    } finally {
        tempSession.loading = false;
    }
};

</script>

<style scoped>
#blackmap {
    background-color: rgba(114, 114, 114, 0.485);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    max-width: 1280px;
    margin: 0 auto 1rem;
    border-radius: 0.5rem;
    padding: 10px;
    background: #E1E9EC;
}
</style>