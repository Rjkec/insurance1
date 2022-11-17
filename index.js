

//NAV BAR

let menuToggle = document.querySelector(".menuToggle");
let navigation = document.querySelector(".navigation");
menuToggle.onclick = function () {
  navigation.classList.toggle("active");
};

//Language switcher for full page
const switchLangToRu = () => { 
  document.querySelector("#KZ").classList.remove("chosed-kz");
  document.querySelector("#RU").classList.add("chosed-ru");
}
const switchLangToKz = () => {  
  document.querySelector("#RU").classList.remove("chosed-ru");
  document.querySelector("#KZ").classList.add("chosed-kz");
}
document.querySelector("#KZ").addEventListener("click", (e) => { 
  switchLangToKz();
})  
document.querySelector("#RU").addEventListener("click", (e) => {
  switchLangToRu();
})
switchLangToRu();  
//Language switcher for full page
const switchLangToRuSmall = () => { 
  document.querySelector("#KZ-small").classList.remove("chosed-kz");
  document.querySelector("#RU-small").classList.add("chosed-ru");
}
const switchLangToKzSmall = () => {  
  document.querySelector("#RU-small").classList.remove("chosed-ru");
  document.querySelector("#KZ-small").classList.add("chosed-kz");
}
document.querySelector("#KZ-small").addEventListener("click", (e) => { 
  switchLangToKzSmall();
})  
document.querySelector("#RU-small").addEventListener("click", (e) => {
  switchLangToRuSmall();
})
switchLangToRuSmall();  


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

//STOP SCROLL

function preventScroll(e){
  e.preventDefault();
  e.stopPropagation();

  return false;
}

function disableScrollModal(){
document.querySelector('.modal').addEventListener('wheel', preventScroll);
}

function enableScrollModal(){
  document.querySelector('.modal').removeEventListener('wheel', preventScroll);
}
function disableScrollPrice(){
  document.querySelector('.modal-price').addEventListener('wheel', preventScroll);
  }
  
  function enableScrollPrice(){
    document.querySelector('.modal-price').removeEventListener('wheel', preventScroll);
  }



//FORM
const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  const data = new FormData(form);
  const name = data.get('name');
  const car = data.get('car');
  const day = data.get('day');  
  const year = data.get('year');  
  const month = data.get('month');    
  const has_grade = data.get("has_grade"); 
  const is_grade_okey = data.get("is_grade_okey");
  const how_much = +data.get("how_much");
  const is_judge_outside = data.get("is_judge_outside");


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
  const discountedPrice = how_much - (how_much * (0.15 - Number(`0.0${discount}`))); 

  if (how_much===0) {   
    document.querySelector(`#result`).innerHTML = discount;
    document.querySelector(".modal").classList.add("opened");
    disableScrollModal();
   
  } else  {    
    document.querySelector(`#result-price`).innerHTML = Math.round(discountedPrice);
    document.querySelector(".modal-price").classList.add("opened"); 
    disableScrollPrice();
  
  }
  
  const makePDF = () => {
    const doc = new jspdf.jsPDF();
    const has_grade_text = has_grade==="1" 
    ? "да" 
    : "нет";
    const is_grade_okey_text = is_grade_okey==="1" 
    ? "да" 
    : "нет";
    const is_judge_outside_text = is_judge_outside==="1" 
    ? "да" 
    : "нет";
    
    const how_much_text = how_much>0 
    ? `${how_much} тнг`
    : "не указано";

    doc.setFont("Roboto-Regular");
    doc.text(`Имя: ${name}\n
Марка машины: ${car}\n
Дата: ${day}.${month}.${year}\n
Есть ли у вас оценка страховой компании: ${has_grade_text}\n
Устраивает ли вас оценка страховой: ${is_grade_okey_text}\n
Оценка ущерба: ${how_much_text}\n
Назначен ли административный суд: ${is_judge_outside_text}\n
Сумма выплаты: ${Math.round(discountedPrice)} тнг`,10,10);
    doc.save("информация_о_проишествии.pdf");
  
  }
  document.querySelector("#pdf").addEventListener("click", (e) => {    
       makePDF();
  })  
  document.querySelector("#pdf-price").addEventListener("click", (e) => {    
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
const radioButtons = document.querySelectorAll('input[name="has_grade"]')
radioButtons.forEach(b=>b.addEventListener("change",showExpandable));


//modal-window-close

document.querySelector(".close").addEventListener("click", (e) => {
document.querySelector(".modal").classList.remove("opened");
document.querySelector(".modal-price").classList.remove("opened");  
} );
document.querySelector(".close-discount").addEventListener("click", (e) => {
 
document.querySelector(".modal-price").classList.remove("opened");  
} );




