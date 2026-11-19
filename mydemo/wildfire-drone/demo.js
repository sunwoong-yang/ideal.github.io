'use strict';
const video = document.getElementById('flight-video');
const replay = document.getElementById('replay');
const note = document.getElementById('playback-note');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.autoplay = false;
  video.pause();
  note.textContent = '소리 없는 시뮬레이션 영상 · 재생 버튼으로 시작하세요';
}
replay.addEventListener('click', () => {
  video.currentTime = 0;
  video.play().catch(() => { note.textContent = '영상의 재생 버튼을 눌러 시작하세요'; });
});
video.addEventListener('error', () => {
  note.textContent = '영상을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';
});
