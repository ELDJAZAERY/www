


class Settings {

  //var resolution{width , height} , codec , wifiOnly , bandwidth , notification , volume ;
  //var mServer , stunServer , turnUsername , turnCredential , turnServer1 , turnServer2 ;

  constructor() {
    this.resolution = {width:640 , height:480 };
    this.initItems();
    if(document.getElementById('resolution') !== null &&
       document.getElementById('notification') !== null &&
       document.getElementById('mServer') !== null   ) this.synchronUI();
  }

  initItems(){


    // Resolution
    var res = getStorageItem("resolution");
    if(res) this.resolution = JSON.parse(res);
    else this.save('resolution',JSON.stringify({width:640 , height:480 }));

    // Codec
    this.codec = getStorageItem("codec");
    if(!this.codec) this.save('codec','vp8');

    // wifiOnly
    this.wifiOnly = getStorageItem("wifiOnly");
    if(!this.wifiOnly) this.save('wifiOnly','false');


    // bandwidth
    this.bandwidth = getStorageItem("bandwidth");
    if(!this.bandwidth) this.save('bandwidth',500);


    // notification
    this.notification = getStorageItem("notification");
    if(!this.notification) this.save('notification','true');



    // Call volume
    this.volume = getStorageItem("volume");
    if(!this.volume) this.save('volume',50);
    document.getElementById('volume-value').innerHTML = '&nbsp;'+this.volume;



    /// *********** ------------------ ------ *********** //////

    // Main Server
    this.mServer = getStorageItem("mServer") ;
    if(!this.mServer) this.save('mServer','https://rgridserve2.herokuapp.com/');

    // Stun Server
    this.stunServer = getStorageItem("stunServer");
    if(!this.stunServer) this.save('stunServer','stun:stun.l.google.com:19302');


    // Turn Server username
    this.turnUsername = getStorageItem("turnUsername") ;
    if(!this.turnUsername) this.save('turnUsername','muazkh');

    // Turn Server Credential
    this.turnCredential = getStorageItem("turnCredential") ;
    if(!this.turnCredential) this.save('turnCredential','muazkh');


    // Turn Server 1
    this.turnServer1 = getStorageItem("turnServer1") ;
    if(!this.turnServer1) this.save('turnServer1','turn:webrtcweb.com:7788');

    // Turn Server 2
    this.turnServer2 = getStorageItem("turnServer2") ;
    if(!this.turnServer2) this.save('turnServer2','turn:webrtcweb.com:4455');

    function getStorageItem(item){
      return localStorage.getItem(item);
    }

  }

  synchronUI() {
    var resDoc = document.getElementById('resolution');
    var codDoc = document.getElementById('codec');
    var wifiOnlyDoc = document.getElementById('wifiOnly');
    var bandwidthDoc = document.getElementById('bandwidth');
    var notificationDoc = document.getElementById('notification');
    var volumeDoc = document.getElementById('volume');

    // ---------- //
    var mServerDoc = document.getElementById('mServer');
    var stunServerDoc = document.getElementById('stunServer');
    var turnUsernameDoc = document.getElementById('turnUsername');
    var turnCredentialDoc = document.getElementById('turnCredential');
    var turnServer1Doc = document.getElementById('turnServer1');
    var turnServer2Doc = document.getElementById('turnServer2');


    // Resolution
    resDoc.value = ''+this.resolution.width+' '+this.resolution.height;
    resDoc.addEventListener('change',function() {
      var val = this.value ;
      var res = val.split(' ');
      var width  = parseInt(res[0]);
      var height = parseInt(res[1]);
      var resolution = { width : width , height : height };
      save('resolution',JSON.stringify(resolution));
    });

    // Codec
    codDoc.value = this.codec ;
    codDoc.addEventListener('change',function(){save('codec',this.value)});


    // Bandwidth
    bandwidthDoc.value = this.bandwidth;
    bandwidthDoc.addEventListener('change',function(){save('bandwidth',this.value)});

    // wifiOnly
    if(''+wifiOnlyDoc.checked !== this.wifiOnly) wifiOnlyDoc.click();
    wifiOnlyDoc.addEventListener('click',function(){save('wifiOnly',''+this.checked)});

    // Notifications
    if(''+notificationDoc.checked !== this.notification) notificationDoc.click();
    notificationDoc.addEventListener('click',function(){save('notification',''+this.checked)});

    // volume
    volumeDoc.value = this.volume;
    volumeDoc.addEventListener('change',function(){
      document.getElementById('volume-value').innerHTML = '&nbsp;'+this.value;
      if (this.value > 80) {
        document.getElementById('careful-message').style.display = 'inline-block';
      } else {
        document.getElementById('careful-message').style.display = 'none';
      }
      save('volume',this.value);
      alert('volume change ok !!');
    });

    // Main Server
    mServerDoc.value = this.mServer;
    mServerDoc.addEventListener('input',function(){save('mServer',this.value)});

    // Stun Server
    stunServerDoc.value = this.stunServer;
    stunServerDoc.addEventListener('input',function(){save('stunServer',this.value)});

    // Turn Server Username
    turnUsernameDoc.value = this.turnUsername;
    turnUsernameDoc.addEventListener('input',function(){save('turnUsername',this.value);});

    // Turn Server Credential
    turnCredentialDoc.value = this.turnCredential;
    turnCredentialDoc.addEventListener('input',function(){save('turnCredential',this.value)});

    // Turn Servers 1 & 2
    turnServer1Doc.value = this.turnServer1;
    turnServer1Doc.addEventListener('input',function(){save('turnServer1',this.value)});
    turnServer2Doc.value = this.turnServer2;
    turnServer2Doc.addEventListener('input',function(){save('turnServer2',this.value)});

    function save(item,val){
      /********* this.save (not working) ************** // */
      if(!item || !val ) return;
      localStorage.setItem(item,val);

      switch (item) {
        case 'resolution': { this.resolution = val;}break;
        case 'codec': this.codec = val; break;
        case 'wifiOnly': this.wifiOnly = val; break;
        case 'bandwidth': this.bandwidth = val; break;
        case 'notification': this.notification = val; break;
        case 'volume': this.volume = val; break;

        case 'mServer': this.mServer = val; break;
        case 'stunServer': this.stunServer = val; break;
        case 'turnUsername': this.turnUsername = val; break;
        case 'turnCredential': this.turnCredential = val; break;
        case 'turnServer1': this.turnServer1 = val; break;
        case 'turnServer2': this.turnServer2 = val; break;
      }
    }

    document.getElementById('Timer-switch').addEventListener('change',function(){
      if(this.checked){
        document.getElementById('timer').style = "";
      }else{
        document.getElementById('timer').style = "display: none;";
      }
    });


  } // synchronUI

  save(item,val) {
    if(!item || !val ) return;
    localStorage.setItem(item,val);

    switch (item) {
      case 'resolution': { this.resolution = val;}break;
      case 'codec': this.codec = val; break;
      case 'wifiOnly': this.wifiOnly = val; break;
      case 'bandwidth': this.bandwidth = val; break;
      case 'notification': this.notification = val; break;
      case 'volume': this.volume = val; break;

      case 'mServer': this.mServer = val; break;
      case 'stunServer': this.stunServer = val; break;
      case 'turnUsername': this.turnUsername = val; break;
      case 'turnCredential': this.turnCredential = val; break;
      case 'turnServer1': this.turnServer1 = val; break;
      case 'turnServer2': this.turnServer2 = val; break;
    }
  }

}//Class


setTimeout(function(){
   var settings = new Settings();
   alert('fin de new Settings !! --------> '+ settings.volume);
 },500);
