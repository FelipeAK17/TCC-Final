<template>
  <div class="container" v-if="schedules.length !== 0">
    <h1>Agendamento</h1>
    <div class="schedule-list">
      <div class="schedule" v-for="schedule in schedules" :key="schedule.id">
        <p>Cliente</p>
        <p>{{ schedule.client }}</p>

        <p>Endereço</p>
        <p>{{ schedule.address }}</p>

        <p>Celular</p>
        <p>{{ schedule.cellphone }}</p>
        <p>Data</p>
        <p>{{ new Date(schedule.schedule).toLocaleDateString("pt-br") }}</p>
        <p>{{ schedule.hour }}</p>
        <p>Serviço</p>
        <p>{{ schedule.services }}</p>
        <button @click="updateSchedule(schedule.id)">Serviço feito</button>
      </div>
    </div>
  </div>
  <div class="client-container" v-if="permission === false">
    <h1>Você não tem permissão pra acessar essa página.</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ISchedule } from "../interfaces";
import { api } from "../services/api";

export default defineComponent({
  data() {
    return {
      schedules: [] as ISchedule[],
      permission: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.$router.push("/funcionario/login");
    }
    const response = await api.get<ISchedule[]>("/schedule", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 400) {
      this.permission = false;
    } else if (response.status === 200) {
      this.permission = true;
    }
    this.schedules = response.data;
  },
  methods: {
    async updateSchedule(scheduleId: string) {
      try {
        const token = localStorage.getItem("token");
        await api.patch(
          "/schedule/update",
          { scheduleId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await api.get<ISchedule[]>("/schedule", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.schedules.length = 0;
        this.schedules = response.data;
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
});
</script>

<style src="./styles/WorkerSchedule.scss" lang="scss" scoped />
