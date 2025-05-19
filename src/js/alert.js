// Alert.js
export default class Alert {
  constructor(jsonPath = "alerts.json") {
    this.jsonPath = jsonPath;
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Failed to load alerts.");
      const alerts = await response.json();

      if (alerts.length > 0) {
        this.renderAlerts(alerts);
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  renderAlerts(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background || "gray";
      p.style.color = alert.color || "white";
      p.style.padding = "1rem";
      p.style.margin = "0";
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    } else {
      console.warn("Main element not found!");
    }
  }
}
