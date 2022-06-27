const internalStorageKey = "DATALIST_BOOK"

const judul = document.querySelector("#inputJudulBuku");
const pengarang = document.querySelector("#inputPengarangBuku");
const tahun_terbit = document.querySelector("#inputTahunBuku");
const bukuSelesai = document.querySelector("#inputBukuSelesai");
const tombolSubmit = document.querySelector("#tombolSubmit");
const pencarian = document.querySelector("#pencarianJudul");
const tombolPencarian = document.querySelector("#tombolPencarian");
const tombolReset = document.querySelector("#tombolReset");

function fValidation() {
    function validation(cek) {
        return cek.value === "";
    }
    return validation(judul)||validation(pengarang)||validation(tahun_terbit);
}
bukuSelesai.addEventListener("change",function(){
    const bukuSelesaicek = bukuSelesai.checked;
    if (bukuSelesaicek) {
        document.querySelector(".i_selesai").style.display = "inline-block";
        document.querySelector(".n_Selesai").style.display="none";
    }else {
        document.querySelector(".n_Selesai").style.display = "inline-block";
        document.querySelector(".i_selesai").style.display = "none";
    }
    }
);
window.addEventListener("load",function(){
    if (localStorage.getItem(internalStorageKey) !== "") {
        const dataBuku = getBuku();
        renderBuku(dataBuku);
    }
});
tombolSubmit.addEventListener("click",function(){
    const fVal = fValidation();
    if (fVal) {
        alert("Kosong");
    }else {
        const dataBukuBaru = {
            id:+new Date(),
            judul:judul.value.trim(),
            pengarang:pengarang.value.trim(),
            tahun_terbit:tahun_terbit.value.trim(),
            i_selesai:bukuSelesai.checked,
        };
        insertBuku(dataBukuBaru);
        clear();
    }
});
tombolReset.addEventListener("click",function() {
    pencarian.value = "";
    renderBuku(getBuku());
});
tombolPencarian.addEventListener("click", function(e) {
    e.preventDefault();
    if (localStorage.getItem(internalStorageKey) =="") {
        alert("data kosong");
        return location.reload();
    }else {
        const g_judul = getBuku().filter((x) => x.judul == pencarian.value.trim());
        if (g_judul.length == 0) {
            const g_pengarang = getBuku().filter((x) => x.pengarang == pencarian.value.trim());
            if (g_pengarang.length == 0){
                const g_tahunPenerbit = getBuku().filter((x) =>x.tahun_terbit == pencarian.value.trim());
                if (g_tahunPenerbit.length == 0){
                    alert("Tidak ditemukan");
                    return location.reload();
                }else { renderHasilPencarian(g_tahunPenerbit);}}else{renderHasilPencarian(g_pengarang);}}else{renderHasilPencarian(g_judul);
        }
    }
    pencarian.value="";
});
function renderHasilPencarian(buku) {
    renderBuku(buku);
}
function clear() {
    judul.value = "";
    pengarang.value = "";
    tahun_terbit.value = "";
    bukuSelesai.checked = false;
}
