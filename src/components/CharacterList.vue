<template>
  <Motion is="p" preset="slideVisibleLeft">
    <q-page class="bg-dark q-pa-md">
      <q-input
        v-model="filter"
        :label="t('search')"
        clearable
        debounce="300"
        class="q-mb-md"
        outlined
        dense
        color="cyan"
        input-class="neon-text"
        label-class="neon-text"
      />

      <div v-if="loading" class="text-center q-mt-xl">
        <q-spinner color="cyan" size="lg" />
      </div>

      <transition-group
        v-else
        name="fade"
        tag="div"
        class="row q-col-gutter-md q-row-gutter-md q-mx-xs q-mb-xl q-mt-md"
      >
        <q-card
          v-for="char in characters"
          :key="char.id"
          class="col-xs-6 col-sm-6 col-md-3 col-lg-2 glass-card"
          flat
          bordered
          clickable
          @click="goToCharacter(char.id)"
        >
          <q-img :src="char.image" :alt="char.name" ratio="1" class="glass-img" />
          <q-card-section>
            <div class="text-subtitle1 neon-text text-center q-ma-none q-pa-none">
              {{ char.name }}
            </div>
          </q-card-section>
        </q-card>
      </transition-group>

      <div v-if="!loading" class="q-mt-xl flex justify-center">
        <q-pagination
          v-model="page"
          :max="maxPages"
          max-pages="7"
          boundary-numbers
          direction-links
          color="cyan"
          class="neon-pagination glass-pagination"
        />
      </div>
    </q-page>
  </Motion>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const filter = ref('');
const page = ref(1);
const { t } = useI18n();

const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;

const { result, refetch, loading } = useQuery(GET_CHARACTERS, {
  page: page.value,
  name: filter.value || undefined,
});

const characters = computed(() => result.value?.characters?.results || []);
const maxPages = computed(() => result.value?.characters?.info?.pages || 1);

watch([page, filter], () => {
  void refetch({
    page: page.value,
    name: filter.value || undefined,
  });
});

watch(filter, () => {
  page.value = 1;
});

const goToCharacter = async (id: string) => {
  await router.push({ name: 'CharacterDetail', params: { id } });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.bg-dark {
  background-color: #0a0a0a;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.glass-card {
  background: rgba(0, 255, 255, 0.12);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.25);
  box-shadow: 0 0 10px #00fff7;
  border-radius: 12px;
  transition: transform 0.3s ease;
  margin-bottom: 20px;
  cursor: pointer;
}

.glass-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px #00fff7;
}

.glass-img {
  border-radius: 16px;
  box-shadow: 0 0 15px #00fff7;
  transition: box-shadow 0.3s ease;
}

.glass-img:hover {
  box-shadow: 0 0 25px #00fff7;
}

.neon-text {
  color: #00fff7;
  text-shadow:
    0 0 6px #00fff7,
    0 0 12px #00fff7;
}

.glass-pagination {
  background: rgba(0, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-pagination:hover {
  box-shadow: 0 0 25px #00fff7;
}

.q-pagination .q-btn {
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
}

.q-pagination .q-btn:focus,
.q-pagination .q-btn--active {
  background: rgba(0, 255, 255, 0.25) !important;
  box-shadow: 0 0 12px #00fff7;
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
