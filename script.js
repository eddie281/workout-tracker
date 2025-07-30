const form = document.getElementById("workout-form");
const workoutList = document.getElementById("workouts");
const totalDisplay = document.getElementById("total-calories");
const themeToggle = document.getElementById("theme-toggle");
const appClass = document.body;
let workouts = [];
let chart;

function updateTotal() {
  totalDisplay.textContent = workouts.reduce((a, b) => a + b.calories, 0);
}
function updateChart() {
  chart.data.labels = workouts.map((w) => w.name);
  chart.data.datasets[0].data = workouts.map((w) => w.calories);
  chart.update();
}
form.onsubmit = (e) => {
  e.preventDefault();
  const name = e.target["workout-name"].value;
  const cal = Number(e.target["calories-burned"].value);
  const id = Date.now();
  workouts.push({ id, name, calories: cal });
  const li = document.createElement("li");
  li.textContent = `${name} – ${cal} cal`;
  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.onclick = () => {
    if (!confirm("Delete this workout? (IH#8)")) return;
    workouts = workouts.filter((w) => w.id !== id);
    li.remove();
    updateTotal();
    updateChart();
  };
  li.appendChild(btn);
  workoutList.appendChild(li);
  updateTotal();
  updateChart();
  form.reset();
};
window.onload = () => {
  const ctx = document.getElementById("caloriesChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [{ label: "Calories", data: [], backgroundColor: "teal" }],
    },
    options: { responsive: true },
  });
};
themeToggle.onclick = () => {
  appClass.classList.toggle("dark");
};
