// ==========================================
// 1. BAGIAN VANILLA JAVASCRIPT
// ==========================================

// a. Variabel dan tipe data (Array of Object) berisi dummy data
const dummySkills = [
    { name: "UI/UX Designer Assistant", category: "Design", platform: "Claude", author: "@design_guru", favs: 124 },
    { name: "Python Security Auditor", category: "Security", platform: "General", author: "@sec_expert", favs: 98 },
    { name: "SQL Query Optimizer", category: "Data", platform: "OpenAI", author: "@db_admin", favs: 76 },
    { name: "SEO Article Writer", category: "Writing", platform: "Gemini", author: "@content_lab", favs: 61 },
    { name: "Research Summarizer", category: "Research", platform: "Claude", author: "@paper_bot", favs: 54 },
    { name: "Workflow Automator", category: "Automation", platform: "AI Agent", author: "@flow_dev", favs: 42 }
];

// b. Function untuk memproses data (Memfilter data berdasarkan kata kunci dan kategori)
function filterSkillsData(keyword, category) {
    return dummySkills.filter(skill => {
        const cocokNama = skill.name.toLowerCase().includes(keyword.toLowerCase());
        // Kategori kosong ("Semua") berarti semua kategori lolos
        const cocokKategori = category === '' || skill.category.toLowerCase() === category;
        return cocokNama && cocokKategori;
    });
}

// c. Struktur kendali (Perulangan) untuk me-render data ke HTML secara dinamis
function renderSkillsTable(data) {
    const tbody = document.getElementById('skills-tbody');
    if (!tbody) return; // Hanya jalan jika elemen tabel ada (di skills.html)
    
    tbody.innerHTML = ''; // Kosongkan isi tabel bawaan HTML

    // Jika tidak ada data yang cocok, tampilkan pesan
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-neutral-400">Skill tidak ditemukan.</td></tr>';
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const skill = data[i];
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-neutral-950';
        tr.innerHTML = `
            <td class="px-4 py-3"><a href="skill-detail.html" class="font-medium text-neutral-100 hover:underline">${skill.name}</a></td>
            <td class="px-4 py-3"><span class="rounded border border-neutral-700 px-1.5 font-mono text-xs text-neutral-400">${skill.category}</span></td>
            <td class="px-4 py-3 text-neutral-400">${skill.platform}</td>
            <td class="px-4 py-3 text-neutral-400">${skill.author}</td>
            <td class="px-4 py-3 text-right text-neutral-400">${skill.favs}</td>
        `;
        tbody.appendChild(tr);
    }
}

// Panggil render tabel saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderSkillsTable(dummySkills);
});


// ==========================================
// 2. BAGIAN JQUERY
// ==========================================
$(document).ready(function() {
    
    // a. Event Handling: Fitur pencarian live (terhubung dengan fungsi Vanilla JS)
    function cariSkill() {
        const keyword = $('#search-keyword').val();
        const category = $('#filter-category').val();
        const filteredData = filterSkillsData(keyword, category);
        renderSkillsTable(filteredData); // Render ulang tabel dengan data hasil filter
    }

    $('#search-keyword').on('keyup', cariSkill);   // Saat mengetik
    $('#filter-category').on('change', cariSkill); // Saat memilih kategori

    // Tombol "Cari Skill" / Enter: cegah reload halaman, lalu cari
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        cariSkill();
    });

    // b. Event Handling & Validasi: Saat form disubmit (di skill-form.html)
    $('#skill-form-element').on('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman

        // Validasi field kosong menggunakan jQuery
        const name = $('#skill-name').val();
        if(name.trim() === '') {
            alert('Peringatan: Nama skill tidak boleh kosong!');
            return;
        }

        // c. Efek Animasi: Menampilkan notifikasi sukses (fadeIn) lalu hilang (fadeOut)
        $('#notification').fadeIn().delay(3000).fadeOut();
        
        // Kosongkan form kembali setelah disubmit
        this.reset();
    });
});