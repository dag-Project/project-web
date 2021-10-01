var nil = 0;
var nilai ="";
var mIndex ="";

var indexs ="";
const mediaQuerys = window.matchMedia('(max-width: 600px)');

if (mediaQuerys.matches) {
    nil = 1;
} 
else{
    nil = 0;
}
var queryString = decodeURIComponent(window.location.search);
console.log(queryString);
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
    indexs ="";

    var queries = queryString.split("/");
    var queries0 = queries[0];
    var queries1 = queries[1];
    var queries2 = queries[2];
    var queries3 = queries[3];

    var index = queries0;
    var username = queries1;
    var status = queries2;
    var divisi = queries3;
    
    indexs = index;
    function home(){
        var queryString = "?home/"+username+"/"+ status+"/"+ divisi;
        window.location.href = "index.html" +queryString;
    }

    function dataPengadaan(){
        if(status =="PlanManager" ||status =="operator"){
            var queryString = "?listpengadaan/"+username+"/"+ status+"/"+ divisi;
            window.location.href = "listPengadaan.html" +queryString;
        }else{
            var queryString = "?pengadaan/"+username+"/"+ status+"/"+ divisi;
            window.location.href = "dataPengadaan.html" +queryString;
        }
    }

    function listPengadaan(){
        var queryString = "?listpengadaan/"+username+"/"+ status+"/"+ divisi;
        window.location.href = "listPengadaan.html" +queryString;
    }

    function dataPermintaan(){
        var queryString = "?permintaan/"+username+"/"+ status+"/"+ divisi;
        window.location.href = "dataPermintaan.html" +queryString;
    }

    function listPermintaan(){
        var queryString = "?listpermintaan/"+username+"/"+ status+"/"+ divisi;
        window.location.href = "listPermintaan.html" +queryString;
    }

    function createOKP(){
        if(divisi =="PPIC-WH" && status == "admin"){
            var queryString = "?OKP/"+username+"/"+ status+"/"+ divisi;
            window.location.href = "createOKP.html" +queryString;
        }
        else{
            var queryString = "?listOKP/"+username+"/"+ status+"/"+ divisi;
            window.location.href = "listOKP.html" +queryString;
        }
                
    }

    function ListOKP(){
        var queryString = "?listOKP/"+username+"/"+ status+"/"+ divisi;
        window.location.href = "listOKP.html" +queryString;
    }
            
}

function mBar(){
    var menus ="";
    var navbars ="";
    var mCenters ="";

    if(indexs =="home"){
        menus ="menu";
        navbars ="navbar";
        mCenters ="mCenter";
    }
    else if(indexs =="pengadaan"){
        menus ="menu1";
        navbars ="navbar1";
        mCenters ="mCenter1";
    }
    else if(indexs =="listpengadaan"){
        menus ="menu2";
        navbars ="navbar2";
        mCenters ="mCenter2";
    }
    else if(indexs =="permintaan"){
        menus ="menu3";
        navbars ="navbar3";
        mCenters ="mCenter3";
    }
    else if(indexs =="listpermintaan"){
        menus ="menu4";
        navbars ="navbar4";
        mCenters ="mCenter4";
    }
    else if(indexs =="OKP"){
        menus ="menu5";
        navbars ="navbar5";
        mCenters ="mCenter5";
    }
    else if(indexs =="listOKP"){
        menus ="menu6";
        navbars ="navbar6";
        mCenters ="mCenter6";
    }
    else{}  
    nil = 1; 
    const mediaQuery = window.matchMedia('(max-width: 991.98px)');
    if(nil ==1){
        document.getElementById(menus).style.display ="none";
        document.getElementById(navbars).style.display ="block";
        
        if (mediaQuery.matches) {
            document.getElementById(mCenters).style.width="92%";
        }
        else{
            document.getElementById(mCenters).style.width="80%";
        }
    }
    else{
        document.getElementById(navbars).style.display ="none";
        document.getElementById(menus).style.display ="block";
        document.getElementById(mCenters).style.width="70%";
    }
}

function mNav(){
    var menus ="";
    var navbars ="";
    var mCenters ="";

    if(indexs =="home"){
        menus ="menu";
        navbars ="navbar";
        mCenters ="mCenter";
    }
    else if(indexs =="pengadaan"){
        menus ="menu1";
        navbars ="navbar1";
        mCenters ="mCenter1";
    }
    else if(indexs =="listpengadaan"){
        menus ="menu2";
        navbars ="navbar2";
        mCenters ="mCenter2";
    }
    else if(indexs =="permintaan"){
        menus ="menu3";
        navbars ="navbar3";
        mCenters ="mCenter3";
    }
    else if(indexs =="listpermintaan"){
        menus ="menu4";
        navbars ="navbar4";
        mCenters ="mCenter4";
    }
    else if(indexs =="OKP"){
        menus ="menu5";
        navbars ="navbar5";
        mCenters ="mCenter5";
    }
    else if(indexs =="listOKP"){
        menus ="menu6";
        navbars ="navbar6";
        mCenters ="mCenter6";
    }
    else{} 
    nil = 0;    
    const mediaQuery = window.matchMedia('(max-width: 991.98px)');
    if(nil == 0){
        document.getElementById(menus).style.display ="block";
        document.getElementById(navbars).style.display ="none"; 
        if (mediaQuery.matches) {
            document.getElementById(mCenters).style.width="92%";
        }
        else{
            document.getElementById(mCenters).style.width="92%";
        }    
    }
    else{
        document.getElementById(navbars).style.display ="none";
        document.getElementById(menus).style.display ="block";
        document.getElementById(mCenters).style.width="70%";
    }    
}

function mClose(){
    window.location.href = "login.html"
}



