const themeToggle = document.getElementById("theme-toggle") as HTMLButtonElement;

export function initTheme() {
  themeToggle.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️ Light Mode";
  }
}
