// Set Default Date to Today
document.getElementById('dateInput').valueAsDate = new Date();

function generateReports() {
    // 1. Ambil Nilai dari Input
    const dateRaw = document.getElementById('dateInput').value;
    const officer = document.getElementById('officerInput').value || '-';
    const verifier = document.getElementById('verifierInput').value || '-';
    const mutationType = document.getElementById('mutationType').value;
    
    const itemName = document.getElementById('itemName').value || '-';
    const unit = document.getElementById('unit').value || '';
    const qtyMutation = parseFloat(document.getElementById('qtyMutation').value) || 0;
    
    // Lokasi Asal
    const locOrigin = document.getElementById('locOrigin').value || '-';
    const stockOriginBefore = parseFloat(document.getElementById('stockOriginBefore').value) || 0;
    const stockOriginAfter = stockOriginBefore - qtyMutation; // Logika: Asal berkurang
    
    // Lokasi Tujuan
    const locDest = document.getElementById('locDest').value || '-';
    const stockDestBefore = parseFloat(document.getElementById('stockDestBefore').value) || 0;
    const stockDestAfter = stockDestBefore + qtyMutation; // Logika: Tujuan bertambah
    
    const notes = document.getElementById('notes').value || '-';

    // Format Tanggal (DD MMM YYYY) untuk WhatsApp
    const dateObj = new Date(dateRaw);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatted = dateObj.toLocaleDateString('id-ID', options);
    
    // Format Tanggal (DD MM YYYY) untuk Sistem
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const dateSystem = `${day} ${month} ${year}`;

    // 2. Buat Format WhatsApp
    const waText = `*MINIMARKET BANGUNAN PILAR*
*Jl. Sunan Kudus, Gatak, Rukeman, Tamantirto, Bantul, DIY*
*═══════════════*

*LAPORAN MUTASI BARANG*
*───────────────────────*
*Jenis Mutasi :* ${mutationType}
*Tanggal :* ${dateFormatted}
*Petugas :* ${officer}
*Verifikator :* ${verifier}

DATA BARANG
*───────────────────────*
*Nama Barang :* ${itemName}
*Satuan :* ${unit}
*Qty Mutasi :* ${qtyMutation}

DATA MUTASI
*───────────────────────*
*DATA RAK / LANTAI ASAL*
*Lokasi :* ${locOrigin}
*Stok Sebelum :* ${stockOriginBefore}
*Stok Sesudah :* ${stockOriginAfter}

*DATA RAK / LANTAI TUJUAN*
*Lokasi :* ${locDest}
*Stok Sebelum :* ${stockDestBefore}
*Stok Sesudah :* ${stockDestAfter}

Ket : ${notes}`;

    // 3. Buat Format Sistem (Uppercase)
    // (MUTASI)(TANGGAL BULAN TAHUN) (PETUGAS) (VERIFIKATOR) (NAMA BARANG) DARI (RAK / LANTAI ASAL) KE (RAK / LANTAI TUJUAN) (JUMLAH MUTASI)
    let sysText = `(MUTASI)(${dateSystem}) (${officer}) (${verifier}) (${itemName}) DARI (${locOrigin}) KE (${locDest}) (${qtyMutation})`;
    
    sysText = sysText.toUpperCase(); // Wajib Huruf Besar sesuai request

    // 4. Tampilkan di Textarea
    document.getElementById('waOutput').value = waText;
    document.getElementById('sysOutput').value = sysText;
    
    // Scroll ke hasil
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Untuk mobile
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert("Laporan berhasil disalin!");
    });
}
