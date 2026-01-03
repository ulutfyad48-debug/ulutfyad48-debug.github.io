const FOLDERS = {
    novel: '1PWDGvI9Pxkzma58-BDPZYAxq4Mhw1gdu',
    poetry: '1Bje7U53wmDHhuUrAvj-NaHDAXAfMiG_h',
    about: '1QHIFfbqFIcpzHKEwEzPlRovHrC4t7wkX'
};

const API_KEY = 'AIzaSyCMppjIJi2_xBi3oLVXN0XjdANMX10xmwE';

window.onload = () => {
    const container = document.getElementById('episodes-container');
    for (let i = 1; i <= 100; i++) {
        const div = document.createElement('div');
        div.className = 'item-box';
        div.innerText = `قسط ${i}`;
        div.onclick = () => openFile(i, FOLDERS.novel);
        container.appendChild(div);
    }
};

function showSection(id) {
    document.getElementById('home-screen').style.display = 'none';
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id + '-section').classList.add('active');
}

function showHome() {
    document.getElementById('home-screen').style.display = 'block';
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
}

async function openFile(name, folderId) {
    const query = encodeURIComponent(`'${folderId}' in parents and name contains '${name}' and trashed=false`);
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&key=${API_KEY}&fields=files(id,webViewLink)`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.files && data.files.length > 0) {
            // یہ لنک گوگل ڈرائیو ایپ کو براہ راست کھولے گا
            window.location.assign(data.files[0].webViewLink);
        } else {
            alert("فائل نہیں ملی۔ نام چیک کریں۔");
        }
    } catch (e) {
        alert("انٹرنیٹ کا مسئلہ ہے۔");
    }
}
