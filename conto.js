function myFunction(){
    var nameValue = document.login.username.value;
    var password =  document.login.password.value;
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    
    var myArray =[];
    var func = 'loginAps';
    var qrCode ='';
    var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';
    var tambah = 'exec?'+'func='+func+'&userId='+nameValue+'&qrCode=&pass='+password;
    alert(tambah);
    
}

function myFunct(){
    alert('Selamat Datang')
}
