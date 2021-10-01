var nilai ="";
var idBulan ="";
var sheet="";

var nUser="";
var nDivisi="";
var nStatus ="";
var noKode ="";
var indexs ="";
var waktuJam ="";
var waktuMenit ="";

var nilaiPersetujuan="";

var arr =[];
var arrayPermin =[];
var arrayPengadaan =[];

/*pengadaan */
var nMaterial ="";

/*Loading Page */
var nLoading = "";

/*nama OKP */
var tanggalOKP ="";
var sheetOKP ="";
var kodeNomer = "";
var tipsBarang ="";


var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';

var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

if(queryString ==""){
    nilai = 0;
}
else{
    nilai = 1;
}
        
if(nilai == 0){
    window.location.href = "login.html";
}
else{
    idBulan ="";
    sheet="";
    nUser="";
    nDivisi="";
    nStatus ="";
    noKode ="";
    indexs ="";
    nMaterial ="";
    kodeNomer = "";
    sheetOKP ="";
    tipsBarang ="";
    waktuJam ="";
    waktuMenit ="";
    arr =[];

    var queries = queryString.split("/");
    var queries0 = queries[0];
    var queries1 = queries[1];
    var queries2 = queries[2];
    var queries3 = queries[3];

    var username = queries1;
    var status = queries2;
    var divisi = queries3;
    var index = queries0;

    nUser = username;
    nDivisi = divisi;
    nStatus = status;
    indexs = index;

    var date = new Date();
    options = {month: '2-digit'};
    options1 = { year: 'numeric', month: 'long', day: '2-digit'};
    const bulanID = date.toLocaleString('id-ID',options);
    idBulan = bulanID;
    var ttangs = date.toLocaleString('id-ID',options1);
    var jams = date.getHours();
    waktuJam = jams.toLocaleString('id-ID', {hour:'2-digit'});
    var ment = date.getMinutes();
    waktuMenit= ment.toLocaleString('id-ID', {minute: '2-digit'});

    if(index =="home"){}
    else if(index =="pengadaan"){
       rPengadaan('tabelData','myTable');
       nLoading ="pageLoad";
    }
    else if(index =="listpengadaan"){
        if(divisi =="PlanManager"){
            nLoading ="loadListPenga";
            planM();
        }
        else if(divisi =="Produksi"){
            //document.getElementById('tab_1').className ="active";
            rPengadaan('tListPengadaan','mylistTable');
            nLoading ="loadListPenga"; 
        }
        else if(divisi =="Purchasing"){
            //document.getElementById('tab_2').className ="active";
            rPengadaan('tListPengadaan','mylistTable');
            nLoading ="loadListPenga"; 
        }
        else if(divisi =="PPIC-WH"){
            //document.getElementById('tab_3').className ="active";
            rPengadaan('tListPengadaan','mylistTable');
            nLoading ="loadListPenga"; 
        }
        else{
            alert('Divisi Tidak Sesuai')
        }
    }
    else if(index =="permintaan"){
        nLoading ="loadPermin";
    }
    else if(index =="listpermintaan"){
        nLoading ="loadListPermin";
    }
    else if(index =="OKP"){
        nLoading ="loadOKP"; 
    }
    else if(index =="listOKP"){
        nLoading ="loadListOKP"; 
    }
    else{}     
}

function planM(){
    var func = 'loginAps';
    var qrCode ='';
    var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';
    var tambah = 'exec?'+'func='+func+'&userId=plan&qrCode=&pass=a'
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
        myArray =[];
        myArray = response.data;

        var ket = myArray[0].ket 
        var nilai = myArray[0].userId
        var status = myArray[0].status
        var divisi = myArray[0].divisi

        document.getElementById(nLoading).style.visibility = 'hidden';
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert(msg);
            },
    });  
}

function createNew(){
    document.getElementById('upPop').style.display ="block";
    pengadaanNo();
}


function batalPengadaan(){
    document.getElementById('upPop').style.display ="none";
    document.getElementById('popQuestion').style.display ="none";
    document.getElementById("tbl_pilihan").style.display ="block";
    document.getElementById("tbl_pertanyaan").style.display ="none";
    document.getElementById('question').innerHTML ="Pilih Aksi Selanjutnya";
    document.getElementById('tanggal').value = "";
    document.getElementById('kode').value = "";  
    document.getElementById('pemohon').value = "";
    document.getElementById('jabatan').value = "";
    document.getElementById('koBar').value = "";
    document.getElementById('stok').value = "";
    document.getElementById('order').value = "";
    document.getElementById('satuan').value = "---";
    document.getElementById('tipebarang').value = "---";
    document.getElementById('tTerima').value = "";
    document.getElementById('keterangan').value = "";
    document.getElementById('tipebarang').style.display = "inline";
    document.getElementById('pTipe').style.display = "inline";
    document.getElementById('koBar').style.display = "none";
    document.getElementById('koBar').style.width = "300px";
    document.getElementById('rubahTipe').style.display = "none";
    document.getElementById('spiKode').style.display = "none";
    document.getElementById('koBar').readOnly = false;
    noKode = "";
    nMaterial ="";
}

function refresh(){
    if(indexs =="home"){}
    else if(indexs =="pengadaan"){
       document.getElementById(nLoading).style.visibility = 'visible';
       rPengadaan('tabelData','myTable');
       nLoading ="pageLoad";
       nMaterial ="";
    }
    else if(indexs =="listpengadaan"){
        document.getElementById(nLoading).style.visibility = 'visible';
        rPengadaan('tListPengadaan','mylistTable');
        nLoading ="loadListPenga"; 
    }
    else if(indexs =="permintaan"){}
    else if(indexs =="listpermintaan"){}
    else if(indexs =="OKP"){}
    else if(indexs =="createOKP"){}
    else{}  
}
function deletePengadaan(){
    document.getElementById("tbl_pilihan").style.display ="none";
    document.getElementById("tbl_pertanyaan").style.display ="block";
    document.getElementById('question').innerHTML ="Apakah Anda ingin menghapus data?";

}
function tdkPengadaan(){
    document.getElementById("tbl_pilihan").style.display ="block";
    document.getElementById("tbl_pertanyaan").style.display ="none";
    document.getElementById('question').innerHTML ="Pilih Aksi Selanjutnya";
}
function yaPengadaan(){
    hapusPengadaan();
}
function updatePengadaan(){
    document.getElementById('upPop').style.display ="block";
    document.getElementById('popQuestion').style.display ="none";
}
function gantiTipe(){
    document.getElementById('tipebarang').style.display = "inline";
    document.getElementById('pTipe').style.display = "inline";
    document.getElementById('koBar').style.display = "none";
    document.getElementById('koBar').style.width = "300px";
    document.getElementById('rubahTipe').style.display = "none";
    document.getElementById('koBar').value = "";
    document.getElementById('koBar').readOnly = false;
}
/**********************************************GETPengadaan & NO PENGADAAN & Tanggal Saat Ini********************************************/
function rPengadaan(namaTable,namaRow){
    var nTable = namaTable;
    var nRow = namaRow;
    console.log('nTable :' +nTable);
    console.log('nRow :' +nRow);
    var myArray =[];
    var func = 'tampilPengadaan';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&divisi='+nDivisi+'&kode&material';
    console.log(tambah);
    $.ajax({
        method:'GET',
        url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            arrayPengadaan =[];
            myArray = response.data;
            arrayPengadaan = response.data;
            
            myArray.reverse();  
            arrayPengadaan.reverse();
            $("#"+nRow).empty();
            var table = document.getElementById(nRow);  
              
            for (var i = 0; i < myArray.length; i++){
                var warna ="";
                if(myArray[i].Supplier =='' && myArray[i].nopo ==''){
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="green";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else if(myArray[i].Supplier !='' && myArray[i].nopo ==''){
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="purple";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else if(myArray[i].Supplier !='' && myArray[i].nopo !=''){
                    
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="black";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else{}
                var pic = myArray[i].StatusVerify; 
                var PM = myArray[i].Status
                var row = `<tr onClick="myFunc(this)" title="Status Verify PIC:${pic} & Status Verify PM:${PM}">
                            <td style="color:${warna};font-weight: bold;">${i+1}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Kode}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Tanggal}</td>                               
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Divisi}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Pemohon}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Jabatan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Material}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Stok}</td>
                            <td style="background-color: cadetblue;color:black;font-weight: bold;">${myArray[i].JumlahOrder}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Satuan}</td>
                            <td style="background-color: cadetblue;color:black;font-weight: bold;">${myArray[i].Tterima}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Keterangan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].StatusVerify}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Status}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Supplier}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].HargaSatuan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].diskon}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].nopo}</td>
                        </tr>`
                table.innerHTML += row
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            if(indexs =='listpengadaan'){
                if(divisi =="PlanManager"){

                }
                else if(divisi =="Produksi"){
                    document.getElementById('tab_1').className ="active";
                }
                else if(divisi =="Purchasing"){
                    document.getElementById('tab_2').className ="active";
                }
                else if(divisi =="PPIC-WH"){
                    document.getElementById('tab_3').className ="active";
                }
                else{
                    alert('Divisi Tidak Sesuai')
                }
            }
            else{
                console.log('kosong')
            }
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert(msg);
        },
    });

}

function pengadaanNo(){
    var myArray =[];
    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'noPengadaan';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&divisi='+divisi;
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var no = myArray[0].no; 
            const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "October", "November", "Desember"];
            const dateObj = new Date();
            const month = monthNames[dateObj.getMonth()];
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            const output = day+' '+month+' '+year; 

            var kd ="";
            if(status =='admin'){
                kd = 'AD';
            }
            else{
               kd ='US';
            }

            var pasCode ="";
            if(nDivisi =="Produksi"){
                pasCode ="PROD";
            }
            else if(nDivisi =="Purchasing"){
                pasCode="PURC";
            }
            else if(nDivisi =="PPIC-WH"){
                pasCode ="PPIC"
            } 
            else{
                pasCode ="NULL"
            }  

            document.getElementById('tanggal').value = output;    
            document.getElementById('pemohon').value = nUser; 
            var kode = pasCode+'/'+kd+'/'+no+'/'+year+'/'+idBulan+'/'+day ;  
            document.getElementById('kode').value = kode;
            noKode = kode;
            sheet = output;
            document.getElementById(nLoading).style.visibility = 'hidden';
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert(msg);
        },
    });   
}

$(document).ready(function(){
    if(indexs =="home"){}
    else if(indexs =="pengadaan"){
        $("#cData").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $('#myTable tr').filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
    }
    else if(indexs =="listpengadaan"){
        $("#cData1").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $('#mylistTable tr').filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
    }
    else if(indexs =="permintaan"){}
    else if(indexs =="listpermintaan"){}
    else if(indexs =="OKP"){}
    else if(indexs =="createOKP"){}
    else{}  
    
});

function myFunc() {
    nilaiPersetujuan ="";
    var tabs = "";
    if(indexs =="home"){}
    else if(indexs =="pengadaan"){
        if(nStatus =="admin" ||nStatus =="user"){
            var table = document.getElementById("myTable");
            document.getElementById("tbl_pilihan").style.display ="block";
            document.getElementById("tbl_pertanyaan").style.display ="none";
            document.getElementById('question').innerHTML ="Pilih Aksi Selanjutnya";
            
            var rows = table.rows;
            for (var i = 0; i < rows.length; i++) {
                rows[i].onclick = (function() {
                    var cnt = i;
                    return function() {
                        if(this.cells[12].innerHTML =="Pengajuan Pengadaan"||this.cells[12].innerHTML =="Revisi Pengadaan"){
                            document.getElementById('popQuestion').style.display ="block";
                            document.getElementById('tanggal').value = this.cells[2].innerHTML;
                            document.getElementById('kode').value = this.cells[1].innerHTML;  
                            var code = this.cells[1].innerHTML; 
                            document.getElementById('pemohon').value = this.cells[4].innerHTML;
                            document.getElementById('jabatan').value = this.cells[5].innerHTML;
                            document.getElementById('koBar').value = this.cells[6].innerHTML;
                            var mater = this.cells[6].innerHTML;
                            document.getElementById('koBar').readOnly = true;
                            document.getElementById('stok').value = this.cells[7].innerHTML;
                            document.getElementById('order').value = this.cells[8].innerHTML;
                            document.getElementById('satuan').value = this.cells[9].innerHTML;
                            document.getElementById('tTerima').value = this.cells[10].innerHTML;
                            document.getElementById('keterangan').value = this.cells[11].innerHTML;
                            var divisiN = this.cells[3].innerHTML;
                            document.getElementById('tipebarang').style.display = "none";
                            document.getElementById('spiKode').style.display = "none";
                            document.getElementById('pTipe').style.display = "none";
                            document.getElementById('koBar').style.display = "inline";
                            document.getElementById('koBar').style.width = "270px";
                            document.getElementById('rubahTipe').style.display = "inline";
                            nMaterial = this.cells[6].innerHTML;
                            nilaiPersetujuan = code+'|'+mater+'|'+divisiN
                    
                        }
                        else{
                            alert('status telah terverifikasi dan sedang menunggu verifikasi oleh PlanManager') ;
                        }
                    }    
                })(i);
            }
            }
        else{
            alert('tidak memiliki akses')
        }
    }
    else if(indexs =="listpengadaan"){
        var table = document.getElementById("mylistTable");
        var rows = table.rows;
        var statusUser = "";
        var statusPM ="";
        var divisiN ="";
        var supl ="";
        var users ="";
        var jabatan = "";
        var stok = ""; 
        var order = "";
        var satuan = "";
        var tanggal = "";
        var keterangan = "";

        var allIN = "";
        nilaiPersetujuan ="";
        for (var i = 0; i < rows.length; i++) {
            rows[i].onclick = (function() {
                var cnt = i;
                return function() {
                    var code = this.cells[1].innerHTML; 
                    var mater = this.cells[6].innerHTML;
                    
                    statusUser = this.cells[12].innerHTML;
                    statusPM = this.cells[13].innerHTML;
                    divisiN = this.cells[3].innerHTML;
                    supl = this.cells[14].innerHTML;
                    users = this.cells[4].innerHTML;

                    jabatan = this.cells[5].innerHTML;
                    stok = this.cells[7].innerHTML; 
                    order = this.cells[8].innerHTML;
                    satuan = this.cells[9].innerHTML;
                    tanggal = this.cells[10].innerHTML;
                    keterangan = this.cells[11].innerHTML;

                    allIN = code+'|'+divisiN+'|'+users+'|'+jabatan+'|'+mater+'|'+stok+'|'+order+'|'+satuan+'|'+tanggal+'|'+keterangan;
                    nilaiPersetujuan = code+'|'+mater+'|'+divisiN
                    console.log("statusUser :" +statusUser);
                    console.log("statusPM :" +statusPM);
                    if(nDivisi =="PlanManager"){
                        if(code =="Data Kosong"){
                            alert('Belum Ada Data')
                        }
                        else{
                            if(statusUser =="Terverifikasi" && statusPM =="Pengajuan Pengadaan"){
                                document.getElementById('yes-no').style.display ='block';
                            }
                            else if(statusUser =="Terverifikasi" && statusPM =="Pengajuan Ulang"){
                                document.getElementById('yes-no').style.display ='block';
                            }
                            
                            else if(statusUser =="Terverifikasi" && statusPM =="Terverifikasi"){
                                alert('Data Sudah Terverifikasi dan akan diteruskan proses oleh purchasing')
                            }
                            else{
                                alert('Belum Memiliki Akses Untuk Proses Selanjutnya pPM')
                            }
                        }
                        
                    }
                    else if (nDivisi =='Purchasing'){
                        if(code =="Data Kosong"){
                            alert('Belum Ada Data')
                        }
                        else{
                            if(statusUser =="Terverifikasi"){
                                document.getElementById('purcase').style.display ='block'; 
                            }
                            else{
                                if(divisiN =="Purchasing"){
                                    if(statusUser =="Revisi Pengadaan"){
                                        if(nUser == users){
                                            popsRev(allIN);
                                        }
                                        else{
                                            alert('Data Masih Proses Revisi');
                                        }
                                    }
                                    else{
                                        document.getElementById('yes-no').style.display ='block';
                                    }
                                    
                                }
                                else{
                                    alert('Belum Memilik Akses Selanjutnya')
                                }
                                
                            }
                            
                        }
                        
                    }
                    else{
                        if(code =="Data Kosong"){
                            alert('Belum Ada Data')
                        }
                        else{
                            if(nStatus =="admin"){
                                if(statusUser =="Pengajuan Pengadaan" && statusPM =="Belum Terverifikasi"){
                                    document.getElementById('yes-no').style.display ='block';
                                }
                                else if(statusUser =="Pengajuan Ulang" && statusPM =="Revisi Pengadaan"){
                                    document.getElementById('yes-no').style.display ='block';
                                }
                                else if(statusUser =="Terverifikasi" && statusPM =="Pengajuan Pengadaan"){
                                    document.getElementById('yes-no').style.display ='block';
                                }
                                else if(statusUser =="Terverifikasi" && statusPM =="Pengajuan Ulang"){
                                    document.getElementById('yes-no').style.display ='block';
                                }
                                else if(statusUser =="Terverifikasi" && statusPM =="Terverifikasi"){
                                }
                                else if(statusUser =="Revisi Pengadaan" && statusPM =="Belum Terverifikasi"){
                                    if(nUser == users){
                                        popsRev(allIN);
                                    }
                                    else{
                                        alert('Tidak Memiliki Akses Untuk Proses Revisi');
                                    }
                                }
                                else if(statusUser =="Revisi Pengadaan" && statusPM =="Revisi Pengadaan"){
                                    if(nUser == users){
                                        popsRev(allIN);
                                    }
                                    else{
                                        alert('Tidak Memiliki Akses Untuk Proses Revisi');
                                    }
                                }
                                else{
                                    alert('Belum Memiliki Akses Untuk Proses Selanjutnya PIC');
                                }
                            }
                            else{
                                if(statusUser =="Revisi Pengadaan" && statusPM =="Belum Terverifikasi"){
                                    if(nUser == users){
                                        popsRev(allIN);
                                    }
                                    else{
                                        alert('Tidak Memiliki Akses Untuk Proses Revisi');
                                    }
                                }
                                else if(statusUser =="Revisi Pengadaan" && statusPM =="Revisi Pengadaan"){
                                    if(nUser == users){
                                        popsRev(allIN)
                                    }
                                    else{
                                        alert('Tidak Memiliki Akses Untuk Proses Revisi');
                                    }
                                }
                                else{
                                    alert('Tidak Ada Akses Selanjutnya');
                                }
                                
                            }
                        }
                        
                    }
                    
                }    
            })(i);
        }
        
    }
    else if(indexs =="permintaan"){}
    else if(indexs =="listpermintaan"){}
    else if(indexs =="OKP"){}
    else if(indexs =="createOKP"){}
    else{}
    
}

function hapusPengadaan(){
    var myArray =[];
    var data = nilaiPersetujuan.split('|');
    var data1 = data[0];
    var data2 = data[1];
    var data3 = data[2];
    document.getElementById('popQuestion').style.display = 'none';
    document.getElementById(nLoading).style.visibility = 'visible';
        var func = 'revDeltPenga';
        var tambah = 'exec?func='+func+'&bulan='+idBulan+'&divisi='+data3+'&versi=delete&kode='+data1+'&material='+data2+
        '&jumlah=&catatan=&user=&tingkatan=';
        
        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                var ket = myArray[0].keterangan;
                alert(ket);
                document.getElementById(nLoading).style.visibility = 'hidden';
                lanjt(data3);
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    document.getElementById(nLoading).style.visibility = 'hidden';
            },
        });   

}

function savePengadaan(){
    var tanggal = document.getElementById("tanggal").value;
    var kode = document.getElementById("kode").value;
    var pemohon = document.getElementById("pemohon").value;
    var jabatan = document.getElementById("jabatan").value;
    var tipebarang = document.getElementById("tipebarang").value;
    var koBar = document.getElementById("koBar").value;
    var spiKode = document.getElementById("spiKode").value;
    var material = "";
    if(nMaterial ==""){
        if(tipebarang =="---"){
            material = ""; 
        }else if(tipebarang =="Extra"){
            material =koBar;
        }else{
            material = spiKode;
        }
    }
    else{
        material = nMaterial;
    }
    
    var stok = document.getElementById("stok").value;
    var order = document.getElementById("order").value;
    var satuan = document.getElementById("satuan").value;
    var Terima = document.getElementById("tTerima").value;
    var keterangan = document.getElementById("keterangan").value;
    var statusPengadaan="";
    if(status =='admin'){
        statusPengadaan = 'Terverifikasi';
    }
    else{
        statusPengadaan ='Pengajuan Pengadaan';
    }
    options1 = {day:'2-digit' ,month: 'long', year:'numeric'};
    var date = new Date(Terima);
    var tTerima = date.toLocaleString('id-ID',options1);
    
    if(nStatus =="admin" ||nStatus =="user"){
        if(pemohon == nUser){
            if(jabatan !="" &&stok !="" && satuan !="---"&& tTerima !="Invalid Date" &&order!=""){
                if(material == tipebarang || material ==""){
                    alert("Cek Nama Material");
                }
                else{
                    if(tipebarang !="Extra"){
                        saving()
                    }
                    else{
                        if(keterangan !=""){
                            saving()
                        }
                        else{
                            alert("Harap isi keterangan pengadaan terlebih dahulu"); 
                        }
                    }
                }
            }
            else{
                alert("Isi Seluruh Data");
            }
        }
        else{
            alert('Anda Tidak Memiliki Akses Untuk Edit Data');
        }
    }
    else{
        alert('anda tidak memiliki akses');
    }
}

function saving(){
    var myArray =[];
    document.getElementById(nLoading).style.visibility = 'visible';
    var tanggal = document.getElementById("tanggal").value;
    var kode = document.getElementById("kode").value;
    var pemohon = document.getElementById("pemohon").value;
    var jabatan = document.getElementById("jabatan").value;
    var tipebarang = document.getElementById("tipebarang").value;
    var koBar = document.getElementById("koBar").value;
    var spiKode = document.getElementById("spiKode").value;
    var material = "";
    if(document.getElementById("koBar").readOnly === true){
        material = koBar
    }
    else{
        if(tipebarang =="---"){
            material = ""; 
        }else if(tipebarang =="Extra"){
            material =koBar;
        }else{
            material = spiKode;
        }
    }
    
    var stok = document.getElementById("stok").value;
    var order = document.getElementById("order").value;
    var satuan = document.getElementById("satuan").value;
    var Terima = document.getElementById("tTerima").value;
    var keterangan = document.getElementById("keterangan").value;
    var statusPengadaan="";
    if(status =='admin'){
        statusPengadaan = 'Terverifikasi';
    }
    else{
        statusPengadaan ='Pengajuan Pengadaan';
    }
    options1 = {day:'2-digit' ,month: 'long', year:'numeric'};
    var date = new Date(Terima);
    var tTerima = date.toLocaleString('id-ID',options1);

    var func = 'simpanPengadaan';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&divisi='+nDivisi+
    '&tanggal='+tanggal+'&kode='+kode+'&pemohon='+pemohon+'&jabatan='+jabatan+'&material='+material+'&stok='+stok+
    '&jmlorder='+order+'&satuan='+satuan+'&tTerima='+tTerima+'&keterangan='+keterangan+
    '&status='+statusPengadaan+'&pengguna='+status+'&materialA='+nMaterial;
    
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var ket = myArray[0].keterangan;
            document.getElementById('upPop').style.display ="none";
            document.getElementById('popQuestion').style.display ="none";
            document.getElementById("tbl_pilihan").style.display ="block";
            document.getElementById("tbl_pertanyaan").style.display ="none";
            document.getElementById('question').innerHTML ="Pilih Aksi Selanjutnya";
            document.getElementById('tanggal').value = "";
            document.getElementById('kode').value = "";  
            document.getElementById('pemohon').value = "";
            document.getElementById('jabatan').value = "";
            document.getElementById('koBar').value = "";
            document.getElementById('stok').value = "";
            document.getElementById('order').value = "";
            document.getElementById('satuan').value = "---";
            document.getElementById('tipebarang').value = "---";
            document.getElementById('tTerima').value = "";
            document.getElementById('keterangan').value = "";
            document.getElementById('tipebarang').style.display = "inline";
            document.getElementById('pTipe').style.display = "inline";
            document.getElementById('koBar').style.display = "none";
            document.getElementById('koBar').style.width = "300px";
            document.getElementById('rubahTipe').style.display = "none";
            document.getElementById('koBar').readOnly = false;
            noKode = "";
            nMaterial ="";
            if(ket =="Data Tersimpan" ||ket =="Data Dirubah"){
                alert(ket);
                rPengadaan('tabelData','myTable');
            }
            else{
                alert('Data Error');
                document.getElementById(nLoading).style.visibility = 'hidden';
            }
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                document.getElementById('popQuestion').style.display ="none";
                document.getElementById("tbl_pilihan").style.display ="block";
                document.getElementById("tbl_pertanyaan").style.display ="none";
                document.getElementById('question').innerHTML ="Pilih Aksi Selanjutnya";
                document.getElementById('tanggal').value = "";
                document.getElementById('kode').value = "";  
                document.getElementById('pemohon').value = "";
                document.getElementById('jabatan').value = "";
                document.getElementById('koBar').value = "";
                document.getElementById('stok').value = "";
                document.getElementById('order').value = "";
                document.getElementById('satuan').value = "---";
                document.getElementById('tipebarang').value = "---";
                document.getElementById('tTerima').value = "";
                document.getElementById('keterangan').value = "";
                document.getElementById('tipebarang').style.display = "inline";
                document.getElementById('pTipe').style.display = "inline";
                document.getElementById('koBar').style.display = "none";
                document.getElementById('koBar').style.width = "300px";
                document.getElementById('rubahTipe').style.display = "none";
                document.getElementById('koBar').disabled = false;
                noKode = "";
                nMaterial ="";
                alert(msg);
        },
    });

}

/**********************************************GET nama Barang from tipe barang********************************************/
function spiiners() {
    var x = "";
    if(indexs =="pengadaan"){
        x = document.getElementById("tipebarang").value; 
        if(x == "---"){
            document.getElementById("koBar").style.display = 'none';
            document.getElementById("spiKode").style.display = 'none';
        }
        else if(x == "Extra"){
            document.getElementById("koBar").style.display = 'inline';
            document.getElementById("spiKode").style.display = 'none';
        }
        else{
            document.getElementById("pageLoad").style.visibility = 'visible';
            document.getElementById("koBar").style.display = 'none';
            document.getElementById("spiKode").style.display = 'inline'; 
            nBarangs(x,"spiKode");                
        }
    }
    else if(indexs =="permintaan"){
        x = document.getElementById("tBarangPermin").value; 
        console.log(x)
        nBarangs(x,"materiNama");  
    }
    else{} 
}  

function nBarangs(nil,spi){
    var myArray =[];
    var x = nil;
    var y = spi;
    var func = 'readNamaBarang';
        var tambah = 'exec?'+'func='+func+'&tipe='+x;  
        
        document.getElementById(y).options.length = 0;
        var xs = document.getElementById(y);
        document.getElementById(nLoading).style.visibility = 'visible';
        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                
                for(i =0; i<myArray.length; i=i+1){
                    var nilai = myArray[i].totalData;
                    var pass = myArray[i].id;
                    var status = myArray[i].kodeItem;
                    var option = document.createElement("option");
                    option.text = status;
                    xs.add(option, x[0]);    
                }
                
                document.getElementById(nLoading).style.visibility = 'hidden';
                
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    document.getElementById(nLoading).style.visibility = 'hidden';
                    alert(msg);
            },
        }); 
}

function spiBulan(){
    var bBulan = document.getElementById('pilihBul').value;
    if(bBulan =="---"){
        alert('Pilih Bulan')
    }
    else{
        if(bBulan =="---" || bBulan ==""){
            alert('Pilih Bulan')
        }else{
            idBulan = bBulan;
            document.getElementById(nLoading).style.visibility = 'visible';
            if(nStatus=='PlanManager'){
                planM();
                document.getElementById('tab_1').className ="";
                document.getElementById('tab_2').className ="";
                document.getElementById('tab_3').className ="";
                $("#mylistTable").empty();
            }
            else{
                rPengadaan('tListPengadaan','mylistTable');
                console.log('bBulan :' +idBulan);
            }
            
        }
    }
    
}

function tabSwitch(x){
    var newDiv ="";
    if(divisi =="PlanManager"){
        if(x =="Produksi"){
            newDiv ="Produksi";
            document.getElementById('tab_1').className ="active";
            document.getElementById('tab_2').className ="";
            document.getElementById('tab_3').className ="";
        }
        else if(x=="Purchasing"){
            newDiv ="Purchasing";
            document.getElementById('tab_1').className ="";
            document.getElementById('tab_2').className ="active";
            document.getElementById('tab_3').className ="";
        }
        else if(x =='PPIC-WH'){
            newDiv ="PPIC-WH";
            document.getElementById('tab_1').className ="";
            document.getElementById('tab_2').className ="";
            document.getElementById('tab_3').className ="active";
        }
        else{
            alert('Divisi Tidak Ada')
        }
    }
    else if(divisi =="Produksi"){
        alert('Tidak Memilik Akses');
    }
    else if(divisi =="Purchasing"){
        if(x =="Produksi"){
            newDiv ="Produksi";
            document.getElementById('tab_1').className ="active";
            document.getElementById('tab_2').className ="";
            document.getElementById('tab_3').className ="";
        }
        else if(x=="Purchasing"){
            newDiv ="Purchasing";
            document.getElementById('tab_1').className ="";
            document.getElementById('tab_2').className ="active";
            document.getElementById('tab_3').className ="";
        }
        else if(x =='PPIC-WH'){
            newDiv ="PPIC-WH";
            document.getElementById('tab_1').className ="";
            document.getElementById('tab_2').className ="";
            document.getElementById('tab_3').className ="active";
        }
        else{
            alert('Divisi Tidak Ada')
        }
    }
    else if(divisi =="PPIC-WH"){
        alert('Tidak Memilik Akses');
    }
    else{
        alert('Divisi Tidak Sesuai')
    }
    next(newDiv);
    console.log('newDiv :' +newDiv)
    
}

function next(x){
    var nilai = x;
    document.getElementById(nLoading).style.visibility = 'visible';
    var myArray =[];
    var func = 'tampilPengadaan';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&divisi='+nilai+'&kode&material';
    $.ajax({
        method:'GET',
        url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            arrayPengadaan =[];
            myArray = response.data;
            arrayPengadaan = response.data;
            myArray.reverse();  
            $("#mylistTable").empty();
            var table = document.getElementById('mylistTable');  
              
            for (var i = 0; i < myArray.length; i++){
                var warna ="";
                if(myArray[i].Supplier =='' && myArray[i].nopo ==''){
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="green";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else if(myArray[i].Supplier !='' && myArray[i].nopo ==''){
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="purple";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else if(myArray[i].Supplier !='' && myArray[i].nopo !=''){
                    
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="black";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else{}
                var pic = myArray[i].StatusVerify; 
                var PM = myArray[i].Status
                var row = `<tr onClick="myFunc(this)" title="Status Verify PIC:${pic} & Status Verify PM:${PM}">
                            <td style="color:${warna};font-weight: bold;">${i+1}
                            </td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Kode}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Tanggal}</td>                               
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Divisi}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Pemohon}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Jabatan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Material}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Stok}</td>
                            <td style="background-color: cadetblue;color:black;font-weight: bold;">${myArray[i].JumlahOrder}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Satuan}</td>
                            <td style="background-color: cadetblue;color:black;font-weight: bold;">${myArray[i].Tterima}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Keterangan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].StatusVerify}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Status}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Supplier}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].HargaSatuan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].diskon}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].nopo}</td>
                        </tr>`
                table.innerHTML += row
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            console.log(myArray);
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert(msg);
        },
    });
}

function lanjt(x){
    var nilai = x;
    document.getElementById(nLoading).style.visibility = 'visible';
    var myArray =[];
    var func = 'tampilPengadaan';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&divisi='+nilai+'&kode&material';
    
    $.ajax({
        method:'GET',
        url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            myArray.reverse();  
            $("#myTable").empty();
            var table = document.getElementById('myTable');  
              
            for (var i = 0; i < myArray.length; i++){
                var warna ="";
                if(myArray[i].Supplier =='' && myArray[i].nopo ==''){
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="green";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else if(myArray[i].Supplier !='' && myArray[i].nopo ==''){
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="purple";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else if(myArray[i].Supplier !='' && myArray[i].nopo !=''){
                    
                    if(myArray[i].StatusVerify =='Pengajuan Pengadaan' && myArray[i].Status =="Belum Terverifikasi"){
                        warna ="red";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Pengajuan Pengadaan"){
                        warna ="blue";
                    }
                    else if(myArray[i].StatusVerify =='Terverifikasi' && myArray[i].Status =="Terverifikasi"){
                        warna ="black";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status ==""){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Revisi Pengadaan' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="orangered";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                        warna ="brown";
                    }
                    else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                        warna ="brown";
                    }
                    else{}
                }
                else{}
                var pic = myArray[i].StatusVerify; 
                var PM = myArray[i].Status
                var row = `<tr onClick="myFunc(this)" title="Status Verify PIC:${pic} & Status Verify PM:${PM}">
                            <td style="color:${warna};font-weight: bold;">${i+1}
                            </td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Kode}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Tanggal}</td>                               
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Divisi}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Pemohon}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Jabatan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Material}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Stok}</td>
                            <td style="background-color: cadetblue;color:black;font-weight: bold;">${myArray[i].JumlahOrder}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Satuan}</td>
                            <td style="background-color: cadetblue;color:black;font-weight: bold;">${myArray[i].Tterima}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Keterangan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].StatusVerify}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Status}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].Supplier}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].HargaSatuan}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].diskon}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].nopo}</td>
                        </tr>`
                table.innerHTML += row
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            console.log(myArray);
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert(msg);
        },
    });
}

/*****************************************List Penga************************************************************* */
function close_yesNo(){
    document.getElementById('yes-no').style.display ='none';
    nilaiPersetujuan =""
}

function revPengadaan(){
    document.getElementById('win-1').style.display ='none';
    document.getElementById('win-2').style.display ='none';
    document.getElementById('win-3').style.display ='block';
}

function veryPengadaan(){
    document.getElementById('ket-rev').value ="";
    document.getElementById('win-1').style.display ='none';
    document.getElementById('win-2').style.display ='block';
    document.getElementById('win-3').style.display ='none';
}

function tdkRev(){
    document.getElementById('ket-rev').value ="";
    document.getElementById('win-1').style.display ='block';
    document.getElementById('win-2').style.display ='none';
    document.getElementById('win-3').style.display ='none';
}

function tdkVerify(){
    document.getElementById('win-1').style.display ='block';
    document.getElementById('win-2').style.display ='none';
    document.getElementById('win-3').style.display ='none';
}

function yaRev(){
    var myArray =[];
    var x = document.getElementById('ket-rev').value;
    var data = nilaiPersetujuan.split('|');
    var data1 = data[0];
    var data2 = data[1];
    var data3 = data[2];
    document.getElementById('yes-no').style.display ='none';
    if(x ==""){
        alert('harap isi keterangan revisi');
    }
    else{
        document.getElementById(nLoading).style.visibility = 'visible';
        var func = 'revPengadaan';
        var tambah = 'exec?func='+func+'&bulan='+idBulan+'&divisi='+data3+'&kode='+data1+'&material='+data2+'&user='+nUser+
        '&tingkatan='+nStatus+'&revisi='+x;
        
        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                var ket = myArray[0].keterangan;
                console.log(ket);
                alert(ket);
                document.getElementById('win-1').style.display ='block';
                document.getElementById('win-2').style.display ='none';
                document.getElementById('win-3').style.display ='none';
                next(data3);
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    document.getElementById('win-1').style.display ='block';
                    document.getElementById('win-2').style.display ='none';
                    document.getElementById('win-3').style.display ='none';
                    document.getElementById(nLoading).style.visibility = 'hidden';
            },
        });
    }
}

function yaVerify(){
    var myArray =[];
    var data = nilaiPersetujuan.split('|');
    var data1 = data[0];
    var data2 = data[1];
    var data3 = data[2];
    document.getElementById(nLoading).style.visibility = 'visible';
    document.getElementById('yes-no').style.display ='none';
        var func = 'revPengadaan';
        var tambah = 'exec?func='+func+'&bulan='+idBulan+'&divisi='+data3+'&kode='+data1+'&material='+data2+'&user='+nUser+
        '&tingkatan='+nStatus+'&revisi=';
        
        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                var ket = myArray[0].keterangan;
                alert(ket);
                document.getElementById('win-1').style.display ='block';
                document.getElementById('win-2').style.display ='none';
                document.getElementById('win-3').style.display ='none';
                document.getElementById(nLoading).style.visibility = 'hidden';
                next(data3);
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    document.getElementById('win-1').style.display ='block';
                    document.getElementById('win-2').style.display ='none';
                    document.getElementById('win-3').style.display ='none';
                    document.getElementById(nLoading).style.visibility = 'hidden';
            },
        });
}

/*****************************************purcpenga************************************************************* */


function ex_pur(){
    nilaiPersetujuan =""
    document.getElementById("purcase").style.display ="none";
    document.getElementById('pur-1').style.display ='block';
    document.getElementById('pur-2').style.display ='none';
    document.getElementById('pur-3').style.display ='none';
}

function canSupl(){
    document.getElementById('pur-1').style.display ='block';
    document.getElementById('pur-2').style.display ='none';
    document.getElementById('pur-3').style.display ='none';
    document.getElementById('namSup').value ="pilih supplier"
    document.getElementById('harga-barang').value = "";
    document.getElementById('disk-harga').value ="";
    document.getElementById('nilai-po').value ="";
}

function supPurc(){
    document.getElementById('pur-1').style.display ='none';
    document.getElementById('pur-2').style.display ='block';
    document.getElementById('pur-3').style.display ='none';
    document.getElementById('namSup').value ="pilih supplier"
    document.getElementById('harga-barang').value = "";
    document.getElementById('disk-harga').value ="";
    document.getElementById('nilai-po').value ="";
    namaSuppli();
}

function namaSuppli(){
    document.getElementById(nLoading).style.visibility = 'visible';
    document.getElementById("purcase").style.display ="none";
    var func = 'readNamaExpro';
    var tambah = 'exec?'+'func='+func;  
    document.getElementById("namSup").options.length = 0;
    var xs = document.getElementById("namSup");
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            for(i =0; i<myArray.length; i=i+1){
                var nilai = myArray[i].expro;
                var option = document.createElement("option");
                option.text = nilai;
                xs.add(option);    
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            document.getElementById("purcase").style.display ="block";
            document.getElementById('pur-1').style.display ='none';
            document.getElementById('pur-2').style.display ='block';
            document.getElementById('pur-3').style.display ='none';
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                document.getElementById("purcase").style.display ="block";
                document.getElementById('pur-1').style.display ='none';
                document.getElementById('pur-2').style.display ='block';
                document.getElementById('pur-3').style.display ='none';
                alert(msg);
        },
    });    
}
function purchPO(){
    document.getElementById('pur-1').style.display ='none';
    document.getElementById('pur-2').style.display ='none';
    document.getElementById('pur-3').style.display ='block';
    document.getElementById('namSup').value ="pilih supplier"
    document.getElementById('harga-barang').value = "";
    document.getElementById('disk-harga').value ="";
    document.getElementById('nilai-po').value ="";
}

function simSup(){
    var ex = document.getElementById('namSup').value;
    var har = document.getElementById('harga-barang').value;
    var dis = document.getElementById('disk-harga').value;
    var po = "";   
    console.log('har :' +har); 
    if(ex !="---" && har !="" && dis !=""){
        simpAll(ex,har,dis,po);
        document.getElementById("purcase").style.display ="none";
        document.getElementById('pur-1').style.display ='block';
        document.getElementById('pur-2').style.display ='none';
        document.getElementById('pur-3').style.display ='none';
    }
    else{
        alert('Isi Seluruh Data');
    }
}    

function simPO(){
    var ex = "";
    var har = "";
    var dis = "";
    var po = document.getElementById('nilai-po').value;
    if(po !=""){
        simpAll(ex,har,dis,po);
        document.getElementById("purcase").style.display ="none";
        document.getElementById('pur-1').style.display ='block';
        document.getElementById('pur-2').style.display ='none';
        document.getElementById('pur-3').style.display ='none';
    }
    else{
        alert('Harap Isi No PO');
    }
}

function simpAll(a,b,c,d){
    document.getElementById(nLoading).style.visibility = 'visible';
    var data = nilaiPersetujuan.split('|');
    var data1 = data[0];//code
    var data2 = data[1];//mat
    var data3 = data[2];//div
    var expro = a;
    var ha_ga = b;
    var dic = c;
    var nPO = d;
    var myArray =[];
    var func = 'regPurPengadaan';
    var tambah = 'exec?func='+func+'&bulan='+idBulan+'&divisi='+data3+'&kode='+data1+'&material='+data2+
                '&supplier='+expro+'&harga='+ha_ga+'&diskon='+dic+'&nopo='+nPO.toUpperCase();
        
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var nilai = myArray[0].keterangan;
            alert(nilai);
            document.getElementById(nLoading).style.visibility = 'hidden';
            nilaiPersetujuan ="";
            next(data3);
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            }
            else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            document.getElementById("purcase").style.display ="block";
            document.getElementById('pur-1').style.display ='block';
            document.getElementById('pur-2').style.display ='none';
            document.getElementById('pur-3').style.display ='none';
            alert(msg);
        },
    });
}

/*****************************************popRevisiPenga************************************************************* */
function batalRev(){
    document.getElementById('revPeng').style.display = "none";
}

function popsRev(x){
    document.getElementById('revPeng').style.display = "block";
    var data = x
    var nilai = x.split('|');
    document.getElementById('kodeRev').value = nilai[0];
    document.getElementById('pemohonRev').value = nilai[2];
    document.getElementById('jabatanRev').value = nilai[3];
    document.getElementById('materiRev').value = nilai[4];
    document.getElementById('stokRev').value = nilai[5];
    document.getElementById('orderRev').value = nilai[6];
    document.getElementById('satuanRev').value = nilai[7];
    document.getElementById('tanggalRev').value = nilai[8];
    document.getElementById('keteranganRev').value = nilai[9];
}

function saveRev(){
    var codes = document.getElementById('kodeRev').value;
    var use = document.getElementById('pemohonRev').value;
    var ord = document.getElementById('orderRev').value;
    var keter = document.getElementById('keteranganRev').value;

    if(keter ==""){
        alert('Keterangan Harap Diisi');
    }
    else{
        var myArray =[];
        var data = nilaiPersetujuan.split('|');
        var data1 = data[0];
        var data2 = data[1];
        var data3 = data[2];
        console.log('nUser :' +nUser)
        document.getElementById(nLoading).style.visibility = 'visible';
        document.getElementById('revPeng').style.display = "none";
        var func = 'revDeltPenga';
        var tambah = 'exec?func='+func+'&bulan='+idBulan+'&divisi='+data3+'&versi=write&kode='+data1+'&material='+data2+
        '&jumlah='+ord+'&catatan='+keter+'&user='+nUser+'&tingkatan='+nStatus;
        
        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                var ket = myArray[0].keterangan;
                alert(ket);
                document.getElementById(nLoading).style.visibility = 'hidden';
                next(data3);
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    document.getElementById(nLoading).style.visibility = 'hidden';
            },
        });
        
    }
}

function rep(){
    var myArray =[];
    var data = nilaiPersetujuan.split('|');
    var data1 = data[0];
    var data2 = data[1];
    var data3 = data[2];

    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'revDeltPenga';
    var tambah = 'exec?func='+func+'&bulan='+idBulan+'&divisi='+data3+'&versi=write&kode='+data1+'&material='+data2+
        '&jumlah=&catatan=&user=&tingkatan='+nStatus;

        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                var ket = myArray[0].keterangan;
                alert(ket);
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert('Permintaan Revisi:\n ' +ket);
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    document.getElementById(nLoading).style.visibility = 'hidden';
            },
        });
    
}

/*****************************************oksya************************************************************* */
function Switch(new_tab, new_content) {
    document.getElementById('contents_1').style.display = 'none';
    document.getElementById('contents_2').style.display = 'none';       
    document.getElementById(new_content).style.display = 'inline-table';   

    document.getElementById('tabss_1').className = '';
    document.getElementById('tabss_2').className = '';       
    document.getElementById(new_tab).className = 'active';     
    
    batalPermi();
    
}

function batalPermi(){
    document.getElementById('noInput').value = kodeNomer;
    document.getElementById('nmProdu').value ='---';
    document.getElementById('coOKP').value ='';
    document.getElementById('jBatch').value ='';
    document.getElementById('vPacking').value ='';
    document.getElementById('RevisiProd').value ='';
    document.getElementById('pointNote').value ='';
    document.getElementById('pointNote1').value ='';
    document.getElementById('ketNote').value ='';
    document.getElementById('ketNote1').value ='';
}

function tutupOKP(){
    document.getElementById('popsOKP').style.display ="none"; 
}

function btl_btn(){
    document.getElementById('pilihanOKP').style.display ="block";
    document.getElementById('buatOKP').style.display ="none";
    document.getElementById('lanjutOKP').style.display ="none";
    document.getElementById('tOKP').value ="";
    document.getElementById('ketRev').value = "";
    document.getElementById('tProduksi').value ="";
    document.getElementById('tRevisi').value = "";
    document.getElementById('kodeOKP').value = "";
}

function newOKP(){
    document.getElementById('pilihanOKP').style.display ="none";
    document.getElementById('buatOKP').style.display ="block";
    document.getElementById('lanjutOKP').style.display ="none";
    document.getElementById('tOKP').value ="";
    document.getElementById('ketRev').value = "";
    document.getElementById('tProduksi').value ="";
    document.getElementById('tRevisi').value = "";
    document.getElementById('kodeOKP').value = "";

}

function lanjutOKP(){
    document.getElementById('pilihanOKP').style.display ="none";
    document.getElementById('buatOKP').style.display ="none";
    document.getElementById('lanjutOKP').style.display ="inline";
    document.getElementById('tOKP').value ="";
    document.getElementById('ketRev').value = "";
    document.getElementById('tProduksi').value ="";
    document.getElementById('tRevisi').value = "";
    document.getElementById('kodeOKP').value = "";

    document.getElementById('dataBulan').value = idBulan;
    gBulan();
}

function gBulan(){
    var bul = "";
    var select = "";
    var dataOKP = "";
    if(indexs =="OKP"){
        bul =document.getElementById("dataBulan").value;
        select = document.getElementById("dataOKP");
        dataOKP = document.getElementById('dataOKP');
        document.getElementById('popsOKP').style.display ="none";
    }
    else if(indexs =="listOKP"){
        bul =document.getElementById("bulan-List").value;
        select = document.getElementById("kodeOKPS");
        dataOKP = document.getElementById('kodeOKPS');
    }
    else if(indexs =="permintaan"){
        bul =document.getElementById("dBulanPermin").value;
        select = document.getElementById("dBarangPermint");
        dataOKP = document.getElementById('dBarangPermint');
        document.getElementById('pilihTipe').style.display ="none";
    }
    else if(indexs =="listpermintaan"){
        bul =document.getElementById("dListBulanPermin").value;
        select = document.getElementById("dListBarangPermint");
        dataOKP = document.getElementById('dListBarangPermint');
        document.getElementById('pilihListTipe').style.display ="none";
    }
    else{} 
    console.log("bul :" +bul);
    idBulan = bul;
    var myArray =[];
    
    var length = select.options.length;
    for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
    }
    var a = 'idsheetOKP';
    var tambah = 'exec?'+'func='+a+'&bulan='+idBulan;
    document.getElementById(nLoading).style.visibility = 'visible';
    $.ajax({
    method:'GET',
    url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
                
            for (var i = 0; i < myArray.length; i++){
                var nilai =myArray[i].dataSheet;
                var option = document.createElement("option");
                option.text = nilai;
                dataOKP.add(option);
                console.log('nilai :' +nilai)
            }
            if(indexs =="OKP"){
                document.getElementById('popsOKP').style.display ="block";
                document.getElementById('pilihanOKP').style.display ="none";
                document.getElementById('buatOKP').style.display ="none";
                document.getElementById('lanjutOKP').style.display ="inline";
                console.log(myArray);
            }
            else if(indexs =="listOKP"){
            }
            else if(indexs =="permintaan"){
                document.getElementById('pilihTipe').style.display ="block";
            }
            else if(indexs =="listpermintaan"){
                document.getElementById('pilihListTipe').style.display ="block";
            }
            else{} 
            
            document.getElementById(nLoading).style.visibility = 'hidden'; 
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
                if(indexs =="OKP"){
                    document.getElementById('popsOKP').style.display ="block";
                    document.getElementById('pilihanOKP').style.display ="none";
                    document.getElementById('buatOKP').style.display ="none";
                    document.getElementById('lanjutOKP').style.display ="inline";
                    console.log(myArray);
                }
                else if(indexs =="listOKP"){
                }
                else if(indexs =="permintaan"){
                    document.getElementById('pilihTipe').style.display ="block";
                }
                else if(indexs =="permintaan"){
                    document.getElementById('pilihListTipe').style.display ="block";
                }
                else{} 
                document.getElementById(nLoading).style.visibility = 'hidden';
        },
    
    });    
}

function next_btn(){
    sheetOKP =""
    var namSheet = document.getElementById('dataOKP').value;
    sheetOKP = namSheet;
    console.log("namasheet :" +namSheet)
    if (namSheet =="Sheet1" ||namSheet ==""){
        alert("Data Tidak Ada Pilih Nama Sheet Terlebih Dahulu") 
    }
    else{
        document.getElementById('popsOKP').style.display ="none";
        DataOK();  
    }
}

function ceknoOKP(){
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "October", "November", "Desember"];
    var tOKP = document.getElementById('tOKP').value;
    var tOKP1 = document.getElementById('tProduksi').value;
    const date = new Date(tOKP);
    const date1 = new Date(tOKP1);
    const month = monthNames[date.getMonth()];
    const month1 = monthNames[date1.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const day1 = String(date1.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const year1 = date1.getFullYear();
                    
    const dateNow = day+' '+month+' '+year; 
    const dateNow1 = day1+' '+month1+' '+year1;
    tanggalOKP ="";
    tanggalOKP = dateNow1;
    options = {month: '2-digit'};
    const bulanID = date1.toLocaleString('id-ID',options);
    idBulan = bulanID;
    var myArray =[];
    var func = 'idsheetOKP';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&namaSheet='+dateNow;
    var romawi =""

    if(bulanID =="1"||bulanID =="01"){romawi ="I" }
    else if(bulanID =="2"||bulanID =="02"){romawi ="II"}
    else if(bulanID =="3"||bulanID =="03"){romawi ="III"}
    else if(bulanID =="4"||bulanID =="04"){romawi ="IV"}
    else if(bulanID =="5"||bulanID =="05"){romawi ="V"}
    else if(bulanID =="6"||bulanID =="06"){romawi ="VI"}
    else if(bulanID =="7"||bulanID =="07"){romawi ="VII"}
    else if(bulanID =="8"||bulanID =="08"){romawi ="VIII"}
    else if(bulanID =="9"||bulanID =="09"){romawi ="IX"}
    else if(bulanID =="10"){romawi ="X"}
    else if(bulanID =="11"){romawi ="XI"}
    else if(bulanID =="12"){romawi ="XII"}
    else{romawi ="null"}
    console.log('tambah :' +tambah);
    document.getElementById(nLoading).style.visibility = 'visible';
    document.getElementById('popsOKP').style.display = 'none';
    var mNila = [];
    var nilai = '';
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;  
            var no = myArray[0].No;
            
            var numb =""
            if(no <10){
                numb ='0'+no;
            }
            else{
                numb = no;
            }
            document.getElementById('kodeOKP').value = numb+'/OKP/PPIC/DEE/'+romawi+'/'+year;
            console.log('dateNow :' +dateNow);
            console.log('dateNo1 :' +dateNow1);
            document.getElementById(nLoading).style.visibility = 'hidden';
            document.getElementById('popsOKP').style.display = 'block';
            document.getElementById('pilihanOKP').style.display ="none";
            document.getElementById('buatOKP').style.display ="block";
            document.getElementById('lanjutOKP').style.display ="none";
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
                document.getElementById(nLoading).style.visibility = 'hidden';
                document.getElementById('popsOKP').style.display = 'block';
                document.getElementById('pilihanOKP').style.display ="none";
                document.getElementById('buatOKP').style.display ="block";
                document.getElementById('lanjutOKP').style.display ="none";
        },
    });   
}

function revisiKet(){
    var data = document.getElementById("ketRev").value;
    if(data !=""){
        document.getElementById('rev').style.display = 'inline';
    }
    else{
        document.getElementById('rev').style.display = 'none';
    }
}

function btnCreate(){
    sheetOKP ="";
    options1 = {day:'2-digit' ,month: 'long', year:'numeric'};
    
    var noOKP = document.getElementById('kodeOKP').value;
    var Prod = document.getElementById('tProduksi').value;
    var OKP = document.getElementById('tOKP').value;
    var revi = document.getElementById('tRevisi').value;
    var ketRev = document.getElementById("ketRev").value;
    var date = new Date(Prod);
    var date1 = new Date(OKP);
    var date2 = new Date(revi);

    var tglProd = date.toLocaleString('id-ID',options1);
    var tglOKP = date1.toLocaleString('id-ID',options1);
    var tglRevi = "";

    if(ketRev ==""){
        sheetOKP = tglOKP;
        tglRevi ="";
    }else{
        sheetOKP = tglOKP+' '+ketRev;
        tglRevi = date2.toLocaleString('id-ID',options1);
    }
    var myArray =[];
    var func = 'createOKP';
    var tambah = 'exec?func='+func+'&bulan='+idBulan+'&namaSheet='+sheetOKP+'&noOKp='+noOKP
                +'&tglOKP='+tglOKP+'&tglProd='+tglProd+'&tglRev='+tglRevi+'&rev='+ketRev;

    if(tglRevi!="Invalid Date"&& tglOKP !="Invalid Date"&&tglProd !="Invalid Date"&&noOKP !=""){
        document.getElementById(nLoading).style.visibility = 'visible';
        document.getElementById('popsOKP').style.display = 'none';
    
        $.ajax({
            method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                myArray =[];
                myArray = response.data;
                var nilai =myArray[0].keterangan;
                alert(nilai);
                document.getElementById(nLoading).style.visibility = 'hidden';
                DataOK()
            },
            error:function(jqXHR, exception){
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                    document.getElementById(nLoading).style.visibility = 'hidden';
                    document.getElementById('popsOKP').style.display = 'block';
                    document.getElementById('pilihanOKP').style.display ="none";
                    document.getElementById('buatOKP').style.display ="block";
                    document.getElementById('lanjutOKP').style.display ="none";
            },
        });
    }
    else{
        alert('lengkapi seluruh data');
    }
}

function cariOKPS(){
    sheetOKP ="";
    sheetOKP = document.getElementById('kodeOKPS').value;
    DataOK();
}

function DataOK(){
    kodeNomer =""
    var myArray =[];
    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'readOKP';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&namSheet='+sheetOKP;
    var tabs ="";
    var tfoot ="";
    if(indexs =="OKP"){
        tabs ="tableOKP";
        tfoot ="fTableOKP";
    }
    else if(indexs =="listOKP"){
        tabs ="tablelistOKP";
        tfoot ="fTablelistOKP";
    }
    else if(indexs =="permintaan"){
        tabs="poplistOKP"
        tfoot ="posOKP";
    }
    else{} 

    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var table = document.getElementById(tabs) ;
            var table1 = document.getElementById(tfoot) ;
            $("#"+tabs+" tr").remove(); 
            $("#"+tfoot+" tr").remove(); 
            var nKet = myArray[0].keterangan;
            
            if(indexs =="OKP"){
                document.getElementById("idokp").value = myArray[0].noOKp;
                document.getElementById("tangok").value = myArray[0].tglOKP;
                document.getElementById("tangpro").value = myArray[0].tglProd;
                document.getElementById("idRev").value = myArray[0].rev;
                document.getElementById("tangrev").value = myArray[0].tglRev;
            }
            else if(indexs =="listOKP"){
                document.getElementById("idokp").value = myArray[0].noOKp;
                document.getElementById("tangok").value = myArray[0].tglOKP;
                document.getElementById("tangpro").value = myArray[0].tglProd;
                document.getElementById("idRev").value = myArray[0].rev;
                document.getElementById("tangrev").value = myArray[0].tglRev;
            }
            else if(indexs =="permintaan"){
                document.getElementById("idPopokp").value = myArray[0].noOKp;
                document.getElementById("idPoptangok").value = myArray[0].tglOKP;
                document.getElementById("idPoptangpro").value = myArray[0].tglProd;
                document.getElementById("idPopRev").value = myArray[0].rev;
                document.getElementById("idPoptangrev").value = myArray[0].tglRev;
            }
            else{} 
            if(nKet =="Isi"){
                for (var i = 0; i < myArray.length; i++){
                    var row = `<tr onClick="FuncOK(this)">
                                <td>${myArray[i].no}</td>
                                <td>${myArray[i].kodeOkP}</td>                               
                                <td>${myArray[i].namProd}</td>
                                <td>${myArray[i].batch}</td>
                                <td>${myArray[i].varpac}</td>
                                <td style="border-top: 1px solid black;border-bottom: 1px solid black;">${myArray[i].revisi}</td>
                            </tr>`
                    table.innerHTML += row;
                }
                var rows = `<tr">
                                <td colspan="3"><p style="text-align: center;">Jumlah</p></td>
                                <td>${myArray[0].jBarang}</td>
                                <td></td>
                                <td></td>
                            </tr>`
                table1.innerHTML += rows;
                if(indexs =="OKP"){
                    document.getElementById('noInput').value = myArray.length+1;
                    kodeNomer = myArray.length+1;
                }
                else{} 
                
            }
            else{
                if(indexs =="OKP"){
                    document.getElementById('noInput').value = 1;
                    kodeNomer = 1;
                    alert('OKP kosong');
                }
                else{} 
                
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            bacaNote();    
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
            document.getElementById(nLoading).style.visibility = 'hidden';
        },
    });

}

function FuncOK(){
    if(indexs =="OKP"){
        var table = document.getElementById("tableOKP");
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
            rows[i].onclick = (function() { 
                var cnt = i;
                return function() { 
                    var no = this.cells[0].innerHTML;
                    var kode = this.cells[1].innerHTML;
                    var namaMaterial = this.cells[2].innerHTML;
                    var jum = this.cells[3].innerHTML;
                    var varPack = this.cells[4].innerHTML;
                    var revi = this.cells[5].innerHTML;
                    console.log('namaMaterial :' +namaMaterial)
                    document.getElementById('contents_1').style.display = 'inline-table';
                    document.getElementById('contents_2').style.display = 'none';         
                
                    document.getElementById('tabss_1').className = 'active';
                    document.getElementById('tabss_2').className = '';  

                    document.getElementById('noInput').value = no;
                    document.getElementById('nmProdu').value = namaMaterial;
                    document.getElementById('coOKP').value = kode;
                    document.getElementById('jBatch').value = jum;
                    document.getElementById('vPacking').value = varPack;
                    document.getElementById('RevisiProd').value = revi;
                    document.getElementById('pointNote').value ='';
                    document.getElementById('pointNote1').value ='';
                    document.getElementById('ketNote').value ='';
                    document.getElementById('ketNote1').value ='';
                }    
            })(i);
        }
    }
    else{}
}

function bacaNote(){
    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'readNoteOKP';
    var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&namSheet='+sheetOKP;//+namSheet;
    var myArray =[];
    var tabs ="";
    if(indexs =="OKP"){
        tabs ="myTableNoteOKP";
    }
    else if(indexs =="listOKP"){
        tabs ="myTablelistNoteOKP";
    }
    else if(indexs =="permintaan"){
        tabs="popListNote"
    }
    else{} 
    
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var table = document.getElementById(tabs) ;
            $("#"+tabs+" tr").remove(); 
            var nKet = myArray[0].keterangan;

            if(nKet =="Isi"){
                for (var i = 0; i < myArray.length; i++){
                    var row = `<tr onClick="FuncNote(this)">
                                <td>${myArray[i].note}</td>
                                <td style="border-top: 1px solid black;border-bottom: 1px solid black;">${myArray[i].ketNote}</td>
                            </tr>`
                    table.innerHTML += row;
                }
            }
            else{
                alert('Note Kosong');
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            if(indexs =="OKP"){
                if(arr.length == 0){
                    bacaProduk();
                }
                else {} 
            }
            else{} 
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
            document.getElementById(nLoading).style.visibility = 'hidden';
        },
    });
}

function FuncNote(){
    if(index =="OKP"){
        var table = document.getElementById("myTableNoteOKP");
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
            rows[i].onclick = (function() { 
                var cnt = i;
                return function(){
                    var poin = this.cells[0].innerHTML;
                    var nilai = this.cells[1].innerHTML;
                    document.getElementById('contents_1').style.display = 'none';
                    document.getElementById('contents_2').style.display = 'inline-table';         
                
                    document.getElementById('tabss_1').className = '';
                    document.getElementById('tabss_2').className = 'active';    

                    document.getElementById('noInput').value = kodeNomer;
                    document.getElementById('nmProdu').value = '---';
                    document.getElementById('coOKP').value = '';
                    document.getElementById('jBatch').value = '';
                    document.getElementById('vPacking').value = '';
                    document.getElementById('RevisiProd').value = '';
                    document.getElementById('pointNote').value = poin ;
                    document.getElementById('pointNote1').value = poin;
                    document.getElementById('ketNote').value = nilai;
                    document.getElementById('ketNote1').value =nilai;
                }
    
            })(i);
        }
    }
    else{}
}

function bacaProduk(){
    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'nabarOKP';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan;//+namSheet;
    var mArray =[];
    $.ajax({
        method:'GET',
        url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            document.getElementById(nLoading).style.visibility = 'hidden';
            myArray =[];
            myArray = response.data;
            var namPr = document.getElementById('nmProdu');
            $("#namPr").remove();
            var tion = document.createElement("option");
            tion.text = "---";
            namPr.add(tion);
            for (var i = 0; i < myArray.length; i++){
                var nilai =myArray[i].namaOKP;
                var nil =myArray[i].kode;
                var vari =myArray[i].varian;
                arr.push(nilai+"|"+nil+"|"+vari);
                var option = document.createElement("option");
                option.text = nilai;
                namPr.add(option);
            }
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
            document.getElementById(nLoading).style.visibility = 'hidden';
        },
    });

}

function spinnerkode(){
    var x ="";
    var p = document.getElementById("noInput").value;
    
    if(p <10){
        x = "0"+p;
    }
    else{
        x = p;
    }
    var tangok = document.getElementById("tangok").value;
    var nil = tangok.split(' ');
    var a = nil[0];
    var b = nil [1];
    var c = nil [2];
    var bul = "";
    if(b =="Januari"){
        bul ="01";
    }
    else if(b =="Februari"){
        bul ="02";
    }
    else if(b =="Maret"){
        bul ="03";
    }
    else if(b =="April"){
        bul ="04";
    }
    else if(b =="Mei"){
        bul ="05";
    }
    else if(b =="Juni"){
        bul ="06";
    }
    else if(b =="Juli"){
        bul ="07";
    }
    else if(b =="Agustus"){
        bul ="08";
    }
    else if(b =="September"){
        bul ="09";
    }
    else if(b =="Oktober"){
        bul ="10";
    }
    else if(b =="November"){
        bul ="11";
    }
    else if(b =="Desember"){
        bul ="12";
    }
    else{
        bul ="XX";
    }
    var tahun = c.substring(2);
    var Produ = document.getElementById("nmProdu").value;

    for (var i = 0; i < arr.length; i++){
        var nilai = arr[i].split("|");
        var nama = nilai[0];
        var kode = nilai[1];
        var varia = nilai[2];
        if(nama == Produ){
            var coOKP = "OKP"+kode+tahun+bul+a+x;
            document.getElementById("coOKP").value =coOKP;
            document.getElementById("vPacking").value =varia;
        }
        else{}
    }

}

function savePermi(){
    saveAllPermnt('permint');
}

function saveNote(){
    saveAllPermnt('notes');
}

function saveAllPermnt(x){
    var tip = x;
    var inpNo = document.getElementById('noInput').value;
    var nProduk = document.getElementById('nmProdu').value;
    var nKodeOK = document.getElementById('coOKP').value;
    var nJbatch = document.getElementById('jBatch').value;
    var nVpack = document.getElementById('vPacking').value;
    var nRevpro = document.getElementById('RevisiProd').value;
    var nPoinote =document.getElementById('pointNote').value;
    var nPoinotes =document.getElementById('pointNote1').value;
    var nKetnote = document.getElementById('ketNote').value;
    var nKetnotes = document.getElementById('ketNote1').value;

    var nNote ="";
    var nNoteNew="";
    var pNote ="";
    var pNoteNew ="";

    if(nKetnotes ==""){
        nNote = nKetnote;
        nNoteNew = "";
    }
    else{
        nNote = nKetnotes;
        nNoteNew = nKetnote;
    }

    if(nPoinotes ==""){
        pNote = nPoinote;
        pNoteNew = "";
    }
    else{
        pNote = nPoinotes;
        pNoteNew = nPoinote;
    }

    if(x =='permint'){
        if(inpNo!= "" && nProduk!= "" && nKodeOK!= "" && nJbatch!= "" &&nVpack!= "" &&nRevpro!= ""){
            simpanPer('permint');
            alert(inpNo+'|'+nProduk+'|'+nKodeOK+'|'+nJbatch+'|'+nVpack+'|'+nRevpro);
        }
        else{
            alert('Harap Lengkapi Seluruh Data');
        }
    }
    else if(x =='notes'){
        if(nPoinote== "" &&nKetnote== ""){
            alert('Harap Lengkapi Seluruh Data');
        }
        else{
            simpanPer('notes');
            alert(pNote+'|'+pNoteNew+'|'+nNote+'|'+nNoteNew); 
        } 
    }
    else{
        alert('Peringatan!! Proses Penyimpanan Salah');
    }
}

function simpanPer(x){ 
    var tip = x;
    var inpNo = document.getElementById('noInput').value;
    var nProduk = document.getElementById('nmProdu').value;
    var nKodeOK = document.getElementById('coOKP').value;
    var nJbatch = document.getElementById('jBatch').value;
    var nVpack = document.getElementById('vPacking').value;
    var nRevpro = document.getElementById('RevisiProd').value;
    var nPoinote =document.getElementById('pointNote').value;
    var nPoinotes =document.getElementById('pointNote1').value;
    var nKetnote = document.getElementById('ketNote').value;
    var nKetnotes = document.getElementById('ketNote1').value;

    var nNote ="";
    var nNoteNew="";
    var pNote ="";
    var pNoteNew ="";

    if(nKetnotes ==""){
        nNote = nKetnote;
        nNoteNew = "";
    }
    else{
        nNote = nKetnotes;
        nNoteNew = nKetnote;
    }

    if(nPoinotes ==""){
        pNote = nPoinote;
        pNoteNew = "";
    }
    else{
        pNote = nPoinotes;
        pNoteNew = nPoinote;
    }

    var myArray =[];
    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'savUPOKP';
    var tambah = 'exec?func='+func+'&bulan='+idBulan+'&namSheet='+sheetOKP+'&sData='+tip+'&noInput='+inpNo+'&coOKP='+nKodeOK
                +'&spiKode='+nProduk+'&JBatch='+nJbatch+'&VPacking='+nVpack+'&Rdata='+nRevpro+'&Dnote='+pNote
                +'&DnoteNew='+pNoteNew+'&DketNote='+nNote+'&DketNoteNew='+nNoteNew;

    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var ket = myArray[0].keterangan;
            alert(ket);
            batalPermi();
            DataOK();
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
            document.getElementById(nLoading).style.visibility = 'hidden';
        },
        });
}

function kirimOKP_btn(){
    document.getElementById(nLoading).style.visibility = 'visible';
    document.getElementById('sentOKP').style.display ="none";
    var kepada = document.getElementById("dikirim").value;
    var pesan = document.getElementById("ketPesan").value;
    console.log("data kirim ke-: " +kepada);
    console.log("data kirim cc-: " +tags);
    console.log("pesan: " +pesan);

    var func = 'sendEmail';
    var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';
    var tambah ='exec?func='+func+'&bulan='+idBulan+'&receipient='+kepada+'&cc='+tags+'&emailbody='+pesan;
    
    var mArray =[];
    $.ajax({
        method:'GET',
        url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            document.getElementById(nLoading).style.visibility = 'hidden';
            
            myArray =[];
            myArray = response.data;
            var nilai ="";
            for (var i = 0; i < myArray.length; i++){
                nilai =myArray[i].keterangan;
            }
            alert(nilai)  
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
            document.getElementById(nLoading).style.visibility = 'hidden';
            document.getElementById('sentOKP').style.display ="block";
        },
    });
}

function batalKirim(){
    document.getElementById('sentOKP').style.display ="none";
    document.getElementById('ketPesan').value ="";
}

/*****************************************PErmin to PPIC******************************************************** */
function batalPermint(){
    document.getElementById('pilihTipe').style.display = "none";
}

function setWaktu(){
    document.getElementById('timePicker').style.display ="block";
}

function tpermintBar(){
    var n =document.getElementById('tBarangPermin').value;
    var m =document.getElementById('dBulanPermin').value;
    if(m == '00'){
        document.getElementById('dBulanPermin').value = idBulan;
        gBulan();
    }
    else{}
}

function tListpermintBar(){
    var n =document.getElementById('tListBarangPermin').value;
    var m =document.getElementById('dListBulanPermin').value;
    if(m == '00'){
        document.getElementById('dListBulanPermin').value = idBulan;
        gBulan();
    }
    else{}
}

function dPermintBulan(){
    var n =document.getElementById('tBarangPermin').value;
    var m =document.getElementById('dBulanPermin').value;
    if(n == '---'){
        alert('Pilih Tipe Barang');
    }
    else{
        if(m == '00'){
            document.getElementById('dBulanPermin').value = idBulan;
            gBulan();
        }
        else{
            gBulan();
        }
    }
}

function lanPermin(){
    var x = document.getElementById('tBarangPermin').value;
    var y = document.getElementById('dBulanPermin').value;
    var z = document.getElementById('dBarangPermint').value;
    if(x != "---"){
        if(z != "Sheet1"){
            bacaPermint();    
        }
        else{
            alert('pilih data selain'+" "+z)
        }

    }
    else{
        alert('pilih tipe barang');
    }
    
}

function lanListPermin(){
    var x = document.getElementById('tListBarangPermin').value;
    var y = document.getElementById('dListBulanPermin').value;
    var z = document.getElementById('dListBarangPermint').value;
    if(x != "---"){
        if(z != "Sheet1"){
            bacaPermint();    
        }
        else{
            alert('pilih data selain'+" "+z)
        }

    }
    else{
        alert('pilih tipe barang');
    }
    
}

function bacaPermint(){
    noKode ="";
    var tva ="";
    var myArray =[];
    arrayPermin =[];
    if(indexs =="permintaan"){
        tva ="tabPermint";
        sheetOKP = document.getElementById("dBarangPermint").value;
        tipsBarang = document.getElementById("tBarangPermin").value;
        document.getElementById('pilihTipe').style.display = 'none';
    }
    else if(indexs =="listpermintaan"){
        tva ="tabListPermint";
        sheetOKP = document.getElementById("dListBarangPermint").value;
        tipsBarang = document.getElementById("tListBarangPermin").value;
        document.getElementById('pilihListTipe').style.display = 'none';
        console.log(sheetOKP +'|'+ tipsBarang);
    }
    else{}

    document.getElementById(nLoading).style.visibility = 'visible';
    
    var func = 'readPermintaanBarang';
    var tambah = 'exec?'+'func='+func+'&bulan='+idBulan+'&namaSheet='+sheetOKP+'&tipe='+tipsBarang; 
    
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
        myArray =[];
        arrayPermin = response.data;
        myArray = response.data;
        console.log(myArray)
        console.log(arrayPermin)
        var table = document.getElementById(tva); 
        $("#"+tva+ "tr").remove(); 
        table.innerHTML ='';
            if(myArray[0].no == "Data Kosong"){
                if(indexs =="permintaan"){
                    noKode = 1;
                    document.getElementById("noPermint").value = 1; 
                    if(indexs =="permintaan"){spiiners();}
                    else{}
                }
                else{}
            }
            else{
                var panjang = myArray.length +1;
                noKode = myArray.length +1; 
                for (var i = 0; i < myArray.length; i++){
                    var div = myArray[i].divisi;
                    var keter ='';
                    var warna ="";
                    if(myArray[i].checkseal =='' && myArray[i].status =="Pengajuan"){warna ="red";}
                    else if(myArray[i].checkseal =='onProggres' && myArray[i].status =="Terverifikasi"){warna ="blue";}
                    else if(myArray[i].checkseal =='Done' && myArray[i].status =="Terverifikasi"){warna ="green";}
                    else if(myArray[i].checkseal =='' && myArray[i].status =="Revisi"){warna ="purple";}
                    else{}

                    if(myArray[i].noLot =="" && myArray[i].noLot2 =="" && myArray[i].noLot3 ==""){keter ='';}
                    else if(myArray[i].noLot !="" && myArray[i].noLot2 =="" && myArray[i].noLot3 ==""){
                        keter= myArray[i].noLot+'('+myArray[i].exprov1+')'; 
                    }
                    else if(myArray[i].noLot !="" && myArray[i].noLot2 !="" && myArray[i].noLot3 ==""){
                        keter= myArray[i].noLot+'('+myArray[i].exprov1+'('+myArray[i].qty1+')),'
                        +myArray[i].noLot2+'('+myArray[i].exprov2+'('+myArray[i].qty2+')),';
                    }
                    else if(myArray[i].noLot !="" && myArray[i].noLot2 !="" && myArray[i].noLot3 !=""){
                        keter= myArray[i].noLot+'('+myArray[i].exprov1+'('+myArray[i].qty1+')),'
                        +myArray[i].noLot2+'('+myArray[i].exprov2+'('+myArray[i].qty2+')),'
                        +myArray[i].noLot3+'('+myArray[i].exprov3+'('+myArray[i].qty3+'))';
                    }
                    else{
                        keter ='';
                    }

                    var ppic = myArray[i].checkseal; 
                    var PIC = myArray[i].status

                    if(indexs =="permintaan"){
                        if(div == nDivisi){
                            var row = `<tr onClick="myFuncTablets(this)" title="Status Verify PPIC:${ppic} & Status Verify PIC:${PIC}"}>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].no}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].naBar}</td>                               
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].satuan}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].jumlah}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].jam}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].checkseal}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].keterangan}</td>
                            <td style ="font-weight: bold; color:${warna};">${keter}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].status}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].Persetujuan}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].pembuat}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].pengirim}</td>
                            <td style="border: 1px solid black;font-weight: bold; color:${warna};">${myArray[i].divisi}</td>
                            </tr>`
                            table.innerHTML += row
                        }
                        else{}  
                    }
                    else if(indexs =="listpermintaan"){
                        if(nDivisi =="PPIC-WH"){
                            var row = `<tr onClick="myFuncTablets(this)" title="Status Verify PPIC:${ppic} & Status Verify PIC:${PIC}"}>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].no}</td>
                            <td style="color:${warna};font-weight: bold;">${myArray[i].naBar}</td>                               
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].satuan}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].jumlah}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].jam}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].checkseal}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].keterangan}</td>
                            <td style ="font-weight: bold; color:${warna};">${keter}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].status}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].Persetujuan}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].pembuat}</td>
                            <td style ="font-weight: bold; color:${warna};">${myArray[i].pengirim}</td>
                            <td style="border: 1px solid black;font-weight: bold; color:${warna};">${myArray[i].divisi}</td>
                            </tr>`
                            table.innerHTML += row
                        }
                        else{
                            if(div == nDivisi){
                                var row = `<tr onClick="myFuncTablets(this)" title="Status Verify PPIC:${ppic} & Status Verify PIC:${PIC}"}>
                                <td style="color:${warna};font-weight: bold;">${myArray[i].no}</td>
                                <td style="color:${warna};font-weight: bold;">${myArray[i].naBar}</td>                               
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].satuan}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].jumlah}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].jam}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].checkseal}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].keterangan}</td>
                                <td style ="font-weight: bold; color:${warna};">${keter}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].status}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].Persetujuan}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].pembuat}</td>
                                <td style ="font-weight: bold; color:${warna};">${myArray[i].pengirim}</td>
                                <td style="border: 1px solid black;font-weight: bold; color:${warna};">${myArray[i].divisi}</td>
                                </tr>`
                                table.innerHTML += row
                            }
                            else{}  
                        }
                    }
                    else{}
 
                }
                if(indexs =="permintaan"){
                    document.getElementById("noPermint").value = panjang; 
                    document.getElementById("okpTangs").innerText = 'OKP Tanggal :' +sheetOKP; 
                    var jj ="";
                    var mm ="";
                    if(parseInt(waktuJam) < 10){
                        jj = "0"+waktuJam;
                    }
                    else{
                        jj =waktuJam;
                    }
                    if(parseInt(waktuMenit) < 10){
                        mm = "0"+waktuMenit;
                    }
                    else{
                        mm =waktuMenit;
                    }
                    document.getElementById('wSement').value =  jj + ':' + mm;
                    document.getElementById('inputJam').value = jj;
                    document.getElementById('inputMenit').value = mm;
                    spiiners();
                }
                else{
                    document.getElementById("okpListTangs").innerText = 'OKP Tanggal :' +sheetOKP;
                } 
            }
            
            document.getElementById(nLoading).style.visibility = 'hidden';
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            if(indexs =="permintaan"){
                document.getElementById('pilihTipe').style.display = 'block';
            }
            else if(indexs =="listpermintaan"){
                document.getElementById('pilihListTipe').style.display = 'block';
            }
            else{}
            
            alert(msg);
        },
    });    
}

function myFuncTablets() {
    var tva ="";
    if(indexs =="permintaan"){
        tva ="tabPermint";
    }
    else if(indexs =="listpermintaan"){
        tva ="tabListPermint";
    }
    var table = document.getElementById(tva);
    var rows = table.rows;
    
    for(var i = 0; i < rows.length; i++){
        rows[i].onclick = (function(){
            var cnt = i;
            return function(){
                var nub = this.cells[0].innerHTML;
                var mate = this.cells[1].innerHTML;
                var sat = this.cells[2].innerHTML;
                var jum = this.cells[3].innerHTML;
                var tJam = this.cells[4].innerHTML;
                var cShea = this.cells[5].innerHTML;
                var ketS = this.cells[6].innerHTML;
                var nLots = this.cells[7].innerHTML;
                var valDa = this.cells[8].innerHTML;
                var divOl = this.cells[9].innerHTML;
                var dibuOl = this.cells[10].innerHTML;
                var dikirOl = this.cells[11].innerHTML;
                var divis = this.cells[12].innerHTML;

                var nPuk = tJam.split(':');

                if(indexs =="permintaan"){
                    if(valDa =="Terverifikasi"){
                        alert('Pengajuan Permintaan Sudah Terverifikasi dan Tidak Dapat Dibatalkan')
                    }
                    else{
                        if(dibuOl == nUser){
                            document.getElementById('popQuest').style.display = 'block';
                            document.getElementById('tbl_pil').style.display = 'block';
                            document.getElementById('tbl_pert').style.display = 'none';
                            document.getElementById('noPermint').value = nub;
                            document.getElementById('materiNama').value = mate;
                            document.getElementById('JumPermin').value = jum;
                            document.getElementById('satPermint').value = sat;
                            document.getElementById('wSement').value = tJam;
                            document.getElementById('ketNPermin').value = ketS;
                            document.getElementById('inputJam').value = nPuk[0];
                            document.getElementById('inputMenit').value = nPuk[1];
                        }
                        else{
                            alert('User Tidak Sama dan Tidak Memiliki Akses Untuk Merubah/Merevisi Data')
                        }
                    }
                    
                }
                else if(indexs =="listpermintaan"){
                    if(valDa =='Pengajuan'){
                        if(nUser == 'operator'){
                            alert('Maaf Anda Tidak Memiliki Akses Untuk Verifikasi Permintaan')
                        }
                        else{
                            if(nDivisi == divis){
                                document.getElementById('veryPermint').style.display ="block";
                                document.getElementById('dataLiPer').style.display ="block";
                                document.getElementById('repLiPer').style.display ="none";
                                document.getElementById('veryLiPer').style.display ="none";
                                document.getElementById('noLiPer').value = nub;
                                document.getElementById('matLiPer').value = mate;
                                document.getElementById('qtyLiPer').value = jum;
                                document.getElementById('satLiPer').value = sat;
                                document.getElementById('jamLiPer').value = tJam;
                                document.getElementById('ketLiPer').value = ketS;

                            }
                            else{
                                alert('Maaf Anda Tidak Memiliki Akses Untuk Verifikasi Permintaan (Divisi Tidak Sesuai)')
                            }
                            
                        }
                    }
                    else if(valDa =='Revisi'){
                        alert('Harap Revisi Data Terlebih Dahulu, Keterangan Revisi :' +ketS )
                    }
                    else{
                        if(nDivisi =="PPIC-WH"){
                            if(cShea != 'Done'){
                                document.getElementById('noPerList').value = nub;
                                document.getElementById('matPerList').value = mate;
                                document.getElementById('jumPerList').value = jum;
                                document.getElementById('satPerList').value = sat;
                                exprovide();
                            }
                            else{

                            }
                        }
                        else{alert('Permintaan Sudah Terverifikasi dan Sedang Dikerjakan Bagian PPIC-WH')}
                    }
                    
                    console.log(nub);
                    var no = parseInt(nub)-1;
                    console.log(arrayPermin[no]);
                }
                
            }    
        })(i);
    }

    
    
}

function upPermi(){
    document.getElementById('popQuest').style.display = 'none';
    document.getElementById('tbl_pil').style.display = 'block';
    document.getElementById('tbl_pert').style.display = 'none';
}

function dltPermi(){
    document.getElementById('popQuest').style.display = 'block';
    document.getElementById('tbl_pil').style.display = 'none';
    document.getElementById('tbl_pert').style.display = 'block';
}

function hpsPer(){
    var no = document.getElementById("noPermint").value;
    var material = document.getElementById('materiNama').value;
    console.log(no+'|'+material);
    var myArray =[];
    var func = 'delPermintaan';
    var tambah = 'exec?func='+func+'&bulan='+idBulan+'&namaSheet='+sheetOKP+'&tipe='+tipsBarang+
    '&no='+no+'&naBar='+material+'&nOperat='+nUser+'&nDiv='+nDivisi;
    
    document.getElementById(nLoading).style.visibility = 'hidden';
    document.getElementById(popQuest).style.display = 'none';
    
    $.ajax({
        method:'GET',
        url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            document.getElementById(nLoading).style.visibility = 'hidden';
            myArray =[];
            myArray = response.data;
            var hasil = myArray[0].keterangan;
            alert(hasil);
            baPerm();
            bacaPermint();
        },
        error:function(jqXHR, exception){
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            baPerm();
            bacaPermint();
            alert(msg);
        },
    });
}

function btPer(){
    document.getElementById('popQuest').style.display = 'block';
    document.getElementById('tbl_pil').style.display = 'block';
    document.getElementById('tbl_pert').style.display = 'none'; 
}

function jTambah(){
    var puk = document.getElementById('inputJam').value;
    pWaktu = parseInt(puk);
    var x = pWaktu+1;
    if(x < 25){
        if(x < 10){
            document.getElementById('inputJam').value = "0"+x;
        }
        else{
            document.getElementById('inputJam').value = x;
        }
    }else{}

    if(x == 24){
        document.getElementById('inputJam').value = "00";
    }else{}
}

function jKurang(){
    var puk = document.getElementById('inputJam').value;
    pWaktu = parseInt(puk);
    var waktu = "";
    if(pWaktu == 0){
        waktu = 24;
    }
    else{
        waktu = pWaktu;
    }
    var x = waktu-1;
    if(x <= 25){
        if(x < 10){
            document.getElementById('inputJam').value = "0"+x;
        }
        else{
            document.getElementById('inputJam').value = x;
        }
    }else{}

    if(x == 0){
        document.getElementById('inputJam').value = "00";
    }
    else{}
}

function mTambah(){
    var puk = document.getElementById('inputMenit').value;
    pMenit = parseInt(puk);
    var x = pMenit+1;
    if(x <61){
        if(x < 10){
            document.getElementById('inputMenit').value = "0"+x;
        }
        else{
            document.getElementById('inputMenit').value = x;
        }
    }else{}

    if(x == 60){
        document.getElementById('inputMenit').value = "00";
    }
    else{}    
}

function mKurang(){
    var puk = document.getElementById('inputMenit').value;
    pMenit = parseInt(puk);
    var waktu = "";
    if(pMenit == 0){
        waktu = 60;
    }
    else{
        waktu = pMenit;
    }
    var x = waktu-1;
    if(x <= 61){
        if(x < 10){
            document.getElementById('inputMenit').value = "0"+x;
        }
        else{
            document.getElementById('inputMenit').value = x;
        }
    }else{}

    if(x == 0){
        document.getElementById('inputMenit').value = "00";
    }
    else{}    
}

function sJam(){
    var j = document.getElementById('inputJam').value;
    var m = document.getElementById('inputMenit').value;
    document.getElementById('wSement').value = j+':'+m;
    document.getElementById('timePicker').style.display ='none';
}

function sPer(){
    var tBarang = tipsBarang;
    var no = document.getElementById('noPermint').value;
    var material = document.getElementById('materiNama').value;
    var nJumlah = document.getElementById('JumPermin').value;
    var nSatuan = document.getElementById('satPermint').value;
    var nJam = document.getElementById('wSement').value;
    var nKet = document.getElementById('ketNPermin').value;

    var func = 'savePermintaan';
    var tambah = 'exec?func='+func+'&bulan='+idBulan+'&namaSheet='+sheetOKP+'&tipe='+tipsBarang+
    '&no='+no+'&naBar='+material+'&nJum='+nJumlah+'&nSat='+nSatuan+'&nJam='+nJam+'&nKet='+nKet+
    '&nOperat='+nUser+'&nDiv='+nDivisi+'&nStatus='+nStatus;

    if(tBarang !="" && material !=tBarang && material !=""&& nSatuan !="---"&& nSatuan !="" &&nJumlah !=""&&nJam !=""&&no !=""){
        document.getElementById(nLoading).style.visibility = 'visible';
        var myArray =[];
        $.ajax({
            method:'GET',
            url:'https://script.google.com/macros/s/'+code+'/'+tambah,
            success:function(response){
                document.getElementById(nLoading).style.visibility = 'hidden';
                myArray =[];
                myArray = response.data;
                var hasil = myArray[0].keterangan;
                alert(hasil);
                baPerm();
                bacaPermint();
            },
            error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                alert(msg);
            },
        });
    }
    else{
        alert('harap lengkapi seluruh data');
    }
    

    
}

function bJam(){
    document.getElementById('timePicker').style.display ="none";    var jj ="";
    var mm ="";
    if(parseInt(waktuJam) < 10){
        jj = "0"+waktuJam;
    }
    else{
        jj =waktuJam;
    }
    if(parseInt(waktuMenit) < 10){
        mm = "0"+waktuMenit;
    }
    else{
        mm =waktuMenit;
    }
    document.getElementById('wSement').value =  jj + ':' + mm;
    document.getElementById('inputJam').value = jj;
    document.getElementById('inputMenit').value = mm;
}

function btlQuest(){
    document.getElementById('popQuest').style.display = 'none';
    baPerm();
}

function baPerm(){
    document.getElementById("noPermint").value = noKode;
    var jj ="";
    var mm ="";
    if(parseInt(waktuJam) < 10){
        jj = "0"+waktuJam;
    }
    else{
        jj =waktuJam;
    }
    if(parseInt(waktuMenit) < 10){
        mm = "0"+waktuMenit;
    }
    else{
        mm =waktuMenit;
    }
    document.getElementById('wSement').value =  jj + ':' + mm;
    document.getElementById('inputJam').value = jj;
    document.getElementById('inputMenit').value = mm;
    document.getElementById('inputJam').value = noPermint;
    document.getElementById('materiNama').value = nDivisi;
    document.getElementById('JumPermin').value = '';
    document.getElementById('satPermint').value = '---';
    document.getElementById('ketNPermin').value = '';
}

function bacaRows(nil,dip,idLab,idLab1){
    var col = nil;
    var pert = dip;
    var labId = idLab;
    var labId1 = idLab1;

    if(arrayPermin.length == 0){
        alert('Data Tidak Ditemukan');
    }
    else{
        if(pert == 'desc'){
            arrayPermin.sort((a,b)=>a[col] < b[col] ? 1: -1);
            document.getElementById(idLab).style.display ="inline-block";
            document.getElementById(idLab1).style.display ="none";
        }else{
            arrayPermin.sort((a,b)=>a[col] > b[col] ? 1: -1);
            document.getElementById(idLab1).style.display ="inline-block";
            document.getElementById(idLab).style.display ="none";
        }
    }
    gantiDataTablePermint(arrayPermin);
}

function pengRows(nil,dip,idLab,idLab1){
    var col = nil;
    var pert = dip;
    var labId = idLab;
    var labId1 = idLab1;

    if(arrayPengadaan.length == 0){
        alert('Data Tidak Ditemukan');
    }
    else{
        if(pert == 'desc'){
            arrayPengadaan.sort((a,b)=>a[col] < b[col] ? 1: -1);
            document.getElementById(idLab).style.display ="inline-block";
            document.getElementById(idLab1).style.display ="none";
        }else{
            arrayPengadaan.sort((a,b)=>a[col] > b[col] ? 1: -1);
            document.getElementById(idLab1).style.display ="inline-block";
            document.getElementById(idLab).style.display ="none";
        }
    }
    gantiDataTablePegad(arrayPengadaan);
}

function gantiDataTablePermint(data){
    var tva ="";
    if(indexs =="permintaan"){
        tva ="tabPermint";
    }
    else if(indexs =="listpermintaan"){
        tva ="tabListPermint";
    }
    else{}
    var table = document.getElementById(tva); 
    $("#"+tva+ "tr").remove();
    document.getElementById(tva).innerHTML ='';
    for (var i = 0; i < data.length; i++){
        var div = data[i].divisi;
        var keter ='';
        var warna ="";
        if(data[i].checkseal =='' && data[i].status =="Pengajuan"){
            warna ="red";
        }
        else if(data[i].checkseal =='onProggres' && data[i].status =="Terverifikasi"){
            warna ="blue";
        }
        else if(data[i].checkseal =='Done' && data[i].status =="Terverifikasi"){
            warna ="green";
        }
        else if(data[i].checkseal =='' && data[i].status =="Revisi"){
            warna ="purple";
        }
        else{}

        if(data[i].noLot =="" && data[i].noLot2 =="" && data[i].noLot3 ==""){keter ='';}
        else if(data[i].noLot !="" && data[i].noLot2 =="" && data[i].noLot3 ==""){
            keter= data[i].noLot+'('+data[i].exprov1+')'; 
        }
        else if(data[i].noLot !="" && data[i].noLot2 !="" && data[i].noLot3 ==""){
            keter= data[i].noLot+'('+data[i].exprov1+'('+data[i].qty1+')),'
            +data[i].noLot2+'('+data[i].exprov2+'('+data[i].qty2+')),';
        }
        else if(data[i].noLot !="" && data[i].noLot2 !="" && data[i].noLot3 !=""){
            keter= data[i].noLot+'('+data[i].exprov1+'('+data[i].qty1+')),'
            +data[i].noLot2+'('+data[i].exprov2+'('+data[i].qty2+')),'
            +data[i].noLot3+'('+data[i].exprov3+'('+data[i].qty3+'))';
        }
        else{
            keter ='';
        }
        var ppic = data[i].checkseal; 
        var PIC = data[i].status;

        if(indexs =="permintaan"){
            if(div == nDivisi){
                var row = `<tr onClick="myFuncTablets(this)" title="Status Verify PPIC:${ppic} & Status Verify PIC:${PIC}"}>
                <td style="color:${warna};font-weight: bold;">${data[i].no}</td>
                <td style="color:${warna};font-weight: bold;">${data[i].naBar}</td>                               
                <td style ="font-weight: bold; color:${warna};">${data[i].satuan}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].jumlah}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].jam}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].checkseal}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].keterangan}</td>
                <td style ="font-weight: bold; color:${warna};">${keter}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].status}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].Persetujuan}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].pembuat}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].pengirim}</td>
                <td style="border: 1px solid black;font-weight: bold; color:${warna};">${data[i].divisi}</td>
                </tr>`
                table.innerHTML += row
            }
            else{}  
        }
        else if(indexs =="listpermintaan"){
            if(nDivisi =="PPIC-WH"){
                var row = `<tr onClick="myFuncTablets(this)" title="Status Verify PPIC:${ppic} & Status Verify PIC:${PIC}"}>
                <td style="color:${warna};font-weight: bold;">${data[i].no}</td>
                <td style="color:${warna};font-weight: bold;">${data[i].naBar}</td>                               
                <td style ="font-weight: bold; color:${warna};">${data[i].satuan}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].jumlah}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].jam}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].checkseal}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].keterangan}</td>
                <td style ="font-weight: bold; color:${warna};">${keter}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].status}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].Persetujuan}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].pembuat}</td>
                <td style ="font-weight: bold; color:${warna};">${data[i].pengirim}</td>
                <td style="border: 1px solid black;font-weight: bold; color:${warna};">${data[i].divisi}</td>
                </tr>`
                table.innerHTML += row
            }
            else{
                if(div == nDivisi){
                    var row = `<tr onClick="myFuncTablets(this)" title="Status Verify PPIC:${ppic} & Status Verify PIC:${PIC}"}>
                    <td style="color:${warna};font-weight: bold;">${data[i].no}</td>
                    <td style="color:${warna};font-weight: bold;">${data[i].naBar}</td>                               
                    <td style ="font-weight: bold; color:${warna};">${data[i].satuan}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].jumlah}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].jam}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].checkseal}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].keterangan}</td>
                    <td style ="font-weight: bold; color:${warna};">${data}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].status}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].Persetujuan}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].pembuat}</td>
                    <td style ="font-weight: bold; color:${warna};">${data[i].pengirim}</td>
                    <td style="border: 1px solid black;font-weight: bold; color:${warna};">${data[i].divisi}</td>
                    </tr>`
                    table.innerHTML += row
                }
                else{}  
            }
        }
        else{}
        
    }
}


function gantiDataTablePegad(data){
    var tva ="";
    if(indexs =="pengadaan"){
        tva ="myTable";
        
    }
    else if(indexs =="listpengadaan"){
        tva ="mylistTable";
    }
    else{}

    var table = document.getElementById(tva); 
        $("#"+tva+ "tr").remove();
        document.getElementById(tva).innerHTML ='';
        for (var i = 0; i < data.length; i++){
            var warna ="";
            if(data[i].Supplier =='' && data[i].nopo ==''){
                if(data[i].StatusVerify =='Pengajuan Pengadaan' && data[i].Status =="Belum Terverifikasi"){
                    warna ="red";
                }
                else if(data[i].StatusVerify =='Terverifikasi' && data[i].Status =="Pengajuan Pengadaan"){
                    warna ="blue";
                }
                else if(data[i].StatusVerify =='Terverifikasi' && data[i].Status =="Terverifikasi"){
                    warna ="green";
                }
                else if(data[i].StatusVerify =='Revisi Pengadaan' && data[i].Status ==""){
                    warna ="orangered";
                }
                else if(data[i].StatusVerify =='Revisi Pengadaan' && data[i].Status =="Revisi Pengadaan"){
                    warna ="orangered";
                }
                else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status ==""){
                    warna ="brown";
                }
                else if(data[i].StatusVerify =='Pengajuan Ulang' && data[i].Status =="Revisi Pengadaan"){
                    warna ="brown";
                }
                else{}
            }
            else if(data[i].Supplier !='' && data[i].nopo ==''){
                if(data[i].StatusVerify =='Pengajuan Pengadaan' && data[i].Status =="Belum Terverifikasi"){
                    warna ="red";
                }
                else if(data[i].StatusVerify =='Terverifikasi' && data[i].Status =="Pengajuan Pengadaan"){
                    warna ="blue";
                }
                else if(data[i].StatusVerify =='Terverifikasi' && data[i].Status =="Terverifikasi"){
                    warna ="purple";
                }
                else if(data[i].StatusVerify =='Revisi Pengadaan' && data[i].Status ==""){
                    warna ="orangered";
                }
                else if(data[i].StatusVerify =='Revisi Pengadaan' && data[i].Status =="Revisi Pengadaan"){
                    warna ="orangered";
                }
                else if(data[i].StatusVerify =='Pengajuan Ulang' && data[i].Status ==""){
                    warna ="brown";
                }
                else if(myArray[i].StatusVerify =='Pengajuan Ulang' && myArray[i].Status =="Revisi Pengadaan"){
                    warna ="brown";
                }
                else{}
            }
            else if(data[i].Supplier !='' && data[i].nopo !=''){
                
                if(data[i].StatusVerify =='Pengajuan Pengadaan' && data[i].Status =="Belum Terverifikasi"){
                    warna ="red";
                }
                else if(data[i].StatusVerify =='Terverifikasi' && data[i].Status =="Pengajuan Pengadaan"){
                    warna ="blue";
                }
                else if(data[i].StatusVerify =='Terverifikasi' && data[i].Status =="Terverifikasi"){
                    warna ="black";
                }
                else if(data[i].StatusVerify =='Revisi Pengadaan' && data[i].Status ==""){
                    warna ="orangered";
                }
                else if(data[i].StatusVerify =='Revisi Pengadaan' && data[i].Status =="Revisi Pengadaan"){
                    warna ="orangered";
                }
                else if(data[i].StatusVerify =='Pengajuan Ulang' && data[i].Status ==""){
                    warna ="brown";
                }
                else if(data[i].StatusVerify =='Pengajuan Ulang' && data[i].Status =="Revisi Pengadaan"){
                    warna ="brown";
                }
                else{}
            }
            else{}
            var pic = data[i].StatusVerify; 
            var PM = data[i].Status
            var row = `<tr onClick="myFunc(this)" title="Status Verify PIC:${pic} & Status Verify PM:${PM}">
                        <td style="color:${warna};font-weight: bold;">${i+1}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Kode}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Tanggal}</td>                               
                        <td style="color:${warna};font-weight: bold;">${data[i].Divisi}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Pemohon}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Jabatan}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Material}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Stok}</td>
                        <td style="background-color: cadetblue;color:black;font-weight: bold;">${data[i].JumlahOrder}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Satuan}</td>
                        <td style="background-color: cadetblue;color:black;font-weight: bold;">${data[i].Tterima}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Keterangan}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].StatusVerify}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Status}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].Supplier}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].HargaSatuan}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].diskon}</td>
                        <td style="color:${warna};font-weight: bold;">${data[i].nopo}</td>
                    </tr>`
            table.innerHTML += row
        }
    

    
    
}



function gantiPer(){
    document.getElementById('pilihTipe').style.display = 'block';
}

function refPermint(){
    if(sheetOKP =="" && tipsBarang ==""){
        gantiPer()
    }
    else{
        bacaPermint()
    }
}

function gantiPerList(){
    document.getElementById('pilihListTipe').style.display = 'block';
}

function refPermintList(){
    if(sheetOKP =="" && tipsBarang ==""){
        gantiPer()
    }
    else{
        bacaPermint()
    }
}

function batalListPermint(){
    document.getElementById('pilihListTipe').style.display = 'none';
}

function btlveryPmint(){
    document.getElementById('veryPermint').style.display ="none";
    document.getElementById('dataLiPer').style.display ="block";
    document.getElementById('repLiPer').style.display ="none";
    document.getElementById('veryLiPer').style.display ="none";   
    document.getElementById('noLiPer').value = '';
    document.getElementById('matLiPer').value = '';
    document.getElementById('qtyLiPer').value = '';
    document.getElementById('satLiPer').value = '';
    document.getElementById('jamLiPer').value = '';
    document.getElementById('ketLiPer').value = '';
}

function verLiPer(){
    document.getElementById('dataLiPer').style.display ="none";
    document.getElementById('repLiPer').style.display ="none";
    document.getElementById('veryLiPer').style.display ="block"; 
}

function revLiPer(){
    document.getElementById('dataLiPer').style.display ="none";
    document.getElementById('repLiPer').style.display ="block";
    document.getElementById('veryLiPer').style.display ="none"; 
}

function TdkrevLiPer(){
    document.getElementById('dataLiPer').style.display ="block";
    document.getElementById('repLiPer').style.display ="none";
    document.getElementById('veryLiPer').style.display ="none"; 
    document.getElementById('ketRepLiPer').value ='';
}

function YaverLiPer(){
    var nilRev = document.getElementById('ketRepLiPer').value;
    var noList = document.getElementById('noLiPer').value;
    var matList = document.getElementById('matLiPer').value;
    var qtList = document.getElementById('qtyLiPer').value;
    var satList = document.getElementById('satLiPer').value;
    var jamList = document.getElementById('jamLiPer').value;
    var keList =document.getElementById('ketLiPer').value;

    alert(noList+'|'+matList+'|'+qtList+'|'+satList+'|'+jamList+'|'+keList+'|'+nilRev);
    saverevuplot(noList,matList,nilRev,'')
}

function exprovide(){
    document.getElementById(nLoading).style.visibility = 'visible';
    document.getElementById('inputNoLOT').style.display ='none';
    var func = 'readNamaExpro';
    var tambah = 'exec?'+'func='+func;  
    document.getElementById("expro").options.length = 0;
    document.getElementById("expro1").options.length = 0;
    document.getElementById("expro2").options.length = 0;
    var xs = document.getElementById("expro");
    var xss = document.getElementById("expro1");
    var xsss = document.getElementById("expro2");
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            for(i =0; i<myArray.length; i=i+1){
                var nilai = myArray[i].expro;
                var option = document.createElement("option");
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");
                option.text = nilai;
                option1.text = nilai;
                option2.text = nilai;
                xs.add(option);  
                xss.add(option1);  
                xsss.add(option2);    
            }
            document.getElementById(nLoading).style.visibility = 'hidden';
            document.getElementById('inputNoLOT').style.display ='block';
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                exprovide()
                alert(msg);
        },
    });  
}

function btlveryPermint(){
   document.getElementById('inputNoLOT').style.display ='none';
   document.getElementById('lotPrmint').style.display ='block';
   document.getElementById('veryLotPermint').style.display ='none';
   document.getElementById('noPerList').value ="" ;
   document.getElementById('matPerList').value ="" ;
   document.getElementById('jumPerList').value ="" ;
   document.getElementById('satPerList').value ="" ;
   document.getElementById('qPerList').value ="" ;
   document.getElementById('lotPerList').value ="" ;
   document.getElementById('expro').options.length = 0;
   document.getElementById('qPerList1').value ="" ;
   document.getElementById('lotPerList1').value ="" ;
   document.getElementById('expro1').options.length = 0;
   document.getElementById('qPerList2').value ="" ;
   document.getElementById('lotPerList2').value ="" ;
   document.getElementById('expro2').options.length = 0;
}

function TdkSimpanLot(){
    document.getElementById('lotPrmint').style.display ='block';
    document.getElementById('veryLotPermint').style.display ='none';
    document.getElementById('lBarangs').innerHTML = '';
    document.getElementById('lotBarangs').innerHTML = '';
}

function verLotPermint(){
    document.getElementById('lotPrmint').style.display ='none';
    document.getElementById('veryLotPermint').style.display ='block';
    //var no = document.getElementById('noPerList').value;
    var mat = document.getElementById('matPerList').value;
    var jum = document.getElementById('jumPerList').value;
    var sat = document.getElementById('satPerList').value;
    var qty = document.getElementById('qPerList').value;
    var lot = document.getElementById('lotPerList').value;
    var expr = document.getElementById('expro').value;
    var qty1 = document.getElementById('qPerList1').value;
    var lot1 = document.getElementById('lotPerList1').value;
    var expr1 = document.getElementById('expro1').value;
    var qty2 = document.getElementById('qPerList2').value;
    var lot2 = document.getElementById('lotPerList2').value;
    var expr2 = document.getElementById('expro2').value;
    var ex = '';
    var ex1 = '';
    var ex2 = '';
    if(expr =='---'){ex ='';}else{ex = expr}
    if(expr1 =='---'){ex1 ='';}else{ex1 = expr1}
    if(expr2 =='---'){ex2 ='';}else{ex2 = expr2}
    var keter="";
    document.getElementById('lBarangs').innerHTML =  mat+' '+jum+' '+sat
    if(qty !="" &&qty1 =="" &&qty2 ==""){
        keter = `${qty} ${lot}(${ex})`
    }
    else if(qty !="" &&qty1 !="" &&qty2 ==""){
        keter = `${qty} ${lot}(${ex})
                <br>
                ${qty1} ${lot1}(${ex1})
                ` 
    }
    else if(qty !="" &&qty1 !="" &&qty2 !=""){
        keter = `${qty} ${lot}(${ex})
                 <br>
                 ${qty1} ${lot1}(${ex1})
                 <br>   
                 ${qty2} ${lot2}(${ex2})
                 `
        
    }
    else{keter ='';}
    document.getElementById('lotBarangs').innerHTML = keter;
}

function YaSimpanLot(){
    var no = document.getElementById('noPerList').value;
    var mat = document.getElementById('matPerList').value;
    var jum = document.getElementById('jumPerList').value;
    var sat = document.getElementById('satPerList').value;
    var qty = document.getElementById('qPerList').value;
    var lot = document.getElementById('lotPerList').value;
    var expr = document.getElementById('expro').value;
    var qty1 = document.getElementById('qPerList1').value;
    var lot1 = document.getElementById('lotPerList1').value;
    var expr1 = document.getElementById('expro1').value;
    var qty2 = document.getElementById('qPerList2').value;
    var lot2 = document.getElementById('lotPerList2').value;
    var expr2 = document.getElementById('expro2').value;
    var ex = '';
    var ex1 = '';
    var ex2 = '';
    if(expr =='---'){ex ='';}else{ex = expr}
    if(expr1 =='---'){ex1 ='';}else{ex1 = expr1}
    if(expr2 =='---'){ex2 ='';}else{ex2 = expr2}

    document.getElementById('lotPrmint').style.display ='block';
    document.getElementById('veryLotPermint').style.display ='none';

    alert('Data ='+no+'|'+mat+'|'+no+'|'+jum+'|'+sat+'|'+qty+'|'+lot+'|'+ex+'|'+qty1+'|'+lot1+'|'+ex1+'|'+qty2+'|'+lot2+'|'+ex2)
    saverevuplot(no,mat,'',qty)

}

function saverevuplot(no,mat,rev,qty){
    var xNo = no;
    var xMat = mat;
    var xRev = rev;
    var xQty = qty;
    var qty = '';
    var lot = '';
    var expr = '';
    var qty1 = '';
    var lot1 = '';
    var expr1 = '';
    var qty2 = '';
    var lot2 = '';
    var expr2 = '';
    var ex = '';
    var ex1 = '';
    var ex2 = '';

    if(xQty !=""){
        qty = document.getElementById('qPerList').value;
        lot = document.getElementById('lotPerList').value;
        expr = document.getElementById('expro').value;
        qty1 = document.getElementById('qPerList1').value;
        lot1 = document.getElementById('lotPerList1').value;
        expr1 = document.getElementById('expro1').value;
        qty2 = document.getElementById('qPerList2').value;
        lot2 = document.getElementById('lotPerList2').value;
        expr2 = document.getElementById('expro2').value;
        document.getElementById('inputNoLOT').style.display = 'none';
    }
    else{
        qty = '';
        lot = '';
        expr = '';
        qty1 = '';
        lot1 = '';
        expr1 = '';
        qty2 = '';
        lot2 = '';
        expr2 = '';
        document.getElementById('veryPermint').style.display = 'none';
    }
    if(expr =='---'){ex ='';}else{ex = expr}
    if(expr1 =='---'){ex1 ='';}else{ex1 = expr1}
    if(expr2 =='---'){ex2 ='';}else{ex2 = expr2}
    
    document.getElementById(nLoading).style.visibility = 'visible';
    var func = 'verevuplotPermintaan';
    var tambah ='exec?func='+func+'&bulan='+idBulan+'&namaSheet='+sheetOKP+'&tipe='+tipsBarang
    +'&no='+xNo+'&naBar='+xMat+'&ket='+xRev+'&qty='+qty+'&lot='+lot+'&expro='+ex+'&qty1='+qty1+'&lot1='+lot1
    +'&expro1='+ex1+'&qty2='+qty2+'&lot2='+lot2+'&expro2='+ex2+'&nOperat='+nUser
    
    alert(tambah);

    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
            myArray =[];
            myArray = response.data;
            var nilai = myArray[0].keterangan;
            alert(nilai);
            document.getElementById(nLoading).style.visibility = 'hidden';
            bacaPermint()
            document.getElementById('ketRepLiPer').value = '';
            document.getElementById('qPerList').value = '';
            document.getElementById('lotPerList').value = '';
            document.getElementById('expro').value = '';
            document.getElementById('qPerList1').value = '';
            document.getElementById('lotPerList1').value = '';
            document.getElementById('expro1').value = '';
            document.getElementById('qPerList2').value = '';
            document.getElementById('lotPerList2').value = '';
            document.getElementById('expro2').value = '';
        },
        error:function(jqXHR, exception){
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                document.getElementById(nLoading).style.visibility = 'hidden';
                if(xQty !=""){
                    document.getElementById('inputNoLOT').style.display = 'none';
                }
                else{
                    document.getElementById('veryPermint').style.display = 'none';
                }
                alert(msg);
        },
    });
 
}

/****Baca OKP */
function reokps(){
    if(sheetOKP==""){
        alert("No OKP tidak Ditemukan")
    }
    else{
        document.getElementById('poptamOKP').style.display ="block";
        document.getElementById('loadPermin').style.visibility = 'visible';
        DataOK()
    }
    
}

function btlext(){
    document.getElementById('poptamOKP').style.display ="none";
}


/*
table id =lotPrmint
noPerList
matPerList
jumPerList
satPerList

qty
qPerList
lotPerList
expro

qty1
qPerList1
lotPerList1
expro1

qty2
qPerList2	
lotPerList2
expro2

verLotPermint()
btlveryPermint()


veryLotPermint
lBarangs
lotBarangs
YaSimpanLot()
TdkSimpanLot()
*/






        


        



