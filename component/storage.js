function getBuku() {
    return JSON.parse(localStorage.getItem(internalStorageKey))|| [];
}
function insertBuku(buku) {
    alert("Data Ditambahkan");
    let i_buku = buku;
    let dataBukuBuku = [];
    
    if (localStorage.getItem(internalStorageKey) === null ) {
        dataBukuBuku = [];
    } else {
        dataBukuBuku = JSON.parse(localStorage.getItem(internalStorageKey));
    }
    dataBukuBuku.push(i_buku);
    localStorage.setItem(internalStorageKey, JSON.stringify(dataBukuBuku));
    renderBuku(getBuku());
}
function renderBuku(buku = []){
    const belumSelesai = document.querySelector("#belumSelesai");
    const sSelesai = document.querySelector("#sSelesai");
  
    belumSelesai.innerHTML = "";
    sSelesai.innerHTML = "";
    
    buku.forEach((i_buku) => {
    if (i_buku.i_selesai == false) {
        let info_buku = `
          <div class="buku-info">
              <h3> Judul Buku : ${i_buku.judul}</h3>
              <p> Penulis Buku: ${i_buku.pengarang}</p>
              <p>Tahun Terbit: ${i_buku.tahun_terbit}</p>
              <div class="action-control-book">
              <button onclick="bukuTerbaca('${i_buku.id}')" class="reset">
                  <span>Selesai dibaca</span>
              </button>
              <button onclick="hapusBuku('${i_buku.id}')" class="reset">
                  <span>Hapus buku</span>
              </button>
          </div>
            </div>
          `;
          belumSelesai.innerHTML += info_buku;
    }else {
        let info_buku = `
            <div class="buku-info">
              <h3 >Judul Buku : ${i_buku.judul}</h3>
              <p >Penulis Buku : ${i_buku.pengarang}</p>
              <p>Tahun Terbit : ${i_buku.tahun_terbit}</p>
              <div class="action-control-book" >
              <button onclick="bukuBelumTerbaca('${i_buku.id}')" class="reset"> 
                  <span>Belum selesai dibaca</span>
              </button>
              <button onclick="hapusBuku('${i_buku.id}')" class="reset">
                  <span>Hapus buku</span>
              </button>
            </div>
            </div>

              
          `;
      sSelesai.innerHTML += info_buku;
    }
    });
    informasiBuku();
}
function bukuTerbaca(id) {
    let konfirm = confirm("pindahkan sebagai selesai baca?");

    if (konfirm == true) {
        const rincianBuku = getBuku().filter((x) => x.id == id);
        const dataBukuBaru = {
            id : rincianBuku[0].id,
            judul : rincianBuku[0].judul,
            pengarang : rincianBuku[0].pengarang,
            tahun_terbit: rincianBuku[0].tahun_terbit,
            i_selesai: true,
        }
        const dataBukuBuku = getBuku().filter((x)=> x.id != id);
        localStorage.setItem(internalStorageKey, JSON.stringify(dataBukuBuku));

        insertBuku(dataBukuBaru);
    }else {
        return 0;
    }
    informasiBuku();
}
function bukuBelumTerbaca(id) {
    let konfirm = confirm("pindahkan sebagai belum baca?");

    if (konfirm == true) {
        const rincianBuku = getBuku().filter((x) => x.id == id);
        const dataBukuBaru = {
            id : rincianBuku[0].id,
            judul : rincianBuku[0].judul,
            pengarang : rincianBuku[0].pengarang,
            tahun_terbit: rincianBuku[0].tahun_terbit,
            i_selesai: false,
        }
        const dataBukuBuku = getBuku().filter((x)=> x.id != id);
        localStorage.setItem(internalStorageKey, JSON.stringify(dataBukuBuku));

        insertBuku(dataBukuBaru);
    }else {
        return 0;
    }
    informasiBuku();
}
function hapusBuku(id) {
    let konfirm = confirm('hapus data buku?');

    if (konfirm == true) {
        const rincianBuku = getBuku().filter((x)=> x.id == id);
        const dataBukuBuku = getBuku().filter((x)=> x.id != id);
        localStorage.setItem(internalStorageKey,JSON.stringify(dataBukuBuku));
        renderBuku(getBuku());
        alert(`Buku ${rincianBuku[0].judul} terhapus`);
    } else {
        return 0;
    }
    informasiBuku();
}
function informasiBuku() {
    let selesai = blmSelesai = 0;
    const bookshelf = getBuku();
    const semuaBuku = bookshelf.length;
    for (let x = 0;x < bookshelf.length;x++) {
        if(bookshelf[x]['i_selesai']) {
            selesai +=1
        }else {
            blmSelesai +=1
        }
    }
    document.querySelector("#semuaBuku").innerHTML = semuaBuku;
    document.querySelector("#selesai").innerHTML = selesai;
    document.querySelector("#blmSelesai").innerHTML = blmSelesai;
}