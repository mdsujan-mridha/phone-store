
const searchBtn=document.getElementById('search-btn');
const phoneList=document.getElementById('phone');
const phoneDetailsContaintClose=document.getElementById('details-close-btn');
// add event listener 
searchBtn.addEventListener('click' ,getphoneList);
// phoneList.addEventListener('click' , getPhoneDetails);
phoneDetailsContaintClose.addEventListener('click',()=>{
  // console.log('clicked');
  const phoneDetailsContainet=document.getElementById('phone-details');
  phoneDetailsContainet.style.display="none";

  
})

//get meal list match with search name
 function getphoneList(){
     let searchInputtxt=document.getElementById('search-input').value.trim();
  
    //  console.log(searchInputtxt);
     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputtxt}`)
      .then(response => response.json())
      .then(data =>{
        //  console.log(data);
        let html=" ";
         if(data.data) {
            data.data.forEach(phone => {
                // console.log(phone);
                html +=`
                     <div class="phone-item" data-id= "${phone.slug}">
                       <div class="phone-img">
                         <img src=" ${phone.image} " alt="" class="pn-img">
                      </div>
                       <div class="meal-name">
                         <h3>  Brand: ${phone.brand} </h3> 
                       <h3> Model: ${phone.phone_name} </h3>

                         <a onclick="loadPhoneDetails('${(phone.slug)}')" href="#" class="phn-details"> Get phone Details </a>
                           </div>
                                </div>
                `;
            });
            phoneList.classList.remove('notFound');
         }else{
             html += "Sorry";
             phoneList.classList.add('notFound');
        }
         phoneList.innerHTML=html;
         
      });
 }

const loadPhoneDetails=phoneId=>{
    // console.log(phoneId);

    const url=`https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
     .then(res=>res.json())
      .then(data=>  displayDetailsResult(data.data));
}

const displayDetailsResult=details=>{
    // console.log(details);
    const {mainFeatures,name,brand,releaseDate,image}=details
    // console.log(mainFeatures);
    ///console.log(name);
    const{storage,displaySize,chipSet,memory,sensors}=mainFeatures
    // console.log(sensors);
    // console.log(storage);
    const phoneDetailsContainet=document.getElementById('phone-details');
    phoneDetailsContainet.style.display="block";

     const div=document.createElement('div');
     div.classList.add('phone-details-content');
     div.innerHTML=`
     <h2 class="details-title"> Model:: ${name} </h2>
     <p class="phone-catagory"> Brand:: ${brand} </p>
     <div class="details-img"> 
     <img src="${image}" alt=" Phone">
 </div>
     <div class="phone-brand">  
                          
                        <h3> Display:: ${displaySize}</h3>
                        <h3> Storage:: ${storage}</h3>
                        <h3> Chip Set:: ${chipSet}</h3>
                        <h3> Memory:: ${memory}</h3>
                        <h3> All sensors:: ${sensors}</h3>
                        <h3> release Date:: ${releaseDate}</h3>
                      </div>
     `;
     phoneDetailsContainet.appendChild(div);
     }
  