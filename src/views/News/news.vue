<template>
  <div class="">

    <div class="p-2 flex justify-end mx-8 cursor-pointer">
      <NewsForm @closeDialog="makeAnews = false" :open-dialog="makeAnews" :selected-data="selectedNews"></NewsForm>
    </div>

    <div v-if="newsList?.length">
      <div class="font text-2xl">NEWS</div>
      <div class="p-2 flex justify-end mx-8 cursor-pointer">
        <NewsForm @closeDialog="makeAnews = false" :open-dialog="makeAnews" :selected-data="selectedNews"></NewsForm>
      </div>

      <div class="mt-8 row w-1/2">
        <div v-for="(news, index) of newsList" :key="index"
          class="col-md-12 flex flex-col justify-center border m-4 p-4 cursor-pointer mt-4 rounded-lg">
          <div>
            <div class="font-bold mb-4 border-b-4">{{ news.newsData.title }}</div>
            <div v-html="news.newsData.description" class=""></div>
            <img v-if="news.newsData.photo" :src="`http://127.0.0.1:8080/ipfs/${news.newsData.photo}`"
              class="rounded-lg h-64 "></img>
            <div class="flex justify-between m-4">
              <div class="flex">
                <!-- <div><svg-icon :name="'dislike'" class="icon cursor-pointer" color="#020202"></svg-icon></div> -->
                <div>{{ news.timestamp }}</div>
              </div>
              <div class="flex space-x-4">
                <div @click="editNews(news)" class="rounded-lg flex items-center cursor-pointer hover:shadow p-2">
                  <svg-icon name="edit" height="h-5" width="w-5" class="mr-1" color="#0D1042"></svg-icon>
                </div>
                <!-- <div @click="deleteNews(news.NewsId) "  class="rounded-lg flex items-center cursor-pointer hover:shadow p-2">
                          <svg-icon name="delete" height="h-5" width="w-5" class="mr-1" color="#a91926"></svg-icon>
                        </div> -->
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="!newsList?.length" class="h-full flex items-center justify-center text-center p-2">
      <span class="font-semibold text-base">NO NEWS PUBLISHED</span>
    </div>

  </div>
</template>


<script setup>
import NewsForm from '@/views/News/NewsForm.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import SvgIcon from "@/components/shared/SvgIcon.vue";
import { getSignerContract } from '../../scripts/ContractUtils';
import { useAlphaConnectStore } from "@/store/index.js";
import { storeToRefs } from "pinia";

const alphaConnectStore = useAlphaConnectStore();
let { socialMedia_contract } = getSignerContract();
const selectedNews = ref()
const makeAnews = ref(false)
const router = useRouter()
const { getStoreItem } = storeToRefs(alphaConnectStore)

const viewNews = (newsId) => {
  router.push(`/news/${newsId}`)
}

const editNews = (news) => {
  selectedNews.value = news
  makeAnews.value = true
}

const deleteNews = async (newsId) => {
  const deleteNews = await socialMedia_contract.deleteNews(newsId)
  let receipt = await deleteNews.wait()

  console.log(receipt);

  if (receipt?.events[0]?.event == "NewsDeleted")
    window.location.reload()
}

// Define newss as a reactive reference
const news = ref([]);
const props = defineProps(['profileContract'])

const newsList = computed(() => {
  return getStoreItem.value("allNews")
})

onMounted(async () => {

  await alphaConnectStore.loadAllNews();

})
</script>