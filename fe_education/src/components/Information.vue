<template>
  <div v-for="exam in dataProfile" :key="exam.id" class="bg-white p-4">
    <div class="flex flex-col items-center mb-6">
      <div class="w-20 h-20 rounded-full overflow-hidden mb-2">
        <img
          :src="exam.image"
          alt="Avatar"
          class="w-full h-full object-cover"
        />
      </div>
      <h2 class="text-lg font-medium">{{ exam.name }}</h2>
    </div>
    <div class="card">
      <Accordion :value="['0']" multiple>
        <AccordionPanel value="0">
          <AccordionHeader>Thông tin</AccordionHeader>
          <AccordionContent>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-6 h-6 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Số điện thoại</div>
                  <div>{{ exam.phone }}</div>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-6 h-6 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Địa chỉ</div>
                  <div>{{ exam.address }}</div>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-6 h-6 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Email</div>
                  <div>{{ exam.email }}</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader>Lịch sử</AccordionHeader>
          <AccordionContent>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500">Tổng số bài làm</div>
                <div class="text-xl font-semibold">
                  {{ exam.totalTests || 0 }}
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500">Điểm trung bình</div>
                <div class="text-xl font-semibold">
                  {{ exam.averageScore || 0 }}
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500">Điểm cao nhất</div>
                <div class="text-xl font-semibold">
                  {{ exam.highestScore || 0 }}
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500">Điểm thấp nhất</div>
                <div class="text-xl font-semibold">
                  {{ exam.lowestScore || 0 }}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import { dataProfile } from "../utils/dataProfile";
</script>
