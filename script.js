
        const loginPage = document.getElementById("loginPage");
        const mainPage = document.getElementById("mainPage");
        const dataList = document.getElementById("dataList");
        const modalOverlay = document.getElementById("modalOverlay");
        const dataModal = document.getElementById("dataModal");
        const storedData = JSON.parse(localStorage.getItem("data")) || [];
        let editIndex = null;

        function handleLogin() {
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;
            if (username === "admin" && password === "2601") {
                loginPage.style.display = "none";
                mainPage.style.display = "block";
                displayData();
            } else {
                alert("Login yoki parol xato!");
            }
        }

        function openModal(index = null) {
            dataModal.classList.add("open");
            modalOverlay.classList.add("open");
            if (index !== null) {
                editIndex = index;
                const item = storedData[index];
                document.getElementById("modalIsm").value = item.ism;
                document.getElementById("modalFamiliya").value = item.familiya;
                document.getElementById("modalJSR").value = item.jsr;
                document.getElementById("modalAvto").value = item.avto;
                document.getElementById("modalTexPasport").value = item.texPasport;
            }
        }

        function closeModal() {
            dataModal.classList.remove("open");
            modalOverlay.classList.remove("open");
            editIndex = null;
            document.querySelectorAll("#dataModal input").forEach(input => input.value = "");
        }

        function saveData() {
            const ism = document.getElementById("modalIsm").value;
            const familiya = document.getElementById("modalFamiliya").value;
            const jsr = document.getElementById("modalJSR").value;
            const avto = document.getElementById("modalAvto").value;
            const texPasport = document.getElementById("modalTexPasport").value;

            if (editIndex !== null) {
                storedData[editIndex] = { ism, familiya, jsr, avto, texPasport };
            } else {
                storedData.push({ ism, familiya, jsr, avto, texPasport });
            }

            localStorage.setItem("data", JSON.stringify(storedData));
            displayData();
            closeModal();
        }

        function displayData() {
            dataList.innerHTML = "";
            storedData.forEach((item, index) => {
                const row = `
                    <tr>
                        <td>${item.ism}</td>
                        <td>${item.familiya}</td>
                        <td>${item.jsr}</td>
                        <td>${item.avto}</td>
                        <td>${item.texPasport}</td>
                        <td class="action-btns">
                            <button class="edit-btn" onclick="openModal(${index})"><i class="fas fa-edit"></i></button>
                            <button class="delete-btn" onclick="deleteData(${index})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                dataList.insertAdjacentHTML("beforeend", row);
            });
        }

        function deleteData(index) {
            if (confirm("Bu ma'lumotni o'chirishni xohlaysizmi?")) {
                storedData.splice(index, 1);
                localStorage.setItem("data", JSON.stringify(storedData));
                displayData();
            }
        }

        function searchData() {
            const query = document.getElementById("searchInput").value.toLowerCase();
            dataList.innerHTML = "";
            storedData.filter(item =>
                Object.values(item).some(val => val.toLowerCase().includes(query))
            ).forEach((item, index) => {
                const row = `
                    <tr>
                        <td>${item.ism}</td>
                        <td>${item.familiya}</td>
                        <td>${item.jsr}</td>
                        <td>${item.avto}</td>
                        <td>${item.texPasport}</td>
                        <td class="action-btns">
                            <button class="edit-btn" onclick="openModal(${index})"><i class="fas fa-edit"></i></button>
                            <button class="delete-btn" onclick="deleteData(${index})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                dataList.insertAdjacentHTML("beforeend", row);
            });
        }

        displayData();
