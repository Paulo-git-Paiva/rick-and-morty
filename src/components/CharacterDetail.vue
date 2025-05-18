<template>
  <q-page class="q-pa-md bg-dark text-white">
    <div class="self-center q-mb-md">
      <q-btn
        :label="t('returnToCharacterSelection')"
        color="cyan"
        flat
        @click="$router.back()"
        class="neon-text"
        style="border: 1px solid #00fff7; border-radius: 8px"
        icon="arrow_back"
      />
    </div>

    <div v-if="character" class="flex flex-center flex-column" v-motion-slide-bottom>
      <q-img
        :src="character.image"
        :alt="character.name"
        style="max-width: 300px"
        class="q-mb-lg glass-img rounded-borders"
      />

      <q-card class="glass-card" flat bordered style="max-width: 400px; width: 100%">
        <q-card-section>
          <div class="text-h5 neon-text q-mb-md">{{ character.name }}</div>
          <div><strong>Status:</strong> {{ t(`status.${character.status}`) }}</div>
          <div>
            <strong>{{ t('species') }}:</strong>
            {{ t(`speciesMap.${character.species}`) || character.species }}
          </div>
          <div>
            <strong>{{ t('gender') }}:</strong>
            {{ t(`genderOptions.${character.gender}`) || character.gender }}
          </div>
          <div>
            <strong>{{ t('origin') }}:</strong>
            {{ t(`locationMap.${character.origin?.name}`, character.origin?.name) }}
          </div>
          <div>
            <strong>{{ t('currentLocation') }}:</strong>
            {{ t(`locationMap.${character.location?.name}`, character.location?.name) }}
          </div>
        </q-card-section>
      </q-card>

      <div class="q-mt-lg" style="max-width: 800px; width: 100%">
        <h6 class="neon-text q-ml-sm">
          {{ `${t('episodesInWhich')} ${character.name} ${t('isPresent')}:` }}
        </h6>
        <div class="row q-col-gutter-md q-mt-sm episode-grid">
          <div v-for="ep in character.episode" :key="ep.id" class="col-12 col-md-6">
            <div class="episode-item">
              <strong>{{ ep.episode }}</strong> - {{ ep.name }} ({{ ep.air_date }})
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center q-mt-xl">
      <q-spinner color="cyan" size="lg" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();

const characterId = route.params.id;

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const { result } = useQuery(GET_CHARACTER, { id: characterId });
const character = computed(() => result.value?.character || null);
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

.episode-grid {
  padding-left: 8px;
  padding-right: 8px;
}

.episode-item {
  color: #00fff7;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
  padding: 6px 0;
}
</style>
