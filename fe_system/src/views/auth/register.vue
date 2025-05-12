<template>
  <div
    class="flex flex-col justify-center items-center border-1 border-[#ccc] pt-10 px-10 rounded-[10px]"
  >
    <h1 class="text-3xl font-bold">Đăng kí tài khoản</h1>
    <div class="flex flex-col gap-3 m-3">
      <div class="w-full flex justify-center relative">
        <!-- <Avatar :image="avatar" class="mr-2" size="xlarge" shape="circle" /> -->
        <div
          class="flex items-center justify--center overflow-hidden rounded-[50px]"
        >
          <img
            style="width: 70px; height: 70px; object-fit: cover"
            :src="avatar"
            width="50px"
            alt=""
          />
        </div>
        <label
          for="upload"
          class="absolute top-0 right-[85px] !bg-[#1196c8] text-white rounded-[50px] px-2 py-1"
          ><i class="pi pi-pen-to-square text-[12px]"></i
        ></label>
        <input @change="handleFile" id="upload" class="hidden" type="file" />
      </div>
      <form-field label="Email">
        <InputText v-model="dataRegister.email"></InputText>
      </form-field>
      <form-field label="Tên đăng nhập">
        <InputText v-model="dataRegister.name"></InputText>
      </form-field>
      <div class="w-full flex">
        <form-field label="Mật khẩu">
          <Password
            v-model="dataRegister.password"
            @keypress="preventSpace"
            toggleMask
          />
        </form-field>
      </div>
      <div class="w-full flex">
        <form-field label="Nhập lại mật khẩu">
          <Password
            v-model="returnPass"
            @keypress="preventSpace"
            toggleMask
            :feedback="false"
          />
        </form-field>
      </div>
      <!-- <form-field label="Vai trò">
        <Select
          v-model="dataRegister.role"
          :options="roles"
          optionLabel="name"
          optionValue="value"
          placeholder="Lựa chọn vai trò"
          class="w-full"
        />
      </form-field> -->
      <div class="flex flex-col items-center justify-center mt-5 w-full gap-2">
        <form-field label="Xác thực email">
          <!-- <InputText v-model="dataRegister.email"></InputText> -->
          <InputOtp v-model="dataRegister.otp" integerOnly />
        </form-field>
        <Button label="Gửi mã"></Button>
      </div>
    </div>
    <div class="flex flex-col mt-5 w-full">
      <Button
        @click="submit"
        type="submit"
        label="Đăng kí"
        class="bg-primary"
      />
      <b class="block h-[1px] bg-[#ccc] my-3"></b>
    </div>
    <div class="w-full mt-5 flex justify-center mb-3">
      <div class="m-0 flex">
        Đã có tài khoản,
        <p
          class="ml-2 text-dec underline decoration-1 cursor-pointer text-[primary]"
          @click="nextRoute"
        >
          Đăng nhập
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Divider from "primevue/divider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FormField from "../../components/FormField.vue";
import Password from "primevue/password";
import InputOtp from "primevue/inputotp";
import Select from "primevue/select";
import Avatar from "primevue/avatar";

const router = useRouter();

// const roles = ref([
//   { name: "Giáo viên", value: 0 },
//   { name: "Học sinh", value: 1 },
// ]);

const returnPass = ref("");
const avatar = ref(
  "https://res.cloudinary.com/dn6xdmqbl/image/upload/v1731664045/avatar_user/embmui87itz8o4x1pcih.png"
);

watch(returnPass, (newValue) => {
  console.log(returnPass);
});

const preventSpace = (event) => {
  if (event.key === " ") {
    event.preventDefault();
  }
};

const dataRegister = ref({
  name: "",
  avatar: "",
  email: "",
  password: "",
  otp: "",
});

const handleFile = (event) => {
  const file = event.target.files[0];
  dataRegister.value.avatar = file;
  if (file.type.startsWith("image/")) {
    const imageURL = URL.createObjectURL(file);
    avatar.value = imageURL;
    console.log(imageURL);
  }
};

const nextRoute = () => {
  router.push({ name: "login" });
};

const submit = async () => {
  dataRegister.value.name = dataRegister.value.name.trim();
  dataRegister.value.password = dataRegister.value.password.trim();
  dataRegister.value.email = dataRegister.value.email.trim();
  console.log(dataRegister.value);
};

onMounted(async () => {});
</script>

<style scoped></style>
