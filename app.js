import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

const form = document.querySelector("#messageForm");
const messageInput = document.querySelector("#message");
const counter = document.querySelector("#counter");
const status = document.querySelector("#status");
const submitBtn = document.querySelector("#submitBtn");

messageInput.addEventListener("input", () => {
  counter.textContent = `${messageInput.value.length} / 1200`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.className = "status";
  status.textContent = "";

  const name = document.querySelector("#name").value.trim();
  const relationship = document.querySelector("#relationship").value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    status.classList.add("error");
    status.textContent = "Please add your name and a message for Roni.";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending your love…";

  try {
    await addDoc(collection(db, "birthdayMessages"), {
      name,
      relationship,
      message,
      createdAt: serverTimestamp()
    });

    form.reset();
    counter.textContent = "0 / 1200";
    status.textContent = "Your words are now part of Roni’s birthday gift. ♥";
    submitBtn.textContent = "Message sent ✓";

    setTimeout(() => {
      submitBtn.textContent = "Send another message ♥";
      submitBtn.disabled = false;
    }, 1800);
  } catch (error) {
    console.error(error);
    status.classList.add("error");
    status.textContent = "We couldn't save your message yet. Please try again.";
    submitBtn.textContent = "Send my message ♥";
    submitBtn.disabled = false;
  }
});