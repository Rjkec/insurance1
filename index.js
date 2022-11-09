
// const docs = require("jspdf");
// const doc = new jsPDF();





// 

//NAV BAR

let menuToggle = document.querySelector(".menuToggle");
let navigation = document.querySelector(".navigation");
menuToggle.onclick = function () {
  navigation.classList.toggle("active");
};


//SLIDER
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}



//FORM
// const getFormData = () => {
//   const result = {};
//   for (const [key, value] of data) { result[key]=value }
//   return result;
// }


// const makePDF = () => {
//   const doc = new jspdf.jsPDF();
//   console.log("her")
//   const element = document.querySelector('#pdf-info');
//   console.log(element);
//   doc.text(element.innerText,10,10);
//   doc.save("a4.pdf");

// }
// document.querySelector("#pdf").addEventListener("click", (e) => {    
//      makePDF();
// })


const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  const data = new FormData(form);
  const day = data.get('day');  
  const year = data.get('year');  
  const month = data.get('month');    
  const has_grade = data.get("has_grade"); 
  const is_grade_okey = data.get("is_grade_okey");
  const how_much = +data.get("how_much");
  const is_judge_outside = data.get("is_judge_outside");

 
 
  document.querySelector(`#day`).innerHTML = day;
  document.querySelector(`#year`).innerHTML = year;
  document.querySelector(`#month`).innerHTML = month;
  const is_grade_okey_text = is_grade_okey===1 
  ? "да" 
  : "нет";
  document.querySelector(`#is_grade_okey`).innerText = is_grade_okey_text;
  let discount = 0;
  const currentDate = new Date();
  const selectedDate = new Date()
  selectedDate.setDate(day);
  selectedDate.setFullYear(year);
  selectedDate.setMonth(month-1);

  const monthDifference = monthDiff(selectedDate,currentDate);

  if (monthDifference>=2) {
    discount+=1;
  }  
  if (has_grade==="1") {
    discount+=1;
  }
  if (is_judge_outside==="1"){
    discount+=2;
  }
  
  discount = discount > 3 ? 3 : discount; 
  const result = how_much !== 0 
  ? how_much*0.15*Number(`0.0${discount}`)
  :  discount;
  
  if (how_much===0) {  
    console.log(result,'discount');
    document.querySelector(`#result`).innerHTML = result;
    document.querySelector(".modal").classList.add("opened");
   
  } else  {
    console.log('price');
    const finalPrice = how_much*0.15
    const discountedPrice = finalPrice - finalPrice * Number(`0.0${discount}`)
    document.querySelector(`#result-price`).innerHTML = Math.round(discountedPrice);
    document.querySelector(".modal-price").classList.add("opened");
  
  }
  const makePDF = () => {
    const doc = new jspdf.jsPDF();
    
    // doc.addFileToVFS('Inter-Regular-normal.ttf', font);
    // doc.addFont("Inter-Regular-normal.ttf", "Inter", "normal");
    doc.setFont("Roboto-Regular");
    console.log("her")
    const element = document.querySelector('#pdf-info');
    console.log(element); 
    doc.text(element.innerText,10,10);
    doc.save("a4.pdf");
  
  }
  document.querySelector("#pdf").addEventListener("click", (e) => {    
       makePDF();
  })

})

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

const expandable = document.querySelector(".expandable");

const showExpandable = (e) => {
  if (e.target.value==="1") {
    expandable.style.display = "flex"
  } else {
    expandable.style.display = "none"
  }  
}
const radioButtons = document.querySelectorAll('input[name="is_grade_okey"]')
radioButtons.forEach(b=>b.addEventListener("change",showExpandable));


//modal-window-close

document.querySelector(".close").addEventListener("click", (e) => {
document.querySelector(".modal").classList.remove("opened");
document.querySelector(".modal-price").classList.remove("opened");  
} );
document.querySelector(".close-discount").addEventListener("click", (e) => {
 
document.querySelector(".modal-price").classList.remove("opened");  
} );




