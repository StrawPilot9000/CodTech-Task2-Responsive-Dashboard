// 1. Sidebar Logic (Mobile)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.main-content');
    sidebar.classList.toggle('active');
}

// 2. Active Tab Switching
function setActive(element) {
    // 1. Remove active class from all items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 2. Add active class to clicked item
    element.classList.add('active');

    // 3. AUTO-CLOSE SIDEBAR ON MOBILE (The Fix)
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// 3. Dark Mode Logic (Persists on Reload)
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        showToast("Dark Mode Enabled 🌙");
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        showToast("Light Mode Enabled ☀️");
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// 4. TOAST NOTIFICATION SYSTEM (The "Polished" feel)
function showToast(message) {
    const container = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// 5. Add "Active" class to search bar on Shortcut Key (/)
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        document.querySelector('.search-container input').focus();
    }
});