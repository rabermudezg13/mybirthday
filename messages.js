import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCI3fiuTXz55SyoCtxKLkYjhAVR472VACU",
  authDomain: "roni-dd95b.firebaseapp.com",
  projectId: "roni-dd95b",
  storageBucket: "roni-dd95b.firebasestorage.app",
  messagingSenderId: "77810675355",
  appId: "1:77810675355:web:e6c5b2c56767d5b170e03e",
  measurementId: "G-CJ2D9LDC2Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const grid = document.querySelector("#messageGrid");
const loveCounter = document.querySelector("#loveCounter");

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateCounter(count) {
  if (!loveCounter) return;
  const label = count === 1
    ? "1 person has shared their love with Roni"
    : `${count} people have shared their love with Roni`;

  loveCounter.innerHTML = `
    <span class="love-counter-number">${count}</span>
    <span>${label}</span>
  `;
}

const q = query(collection(db, "birthdayMessages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
  updateCounter(snapshot.size);

  if (snapshot.empty) {
    grid.innerHTML = '<div class="empty-card">The first loving words for Roni will appear here. ♥</div>';
    return;
  }

  grid.innerHTML = snapshot.docs.map((doc, index) => {
    const data = doc.data();
    const name = escapeHtml(data.name || "Someone who loves you");
    const relationship = escapeHtml(data.relationship || "");
    const message = escapeHtml(data.message || "");

    return `
      <article class="message-card" style="animation-delay:${Math.min(index * 80, 800)}ms">
        <div class="message-heart" aria-hidden="true">♥</div>
        <blockquote>“${message}”</blockquote>
        <div class="from">— ${name}</div>
        ${relationship ? `<div class="relationship">${relationship}</div>` : ""}
      </article>
    `;
  }).join("");
}, (error) => {
  console.error(error);
  grid.innerHTML = '<div class="empty-card">We could not load the messages yet. Please refresh in a moment.</div>';
  if (loveCounter) {
    loveCounter.innerHTML = '<span class="love-counter-number">♥</span><span>Love is still here — please refresh in a moment.</span>';
  }
});