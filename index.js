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
const getFormData = () => {
  const result = {};
  for (const [key, value] of data) { result[key]=value }
  return result;
}
const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  const data = new FormData(form);
  const day = data.get('day');
  const year = data.get('year');
  const month = data.get('month');  
  const has_grade = data.get("has_grade");
  const is_grade_okey = data.get("is_grade_okey")
  const how_much = data.get("how_much");
  const is_judge_outside = data.get("is_judge_outside");
  const discount = 0;
  const currentDate = new Date();
  const selectedDate = new Date()
  selectedDate.setDate(day);
  selectedDate.setFullYear(year);
  selectedDate.setMonth(month-1);
  const monthDifference = monthDiff(selectedDate,currentDate);
  if (monthDifference>=2) {
    discount+1;
  }  
  if (has_grade===true) {
    discount +1;
  }
 
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
    expandable.style.display = "block"
  } else {
    expandable.style.display = "none"
  }  
}
const radioButtons = document.querySelectorAll('input[name="is_grade_okey"]')
radioButtons.forEach(b=>b.addEventListener("change",showExpandable));
 // if (!day || !month || !year) {
  //   return
  // }
  // if (year>currentDate.getFullYear()){
  //   return
  // }
  // if (year===currentDate.getFullYear() && month>currentDate.getMonth()+1){
  //   return
  // }
  // if (year === currentDate.getFullYear() && month===currentDate.getMonth()+1){
  //   if (day>currentDate.getDate()) {
  //   return
  //   }
  // }