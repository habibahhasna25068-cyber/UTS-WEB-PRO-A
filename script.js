/* ==========================================================
   script.js - Portofolio Bakery Habibah Hasna
   ========================================================== */

/* ----------------------------------------------------------
   PENGATURAN TAUTAN GITHUB
   Isi tautan repository kamu di sini setelah diunggah ke GitHub.
   Contoh: "https://github.com/username/website-bakery"
   Biarkan kosong ("") jika belum ada.
   ---------------------------------------------------------- */
const GITHUB_LINKS = {
  websiteBakery: "",
  promosiBakery: ""
};

/* ----------------------------------------------------------
   1. MENU HP (hamburger)
   ---------------------------------------------------------- */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ----------------------------------------------------------
   2. MENU AKTIF SAAT SCROLL
   ---------------------------------------------------------- */
const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  let currentId = "home";
  const scrollPos = window.scrollY + 120;

  sections.forEach(function (section) {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

/* ----------------------------------------------------------
   3. PROGRESS BAR SKILL
   Ubah angka persentase lewat atribut data-level di index.html.
   ---------------------------------------------------------- */
const skillItems = document.querySelectorAll(".skill-item");

function animateSkill(item) {
  const level = parseInt(item.getAttribute("data-level"), 10) || 0;
  const fill = item.querySelector(".bar-fill");
  const percentText = item.querySelector(".skill-percent");

  fill.style.width = level + "%";

  let current = 0;
  const step = Math.max(1, Math.round(level / 40));
  const timer = setInterval(function () {
    current += step;
    if (current >= level) {
      current = level;
      clearInterval(timer);
    }
    percentText.textContent = current + "%";
  }, 30);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateSkill(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillItems.forEach(function (item) {
    observer.observe(item);
  });
} else {
  skillItems.forEach(animateSkill);
}

/* ----------------------------------------------------------
   4. GAMBAR: sembunyikan gambar jika file belum ada,
      placeholder tetap tampil.
   ---------------------------------------------------------- */
const allImages = document.querySelectorAll(".photo-img, .project-img img");

allImages.forEach(function (img) {
  img.addEventListener("error", function () {
    img.style.display = "none";
  });
});

/* ----------------------------------------------------------
   5. TAUTAN GITHUB PROJECT
   ---------------------------------------------------------- */
const githubButtons = document.querySelectorAll(".github-link");

githubButtons.forEach(function (button) {
  const key = button.getAttribute("data-project");
  const url = GITHUB_LINKS[key];

  if (url && url.trim() !== "") {
    button.setAttribute("href", url);
  } else {
    button.classList.add("btn-disabled");
    button.textContent = "Tautan GitHub belum tersedia";
    button.removeAttribute("target");
    button.addEventListener("click", function (event) {
      event.preventDefault();
    });
  }
});

/* ----------------------------------------------------------
   6. FORM KONTAK: VALIDASI DAN TAMPIL DATA
   ---------------------------------------------------------- */
const form = document.getElementById("contact-form");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const inputPesan = document.getElementById("pesan");

const errorNama = document.getElementById("error-nama");
const errorEmail = document.getElementById("error-email");
const errorPesan = document.getElementById("error-pesan");

const successMessage = document.getElementById("success-message");
const resultBox = document.getElementById("result-box");
const resultNama = document.getElementById("result-nama");
const resultEmail = document.getElementById("result-email");
const resultPesan = document.getElementById("result-pesan");

function isEmailValid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email);
}

function setError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.add("invalid");
}

function clearError(input, errorElement) {
  errorElement.textContent = "";
  input.classList.remove("invalid");
}

function clearAllErrors() {
  clearError(inputNama, errorNama);
  clearError(inputEmail, errorEmail);
  clearError(inputPesan, errorPesan);
}

function validateForm() {
  let valid = true;
  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const pesan = inputPesan.value.trim();

  clearAllErrors();

  if (nama === "") {
    setError(inputNama, errorNama, "Nama wajib diisi.");
    valid = false;
  }

  if (email === "") {
    setError(inputEmail, errorEmail, "Email wajib diisi.");
    valid = false;
  } else if (!isEmailValid(email)) {
    setError(inputEmail, errorEmail, "Format email tidak valid. Contoh: nama@email.com");
    valid = false;
  }

  if (pesan === "") {
    setError(inputPesan, errorPesan, "Pesan wajib diisi.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  successMessage.classList.remove("show");
  successMessage.textContent = "";
  resultBox.hidden = true;

  if (!validateForm()) {
    return;
  }

  // Data ditampilkan dengan textContent agar aman dari injeksi HTML
  resultNama.textContent = inputNama.value.trim();
  resultEmail.textContent = inputEmail.value.trim();
  resultPesan.textContent = inputPesan.value.trim();

  successMessage.textContent = "Pesan berhasil dikirim. Terima kasih, " + inputNama.value.trim() + "!";
  successMessage.classList.add("show");
  resultBox.hidden = false;

  form.reset();
});

// Hapus pesan kesalahan saat pengguna mulai mengetik lagi
inputNama.addEventListener("input", function () {
  clearError(inputNama, errorNama);
});
inputEmail.addEventListener("input", function () {
  clearError(inputEmail, errorEmail);
});
inputPesan.addEventListener("input", function () {
  clearError(inputPesan, errorPesan);
});