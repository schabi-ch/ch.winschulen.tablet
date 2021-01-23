<template>
  <div :style="playerWindow">
    <div
      @click="fullscreen = false"
      style="z-index:-1; position: absolute; width: 100%; height: 100%"
    ></div>
    <div class="video-wrapper" :id="`component-${url}`">
      <div class="q-video q-video--responsive" style="padding-bottom: 56.25%;">
        <youtube
          :video-id="url"
          ref="youtube"
          @playing="playing"
          @paused="paused"
          :player-vars="playerVars"
        ></youtube>
      </div>
      <div
        class="q-pt-sm q-mb-md q-gutter-md"
        style="display: flex; align-items: center"
      >
        <div>
          <q-btn
            color="secondary"
            no-caps
            @click="playVideo"
            :icon="playIcon"
          />
        </div>

        <div
          class="row q-gutter-md"
          style="align-items: center; margin-top: -2px"
        >
          <div style="font-size: 12px">
            Geschwindigkeit:
          </div>
          <div style="width: 100px">
            <q-slider
              v-model="speed"
              :min="0.5"
              :max="2"
              :step="0.25"
              snap
              dense
              label
              color="secondary"
            />
          </div>
        </div>

        <q-space />
        <div>
          <q-btn
            color="secondary"
            no-caps
            @click="toggle"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            :label="fullscreen ? 'Verkleinern' : 'Vollbild'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
YouTube API Documentation: https://developers.google.com/youtube/iframe_api_reference
VueJS-YouTube Api Wrapper: https://www.npmjs.com/package/vue-youtube
*/
export default {
  name: "YoutubeVideo",
  props: ["url"],
  computed: {
    playerWindow() {
      if (this.fullscreen) {
        return `
          position: fixed;
          background-color: #ccc;
          top: 0px;
          left: 0px;
          z-index: 9999999;
          width: 100%;
          height: 100%;
        `;
      } else {
        return "";
      }
    },
    player() {
      return this.$refs.youtube.player;
    },
    playIcon() {
      if (this.play) {
        return "pause";
      } else {
        return "play_arrow";
      }
    }
  },
  watch: {
    speed: function() {
      this.player.setPlaybackRate(this.speed);
    }
  },
  data() {
    return {
      speed: 1,
      play: false,
      fullscreen: false,
      playerVars: {
        //autoplay: 1
        //controls: 0
        showinfo: 0
      }
    };
  },
  methods: {
    toggle() {
      this.fullscreen = !this.fullscreen;
    },
    playVideo() {
      if (this.play) {
        this.player.pauseVideo();
        this.play = false;
      } else {
        this.player.playVideo();
        this.play = true;
      }
    },
    playing() {
      this.play = true;
      console.log("\o/ we are watching!!!");
    },
    paused() {
      this.play = false;
    }
  }
};
</script>

<style></style>
