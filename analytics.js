// preload+media="print"で読み込んだGoogle Fontsを実際に適用する(初期描画をブロックしないための構成)。
// インラインonload属性はCSP(script-src 'self')でブロックされるため、外部JS側で切り替える。
(function applyPreloadedFont() {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
})();

// GA4計測(script.jsを読み込まない静的ページ用の共有スニペット)。
// ローカル開発サーバーからのアクセスは除外し、本番GA4へのダミーpageview記録を防ぐ。
// characters/index.htmlがscript.js全体を読み込まなかったため(クイズ用DOM参照がnullエラーに
// なる)GA4計測コードも一緒に抜け落ちていた不具合の修正として新設(2026-09-10)。
(function () {
  const GA_MEASUREMENT_ID = 'G-6M4B4EPJM6';
  const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  if (!GA_MEASUREMENT_ID || isLocalDev) return;
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();
