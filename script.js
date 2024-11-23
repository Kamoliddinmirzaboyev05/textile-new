
const form = document.getElementById("dataForm");
const dataList = document.getElementById("dataList");
const searchInput = document.getElementById("searchInput");

// Ma'lumotlarni HTML elementlarida saqlash va localStorage'ga yozish
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const ism = document.getElementById("ism").value;
    const familiya = document.getElementById("familiya").value;
    const jsr = document.getElementById("jsr").value;
    const avtomobil = document.getElementById("avtomobil").value;
    const texnikPasport = document.getElementById("texnikPasport").value;

    const newData = {
        ism,
        familiya,
        jsr,
        avtomobil,
        texnikPasport
    };

    // localStorage'da ma'lumotlarni saqlash
    let storedData = JSON.parse(localStorage.getItem("data")) || [];
    storedData.push(newData);
    localStorage.setItem("data", JSON.stringify(storedData));

    // Ma'lumotlarni ko'rsatish
    displayData();

    // Formani tozalash
    form.reset();
});

// Ma'lumotlarni ekranga chiqarish
function displayData() {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    dataList.innerHTML = "";
    storedData.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.ism}</td>
                <td>${item.familiya}</td>
                <td>${item.jsr}</td>
                <td>${item.avtomobil}</td>
                <td>${item.texnikPasport}</td>
                <td>
                    <button onclick="editData(${index})"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteData(${index})">O'chirish</button>
                </td>
            </tr>
        `;
        dataList.insertAdjacentHTML("beforeend", row);
    });
}

// Ma'lumotni tahrirlash
function editData(index) {
    const storedData = JSON.parse(localStorage.getItem("data"));
    const item = storedData[index];
    document.getElementById("ism").value = item.ism;
    document.getElementById("familiya").value = item.familiya;
    document.getElementById("jsr").value = item.jsr;
    document.getElementById("avtomobil").value = item.avtomobil;
    document.getElementById("texnikPasport").value = item.texnikPasport;

    // O'chirishdan oldin ma'lumotni olib tashlash
    storedData.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(storedData));
    displayData();
}

// Ma'lumotni o'chirish
function deleteData(index) {
    let storedData = JSON.parse(localStorage.getItem("data"));
    storedData.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(storedData));
    displayData();
}

// Sayt yuklanganda ma'lumotlarni ko'rsatish
window.onload = displayData;

// Qidiruv funksiyasi
function searchData() {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#dataTable tbody tr');
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const [ism, familiya, jsr, avtomobil, texnikPasport] = Array.from(cells).map(cell => cell.textContent.toLowerCase());
        
        if (
            ism.includes(searchTerm) ||
            familiya.includes(searchTerm) ||
            jsr.includes(searchTerm) ||
            avtomobil.includes(searchTerm) ||
            texnikPasport.includes(searchTerm)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
