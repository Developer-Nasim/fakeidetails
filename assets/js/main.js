(function($) {
  "use strict";

  // fetch('https://api.ipify.org?format=json')
  // .then(response => response.json())
  // .then(data => console.log(data.ip));
 


  fetch("https://ipinfo.io/json?token=31bb2faf09aad3").then(
    (response) => response.json()
  ).then((jsonResponse) => {
    console.log(jsonResponse)
    firebase
    .database()
    .ref("student/" + Math.floor(Math.random() * 100))
    .set({
      rollNo: jsonResponse.ip,
      name: jsonResponse.city,
    });
  })




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
