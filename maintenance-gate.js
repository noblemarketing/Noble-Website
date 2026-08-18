/* Site lock. Set NOBLE_MAINTENANCE to false when the refresh is ready to publish. */
window.NOBLE_MAINTENANCE = true;

(function () {
  if (!window.NOBLE_MAINTENANCE) return;

  var path = (location.pathname || "/").replace(/\/+$/, "") || "/";
  if (path === "/maintenance") return;

  var key = "noble-preview";
  var params = new URLSearchParams(location.search);

  if (params.get("preview") === "1") {
    try { localStorage.setItem(key, "1"); } catch (err) {}
    return;
  }
  if (params.get("preview") === "0") {
    try { localStorage.removeItem(key); } catch (err) {}
  }

  try {
    if (localStorage.getItem(key) === "1") return;
  } catch (err) {}

  document.documentElement.style.visibility = "hidden";
  location.replace("/maintenance/");
})();
