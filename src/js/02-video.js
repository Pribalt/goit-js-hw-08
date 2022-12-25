import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeIdEl = document.querySelector('#vimeo-player');
const player = new Player(iframeIdEl);
const KEY_PLAYBACK_TIME = 'videoplayer-current-time';

const onPlay = function (data) {
  const seconds = JSON.stringify(data.seconds);
  localStorage.setItem(KEY_PLAYBACK_TIME, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const getLocal = JSON.parse(localStorage.getItem(KEY_PLAYBACK_TIME) || 0);

player.setCurrentTime(getLocal);
