import {types} from 'mobx-state-tree';
import Video from '../types/video';

const PlayerModel = types
  .model('PlayerModel', {
    videoList: types.array(types.reference(Video)),
    currentVideo: types.maybeNull(types.reference(Video)),
    previousVideo: types.maybeNull(types.reference(Video)),
    nextVideo: types.maybeNull(types.reference(Video)),
    isFinished: types.boolean,
    isPaused: types.boolean,
    isFullScreen: types.boolean,
    showOverlay: types.boolean,
    progress: types.number,
    duration: types.number,
    rate: types.number,
    quality: types.number,
    showModal: types.boolean,
  })
  .actions(self => {
    return {
      setVideos(videos: any) {
        self.videoList = videos.map((video: any) => video);
      },

      setVideo(currentVideo: any) {
        if (currentVideo === null) return;

        const totalVideos = self.videoList.length;

        const currentVideoIndex = self.videoList.findIndex(
          (list: any) => list.id === currentVideo.id,
        );

        const nextVideo =
          currentVideoIndex + 1 < totalVideos
            ? self.videoList[currentVideoIndex + 1]
            : null;

        const previousVideo =
          currentVideoIndex - 1 > 0
            ? self.videoList[currentVideoIndex - 1]
            : null;

        self.currentVideo = currentVideo;
        self.nextVideo = nextVideo;
        self.previousVideo = previousVideo;
      },

      setShowOverlay(show: boolean) {
        self.showOverlay = show;
      },

      setShowModal(show: boolean, isPaused: boolean) {
        self.isPaused = isPaused;
        self.showModal = show;
      },

      setIsFinished(finished: boolean) {
        self.isFinished = finished;
      },

      setIsFullScreen(fullScreen: boolean) {
        self.isFullScreen = fullScreen;
      },

      setProgress(progress: number) {
        self.progress = progress;
      },

      setDuration(duration: number) {
        self.duration = duration;
      },

      setQuality(quality: number) {
        self.quality = quality;
        self.setShowModal(false, false);
      },

      setSpeed(rate: number) {
        self.rate = rate;
        self.setShowModal(false, false);
      },
    };
  });

export default PlayerModel;
