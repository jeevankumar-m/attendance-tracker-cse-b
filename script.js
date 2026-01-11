const students = [
    { name: "Alfrin Solomon Peter J", secId: "NULL" },
    { name: "Balakumar E", secId: "NULL" },
    { name: "Deepak S", secId: "NULL" },
    { name: "Deepak V", secId: "NULL" },
    { name: "Govinda Balaji M", secId: "NULL" },
    { name: "Gowtham K", secId: "NULL" },
    { name: "Hari Prasath D", secId: "NULL" },
    { name: "Jaya Suriya T R", secId: "NULL" },
    { name: "Jeevan Kumar M", secId: "NULL" },
    { name: "Jeyachandran S", secId: "NULL" },
    { name: "Kamaleshwaran P", secId: "NULL" },
    { name: "Kannan N", secId: "NULL" },
    { name: "Karthik Krishna S", secId: "NULL" },
    { name: "Kirthik Satyamoorthy L", secId: "NULL" },
    { name: "Lakshan Arvind S", secId: "NULL" },
    { name: "Loageshkanna J G", secId: "NULL" },
    { name: "Lokesh S", secId: "NULL" },
    { name: "Mithun B", secId: "NULL" },
    { name: "Mohamed Yasar A", secId: "NULL" },
    { name: "Mohammed Haris Suhaib M", secId: "NULL" },
    { name: "Muhundram S", secId: "NULL" },
    { name: "Mukesh P", secId: "NULL" },
    { name: "Nidhish S V", secId: "NULL" },
    { name: "Nilavarash P G S", secId: "NULL" },
    { name: "Prabhanjan A", secId: "NULL" },
    { name: "Pranav A S", secId: "NULL" },
    { name: "Prateesh J K", secId: "NULL" },
    { name: "Ridun Kirsna N", secId: "NULL" },
    { name: "Sachin N", secId: "NULL" },
    { name: "Sanjay V", secId: "NULL" },
    { name: "Siddarth M", secId: "NULL" },
    { name: "Tamilselvan G S", secId: "NULL" },
    { name: "Vetrivel U", secId: "NULL" },
    { name: "Vishwa S", secId: "NULL" },
    { name: "Abirami K", secId: "NULL" },
    { name: "Anbu Thamizhachi D R", secId: "NULL" },
    { name: "Deepavarshini A", secId: "NULL" },
    { name: "Dhebadharshini K", secId: "NULL" },
    { name: "Dhivya J", secId: "NULL" },
    { name: "Eniya R", secId: "NULL" },
    { name: "Induja K", secId: "NULL" },
    { name: "Janani D", secId: "NULL" },
    { name: "Jashmitha B", secId: "NULL" },
    { name: "Jaya Sivapriya", secId: "NULL" },
    { name: "Keerthika J", secId: "NULL" },
    { name: "Kiruba S", secId: "NULL" },
    { name: "Kiruthika G", secId: "NULL" },
    { name: "Kogilavani K", secId: "NULL" },
    { name: "Mouviya Deepika P", secId: "NULL" },
    { name: "Nivedhita R", secId: "NULL" },
    { name: "Poorvisha T", secId: "NULL" },
    { name: "Prerna N", secId: "NULL" },
    { name: "Rituparna B", secId: "NULL" },
    { name: "Sainikasri S", secId: "NULL" },
    { name: "Sanjana Y", secId: "NULL" },
    { name: "Sarmitha S", secId: "NULL" },
    { name: "Shree Jyothi R", secId: "NULL" },
    { name: "Srisha T", secId: "NULL" },
    { name: "Theerthasri R", secId: "NULL" },
    { name: "Senthil Kumar Kalanidhi", secId: "NULL" },
    { name: "Dhavakrishnan M", secId: "NULL" },
    { name: "Sindhuja K", secId: "NULL" },
    { name: "Nimaleshwar R", secId: "NULL" },
];

// Set up service worker for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Display current date
function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

// Format date for storage key
function getStorageKey() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `attendance_${day}_${month}_${year}`;
}

// Check if saved data is from today
function isTodayData(storageKey) {
    const todayKey = getStorageKey();
    return storageKey === todayKey;
}

// Load saved attendance data from localStorage
function loadSavedAttendance() {
    const storageKey = getStorageKey();
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
        return JSON.parse(savedData);
    }

    // Check for any old data and clear it if not from today
    const keys = Object.keys(localStorage);
    for (const key of keys) {
        if (key.startsWith('attendance_') && !isTodayData(key)) {
            localStorage.removeItem(key);
        }
    }

    return null;
}

// Save attendance data to localStorage
function saveAttendance() {
    const absentChecks = document.querySelectorAll(".absent-check");
    const odChecks = document.querySelectorAll(".od-check");
    const attendanceData = {
        date: getStorageKey(),
        absent: [],
        od: []
    };

    students.forEach((_, index) => {
        if (absentChecks[index].checked) {
            attendanceData.absent.push(index);
        }
        if (odChecks[index].checked) {
            attendanceData.od.push(index);
        }
    });

    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(attendanceData));
}

// Update stats display
function updateStats() {
    const absentChecks = document.querySelectorAll(".absent-check");
    const odChecks = document.querySelectorAll(".od-check");

    let absentCount = 0;
    let odCount = 0;

    absentChecks.forEach((checkbox, index) => {
        if (checkbox.checked) absentCount++;
        if (odChecks[index].checked) odCount++;
    });

    document.getElementById("totalCount").textContent = students.length;
    document.getElementById("absentCount").textContent = absentCount;
    document.getElementById("odCount").textContent = odCount;
}

// Render the table with student data
function renderTable() {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";

    // Load saved data
    const savedData = loadSavedAttendance();

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        // Serial number
        const serialCell = document.createElement("td");
        serialCell.textContent = index + 1;
        row.appendChild(serialCell);

        // Student name and details
        const nameCell = document.createElement("td");
        nameCell.innerHTML = `
      <div class="student-name">${student.name}</div>
      <div class="student-details">
        <i class="far fa-id-card"></i> ${student.secId}
      </div>
    `;
        row.appendChild(nameCell);

        // Absent checkbox
        const absentCell = document.createElement("td");
        absentCell.className = "checkbox-cell";
        const absentCheck = document.createElement("input");
        absentCheck.type = "checkbox";
        absentCheck.className = "absent-check";
        absentCheck.dataset.index = index;

        // Check if this student was marked absent in saved data
        if (savedData && savedData.absent.includes(index)) {
            absentCheck.checked = true;
        }

        absentCheck.addEventListener("change", function () {
            saveAttendance();
            updateStats();

            // If absent is unchecked, also uncheck OD
            if (!this.checked) {
                const odCheck = document.querySelector(`.od-check[data-index="${index}"]`);
                odCheck.checked = false;
            }
        });

        absentCell.appendChild(absentCheck);
        row.appendChild(absentCell);

        // OD checkbox
        const odCell = document.createElement("td");
        odCell.className = "checkbox-cell";
        const odCheck = document.createElement("input");
        odCheck.type = "checkbox";
        odCheck.className = "od-check";
        odCheck.dataset.index = index;

        // Check if this student was marked OD in saved data
        if (savedData && savedData.od.includes(index)) {
            odCheck.checked = true;
        }

        odCheck.addEventListener("change", function () {
            saveAttendance();
            updateStats();

            // If OD is checked, also check absent
            if (this.checked) {
                const absentCheck = document.querySelector(`.absent-check[data-index="${index}"]`);
                absentCheck.checked = true;
            }
        });

        odCell.appendChild(odCheck);
        row.appendChild(odCell);

        tbody.appendChild(row);
    });

    updateStats();
}

// Generate the absentee list
function generateList() {
    const absentChecks = document.querySelectorAll(".absent-check");
    const odChecks = document.querySelectorAll(".od-check");
    const absentees = [];

    students.forEach((student, index) => {
        const isAbsent = absentChecks[index].checked;
        const isOD = odChecks[index].checked;

        if (isAbsent) {
            absentees.push({
                name: student.name,
                isOD: isOD
            });
        }
    });

    if (absentees.length === 0) {
        alert("No absentees selected!");
        return;
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const dateStr = `${day}.${month}.${year}`;

    let output = `Absentees (${dateStr})\n`;
    absentees.forEach((student, index) => {
        output += `${index + 1}. ${student.name}${student.isOD ? " - OD" : ""}\n`;
    });

    document.getElementById("outputContent").textContent = output;
    document.getElementById("outputSection").style.display = "block";

    // Scroll to output section (scroll to bottom on mobile)
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            // On mobile, scroll to the bottom of the page
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            // On desktop, scroll to output section
            document.getElementById("outputSection").scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, 100);
}

// Copy to clipboard
function copyToClipboard() {
    const content = document.getElementById("outputContent").textContent;
    navigator.clipboard.writeText(content).then(() => {
        const copyBtn = document.querySelector(".copy-btn");
        const copyIcon = document.getElementById("copyIcon");
        copyBtn.classList.add("copied");
        copyIcon.className = "fas fa-check";

        setTimeout(() => {
            copyBtn.classList.remove("copied");
            copyIcon.className = "far fa-copy";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy to clipboard. Please select and copy manually.");
    });
}

// Close the output section
function closeOutputSection() {
    document.getElementById("outputSection").style.display = "none";
}

// Clear all selections
function clearAllSelections() {
    if (confirm("Are you sure you want to clear all selections?")) {
        document.querySelectorAll(".absent-check").forEach(checkbox => {
            checkbox.checked = false;
        });

        document.querySelectorAll(".od-check").forEach(checkbox => {
            checkbox.checked = false;
        });

        saveAttendance();
        updateStats();
    }
}

// Check if offline and update indicator
function updateOnlineStatus() {
    const offlineIndicator = document.getElementById("offlineIndicator");
    if (!navigator.onLine) {
        offlineIndicator.style.display = "flex";
    } else {
        offlineIndicator.style.display = "none";
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle scroll to show/hide scroll-to-top button
function handleScroll() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
}

// Initialize the app
function initApp() {
    // Set current date
    document.getElementById("currentDate").textContent = getTodayDate();

    // Render the table
    renderTable();

    // Set up online/offline event listeners
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Set up scroll event listener for scroll-to-top button
    window.addEventListener('scroll', handleScroll);

    // Hide mobile generate button on desktop
    if (window.innerWidth > 768) {
        document.getElementById("mobileGenerateBtn").style.display = "none";
    }

    // Save attendance data periodically (every 30 seconds)
    setInterval(saveAttendance, 30000);
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
