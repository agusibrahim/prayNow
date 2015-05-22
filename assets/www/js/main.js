var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});

if (window.location.pathname.indexOf("android_asset") > -1) {
  $$("body").css({
    "zoom": "90%"
  });
} else {
  $$("body").css({
    "zoom": "130%"
  });
}

function getAddr(lat, lng) {
  $$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false", function (data) {
    data = JSON.parse(data);
    var alamat = {
      "kota": null,
      "negara": null
    }
    for (add in data.results[0].address_components) {
      add = data.results[0].address_components[add];
      //alert(JSON.stringify(add.types));
      if (add.types.indexOf("administrative_area_level_2") != -1) {
        alamat["kota"] = add.short_name;
      }
      if (add.types.indexOf("country") != -1) {
        alamat["negara"] = add.short_name;
      }
    }
    $$(".kota").text(alamat.kota + ", " + alamat.negara);
    window.localStorage.alamat = JSON.stringify(alamat);
  });
}

function setTimes(lat, lng, method) {
  if (!method) {
    method = "Makkah";
  }
  $('#timer-7').timer({
    duration: 45,
    unit: 'm'
  });
  var PT = new PrayTimes(method);
  var times = PT.getTimes(new Date(), [lat, lng], +7);
  var list = ['Imsak', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  for (p in list) {
    var html = '<li><div class="item-content"><div class="item-inner"> <div class="link item-title">' + list[p] + '</div><div class="item-after">' + times[list[p].toLowerCase()] + '</div></div></div></li>';
    $$(".list-block ul").append(html);
  }
}

function setupLocation() {
  myApp.alert("detect location");
  navigator.geolocation.getCurrentPosition(function (pos) {
    window.localStorage["mypos"] = pos.coords.latitude + "," + pos.coords.longitude;
    setTimes(pos.coords.latitude, pos.coords.longitude);
    myApp.closeModal();
  }, function (err) {
    alert(err.toString());
  });
}

function mapsRequest() {
  var div = document.getElementById("map_canvas");
  map = plugin.google.maps.Map.getMap(div, {
    'controls': {
      'compass': true,
      'myLocationButton': true,
      'zoom': true
    }
  });
  map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
    alert("siap");
  });
};
if (window.localStorage.mypos == undefined) {
  setupLocation();
} else {
  var lat = window.localStorage.mypos.split(",")[0];
  var lng = window.localStorage.mypos.split(",")[1];
  setTimes(lat, lng);
}
document.addEventListener("deviceready", function () {
  //mapsRequest();
  if (window.localStorage.alamat == undefined) {
    var lat = window.localStorage.mypos.split(",")[0];
    var lng = window.localStorage.mypos.split(",")[1];
    try {
      getAddr(lat, lng);
    } catch (er) {
      alert(er.toString());
    }
  } else {
    var alamat = JSON.parse(window.localStorage.alamat);
    $$(".kota").text(alamat.kota + ", " + alamat.negara);
  }
});