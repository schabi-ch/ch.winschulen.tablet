<template>
  <div :id="`vimeoComponent-${url}`">
    <div class="q-video q-video--responsive" style="padding-bottom: 56.25%;">
      <vimeo-player ref="player" :video-id="videoID" @ready="onReady" />

      <!--
      <youtube
        :video-id="url"
        ref="youtube"
        @playing="playing"
        @paused="paused"
        :player-vars="playerVars"
      ></youtube>
      -->
    </div>
    <div
      class="q-pt-sm q-mb-md q-gutter-md"
      style="display: flex; align-items: center"
    >
      <div>
        <q-btn color="secondary" no-caps @click="playVideo" :icon="playIcon" />
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
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :label="$q.fullscreen.isActive ? 'Verkleinern' : 'Vollbild'"
        />
      </div>
    </div>
  </div>
</template>

<script>
/*
Vimeo API Documentation: 
VueJS-Vimeo Api Wrapper: https://www.npmjs.com/package/vue-vimeo-player
*/
export default {
  name: "VimeoVideo",
  props: ["url"],
  computed: {
    player() {
      return this.$refs.vimeo.player;
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
      videoID: "500726329",
      speed: 1,
      play: false,
      playerReady: false,
      playerVars: {
        //autoplay: 1
      }
    };
  },
  methods: {
    toggle(e) {
      //const target = e.target.parentNode.parentNode.parentNode;
      const target = document.getElementById("vimeoComponent-" + this.url);

      this.$q.fullscreen
        .toggle(target)
        .then(() => {
          // success!
        })
        .catch(err => {
          alert(err);
          // uh, oh, error!!
          // console.error(err)
        });
    },
    onReady() {
      this.playerReady = true;
    },
    /*
    play() {
      this.$refs.player.play();
    },
    pause() {
      this.$refs.player.pause();
    },
*/
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
