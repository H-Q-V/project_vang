<template>
  <div
    class="flex flex-col justify-center items-center border-1 border-[#ccc] pt-10 px-10 rounded-[10px]"
  >
    <h1 class="text-3xl font-bold">Đăng nhập</h1>
    <div class="flex flex-col gap-3 m-3">
      <form-field label="Email">
        <InputText></InputText>
      </form-field>
      <form-field label="Mật khẩu">
        <!-- <InputText></InputText> -->
        <Password v-model="dataLogin.password" toggleMask :feedback="false" />
      </form-field>
    </div>
    <div class="flex flex-col mt-5">
      <Button type="submit" label="Đăng nhập" class="bg-primary" />
      <b class="block h-[1px] bg-[#ccc] my-3"></b>
      <Button
        type="submit"
        label="Đăng nhập với google"
        class="bg-primary"
        icon="pi pi-google"
        @click="loginGoogle"
      />
    </div>
    <div class="w-full mt-5 flex justify-center mb-3">
      <div class="m-0 flex">
        Bạn chưa có tài khoản,
        <p
          class="ml-2 text-dec underline decoration-1 cursor-pointer text-[primary]"
          @click="nextRoute"
        >
          Đăng kí ngay
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Divider from "primevue/divider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FormField from "../../components/FormField.vue";
import Password from "primevue/password";

const router = useRouter();

const dataLogin = ref({
  email: "",
  password: "",
});

const loginGoogle = async () => {
  window.location.href = `${import.meta.env.VITE_BE_URL}/auth/google`;
};

const nextRoute = () => {
  router.push({ name: "register" });
};

onMounted(async () => {});
</script>

<style scoped></style>
