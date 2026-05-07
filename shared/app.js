// shared/app.js
// 목적: 공통 유틸만 제공하고, shared/sb.js가 만든 window.raon / window.raon.sb()를 절대 덮어쓰지 않습니다.

(function () {
  // ✅ 기존 네임스페이스 보존
  window.raon = window.raon || {};

  // ✅ sb.js가 이미 raon.sb()를 제공하므로, 여기서는 절대 재정의하지 않음
  // (혹시 sb.js가 누락된 경우를 대비한 최소 안전장치만 둠)
  if (typeof window.raon.sb !== "function") {
    console.warn("[RAON] shared/sb.js 가 로드되지 않았습니다. (raon.sb 없음)");
  }

  // ---------- Common helpers ----------
  window.raon.formatMoney = function (n) {
    const num = Number(n || 0);
    return num.toLocaleString("ko-KR");
  };

  window.raon.todayKey = function (d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // ---------- Auth / storage helpers ----------
  const KEY_LOGIN = "raonai_user_logged_in";
  const KEY_USER  = "raonai_current_user";

  window.raon.getStoredUser = function () {
    try {
      const raw = localStorage.getItem(KEY_USER);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  window.raon.setStoredUser = function (userObj) {
    if (!userObj) return;
    localStorage.setItem(KEY_LOGIN, "true");
    localStorage.setItem(KEY_USER, JSON.stringify(userObj));
  };

  window.raon.clearStoredUser = function () {
    localStorage.removeItem(KEY_LOGIN);
    localStorage.removeItem(KEY_USER);
  };

  window.raon.requireLogin = function (redirectTo = "index.html") {
    const ok = localStorage.getItem(KEY_LOGIN) === "true";
    if (!ok) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  };

  window.raon.logout = function (redirectTo = "index.html") {
    window.raon.clearStoredUser();
    window.location.href = redirectTo;
  };
})();
