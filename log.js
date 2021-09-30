function myLogs() {
    var done =0;
    var nameValue = document.getElementById('username').value;
    var password =  document.getElementById('password').value;
    document.getElementById('password').value;
    var myArray =[];
    document.getElementById("loadingLogs").style.visibility = 'visible';
    var func = 'loginAps';
    var qrCode ='';
    var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';
    var tambah = 'exec?'+'func='+func+'&userId='+nameValue+'&qrCode=&pass='+password
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
        myArray =[];
        myArray = response.data;

        var ket = myArray[0].ket 
        var nilai = myArray[0].userId
        var status = myArray[0].status
        var divisi = myArray[0].divisi

        if(ket =='LoginBerhasil'){
            document.getElementById("loadingLogs").style.visibility = 'hidden';
            var queryString = "?home/"+nilai+"/"+ status+"/"+ divisi;
            
            window.location.href = "index.html" + queryString;
          }
        else{
            if(done == 0){
              document.getElementById("loadingLogs").style.visibility = 'hidden';
              alert("Invalid login!");
            }
        }

        document.getElementById("loadingLogs").style.visibility = 'hidden';
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
                document.getElementById("loadingLogs").style.visibility = 'hidden';
                alert(msg);
            },
    });
}

function change(){
    document.getElementById('card-content').style.display ="none";
    document.getElementById('card-content1').style.display ="block";
    document.getElementById('username1').value ="";
    document.getElementById('password1').value =""; 
    document.getElementById('passwordnew').value ="";
    
}

function changeLog(){
    document.getElementById('card-content').style.display ="block";
    document.getElementById('card-content1').style.display ="none";
    document.getElementById('username1').value ="";
    document.getElementById('password1').value =""; 
    document.getElementById('passwordnew').value ="";
    
}

function myLogsGanti(){
    var nameValue = document.getElementById('username1').value;
    var password =  document.getElementById('password1').value; 
    var newpassword = document.getElementById('passwordnew').value;
    document.getElementById("loadingLogs").style.visibility = 'visible';
    var myArray =[];
    document.getElementById("loadingLogs").style.visibility = 'visible';
    var func = 'resetAps';
    var qrCode ='';
    var code ='AKfycbzfPw0j2qHHGFVr02De7YwMP3ltZ2IkWcAU5MJOkxScXdEGKpM';
    var tambah = 'exec?'+'func='+func+'&username='+nameValue+'&pass='+password+'&passNew='+newpassword
    $.ajax({
        method:'GET',url:'https://script.google.com/macros/s/'+code+'/'+tambah,
        success:function(response){
        myArray =[];
        myArray = response.data;

        var ket = myArray[0].keterangan 

        alert(ket)
        document.getElementById('username1').value ="";
        document.getElementById('password1').value =""; 
        document.getElementById('passwordnew').value ="";
        document.getElementById('card-content').style.display ="block";
        document.getElementById('card-content1').style.display ="none";
        document.getElementById("loadingLogs").style.visibility = 'hidden';
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
                document.getElementById("loadingLogs").style.visibility = 'hidden';
                alert(msg);
            },
    });
}
