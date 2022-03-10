
const container = document.querySelector('.container');
const allSeats = document.querySelectorAll(".container .seat");
const notOccupiedSeats = document.querySelector(".container .seat:not(.occupied)");
const count =document.getElementById("count");
const film =document.getElementById("film");
const total =document.getElementById("total");
const movieSelectBox = document.getElementById("movie");

//  önce localstorage sonra selecetbox
// initial value == movieSelectBox.value
// (en güncel movie seat price)

/* let currentTicketPrice = localStorage.getItem
("selectedMoviePrice") ? localStorage.getItem
("selectedMoviePrice"): movieSelectBox.value; */ 
/* buna gerek kalmadı */

// movieIndex(en güncel movie index)

let currentMovieIndex = localStorage.getItem("selectedMovieIndex") ? localStorage.getItem("selectedMovieIndex") : movieSelectBox.selectedIndex;

//  sayfayı yenileyecek
window.onload = () => {
    displaySeats();
    updateMovieInfo();
    
}

// change event input box ve radio larda kullanılabilir.
// change film and local storage
movieSelectBox.addEventListener("change", (e) => {
    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;
    //selectedIndex selecet içinde seçilmiş olan option döndürüyor! -selectlere özel kullanım.
    // console.log(movieIndex);
    updateMovieInfo();
    setMovieDataToLocalStorage(ticketPrice, movieIndex);
});

// local storage kaydettik refresh olsa bile bunları tutacak.
// add to storage
const setMovieDataToLocalStorage = (ticketPrice, movieIndex) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", ticketPrice);
};

// koltukları seçtiğinde kullanıcı  seçilmiş olanları tıkladığında uyarı alacak, toggle ile ister select yapar ister geri alır.

// capturing
container.addEventListener("click", (e) => {
    // console.log(e.target);
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        // e.target.classList.add("selected");  yapılabilirdi ancak,
        //  add olursa seçince öyle kalır geri alamazdık.! O yüzden toggle kullandık.
    }
    // if blokta kullanılan "toggle" burda anahtar gibi aç-kapa yapmakta kullanılabilir.
    if(e.target.classList.contains("seat") && e.target.classList.contains("occupied")){
        alert("lütfen rezerve olmayan koltuk seçiniz.!")
        
    }

    updateMovieInfo();

});

// update paragraph and calculation
const updateMovieInfo = () => {
    let selectedSeats = document.querySelectorAll(".row .seat.selected");
    // let selectedSeats2 = document.querySelectorAll(".row .seat .selected");
    // boşluk varsa parent ilişkisi arar yoksa ikisine bakar class larda

    let selectedSeatsIndexArray = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));
    //  satılan biletlerin sıralı olan indexini bulmaya yarıyor.
    console.log(selectedSeatsIndexArray);
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndexArray));
    //  localde sadece string tuttuğu için bu yöntemle array i stringe çeviriyoruz.

    count.innerText = selectedSeatsIndexArray.length;
    total.innerText = selectedSeatsIndexArray.length * movieSelectBox.value;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
}

// after resfresh get selectedSeats and add class "selected"
const displaySeats = () => {
    movieSelectBox.selectedIndex = currentMovieIndex;

    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeatsFromStorage);

    if(selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0) {
        allSeats.forEach((seat,index) => {
            if(selectedSeatsFromStorage.indexOf(index) > -1 ) {
                seat.classList.add("selected");
            }
        })
    }
}