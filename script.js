const JSON_URL = 'vibration.json';

let data = {};

async function loadData() {
  const res = await fetch(JSON_URL);
  data = await res.json();
  renderEntries();
}

function renderEntries() {
  const container = document.getElementById("entries");
  container.innerHTML = "";
  Object.entries(data).forEach(([key, val]) => {
    const el = document.createElement("div");
    el.className = "entry";
    el.innerHTML = `<strong>${key}</strong><br><em>${val.intention}</em><br>${val.fragment}<br><small>${val.timestamp}</small>`;
    container.appendChild(el);
  });
}

function addEntry() {
  const source = document.getElementById("source").value.trim();
  const intention = document.getElementById("intention").value.trim();
  const fragment = document.getElementById("fragment").value.trim();
  if (!source || !intention || !fragment) return alert("Champs incomplets");

  const timestamp = new Date().toISOString();
  data[source] = { intention, fragment, timestamp };

  download(JSON.stringify(data, null, 2), "vibration.json", "application/json");
}

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

loadData();
