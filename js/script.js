// Variabel global untuk menentukan apakah input dalam Celsius atau Fahrenheit
let isCelsius = true;

// Fungsi untuk menampilkan toast notification
function showToast(message, isError = false) {
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.style.opacity = "1";

    // Sembunyikan toast setelah 2 detik
    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2000);
}

// Fungsi untuk memvalidasi input sebelum konversi
function validateForm() {
    let inputField = document.getElementById("main-input");
    let input = inputField.value.trim();

    // Cek apakah input kosong atau bukan angka
    if (input === "" || isNaN(input)) {
        showToast("Masukkan angka yang valid!", true);
        inputField.value = ""; // Kosongkan input
        inputField.focus(); // Fokus kembali ke input
        return; // Stop eksekusi
    }

    let result;
    if (isCelsius) {
        result = convertToFahrenheit(parseFloat(input));
        document.getElementById("cara-konversi").value = `${input}°C × 9/5 + 32 = ${result.toFixed(2)}°F`;
    } else {
        result = convertToCelsius(parseFloat(input));
        document.getElementById("cara-konversi").value = `(${input}°F - 32) × 5/9 = ${result.toFixed(2)}°C`;
    }

    document.getElementById("main-result").value = result.toFixed(2);
    showToast("Konversi berhasil!");
}

// Fungsi untuk mengonversi Celsius ke Fahrenheit
function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Fungsi untuk mengonversi Fahrenheit ke Celsius
function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

// Fungsi untuk membalik konversi antara Celsius dan Fahrenheit
function reverseConversion() {
    isCelsius = !isCelsius;

    // Ambil elemen <main> dan tambahkan efek flip
    let card = document.querySelector("main");
    card.classList.add("flip");
    setTimeout(() => card.classList.remove("flip"), 600); // Hapus efek setelah animasi selesai

    let inputLabel = document.querySelector("label[for='main-input']");
    let resultLabel = document.querySelector("label[for='main-result']");
    let inputField = document.getElementById("main-input");
    let resultField = document.getElementById("main-result");
    let conversionSteps = document.getElementById("cara-konversi");

    // Ubah label input dan hasil berdasarkan jenis konversi
    if (isCelsius) {
        inputLabel.innerHTML = "<b>Celsius (&deg;C):</b>";
        resultLabel.innerHTML = "<b>Fahrenheit (&deg;F):</b>";
    } else {
        inputLabel.innerHTML = "<b>Fahrenheit (&deg;F):</b>";
        resultLabel.innerHTML = "<b>Celsius (&deg;C):</b>";
    }

    let currentValue = inputField.value;

    // Jika input tidak kosong, lakukan konversi ulang sesuai mode yang baru
    if (currentValue !== "") {
        let newValue;
        if (isCelsius) {
            newValue = convertToFahrenheit(parseFloat(currentValue));
            conversionSteps.value = `${currentValue}°C × 9/5 + 32 = ${newValue.toFixed(2)}°F`;
        } else {
            newValue = convertToCelsius(parseFloat(currentValue));
            conversionSteps.value = `(${currentValue}°F - 32) × 5/9 = ${newValue.toFixed(2)}°C`;
        }

        resultField.value = newValue.toFixed(2);
    }
}

// Fungsi untuk mereset form input dan hasil konversi dengan animasi
function resetForm() {
    let inputField = document.getElementById("main-input");
    let resultField = document.getElementById("main-result");
    let conversionSteps = document.getElementById("cara-konversi");

    // Hilangkan elemen sementara dengan efek fade-out
    inputField.style.opacity = "0";
    resultField.style.opacity = "0";
    conversionSteps.style.opacity = "0";

    // Set ulang nilai setelah 300ms dan tampilkan kembali elemen
    setTimeout(() => {
        inputField.value = "";
        resultField.value = "";
        conversionSteps.value = "";
        inputField.style.opacity = "1";
        resultField.style.opacity = "1";
        conversionSteps.style.opacity = "1";
    }, 300);
}