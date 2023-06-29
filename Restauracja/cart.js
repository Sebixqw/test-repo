

// efekt znikania w czasie wyszukiwania danej pozycji
var headers = document.getElementsByTagName('h3');
var searchInput = document.querySelector('.search-box input');
var searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', searchItems);

function searchItems() {
  var searchPhrase = searchInput.value.toLowerCase();
  var found = false;

  for (var i = 0; i < headers.length; i++) {
    var headerText = headers[i].textContent.toLowerCase();
    var parentDiv = headers[i].parentNode;

    if (headerText.includes(searchPhrase)) {
      parentDiv.style.display = 'block';
      parentDiv.style.opacity = '1';

      // Scroll to the found item
      parentDiv.scrollIntoView({ behavior: 'smooth' });

      found = true;
    } else {
      parentDiv.style.display = 'block';
      parentDiv.style.opacity = '0.2';
    }
  }

  if (!found) {
    alert('Nie znaleziono pasującej pozycji.');
  }
}



///////////////////////////////////////Pojawienie się nazwy dania wraz z tłem po kliknięciu Zamów //////////////////////////////////////////

/// Pobierz przyciski Zamów
const orderButtons = document.querySelectorAll('.orderBtn');

// Pobierz element napisu "Zamówienia"
const orderText = document.querySelector('.nav');

// Utwórz nową listę zamówień
const orderedItemsList = document.getElementById('orderedItems');

// // Iteruj przez wszystkie przyciski zamówienia
// orderButtons.forEach(function (button) {
//   // Dodaj nasłuchiwanie na kliknięcie przycisku
//   button.addEventListener('click', function () {
//     if (this.classList.contains('clicked')) {
//       return; // Jeśli tak, zakończ działanie funkcji
//     }

//     // Dodaj klasę clicked do przycisku, aby oznaczyć go jako kliknięty
//     this.classList.add('clicked');

//     // Pobierz nazwę dania
//     var mealName = this.parentNode.parentNode.querySelector('h3').innerText;
//     // Pobierz cenę dania
//     var mealPrice = this.parentNode.querySelector('.price-value').innerText;

//     // Utwórz nowy element <h3> z nazwą dania i ceną
//     var newHeading = document.createElement('h3');
//     var mealImage = this.parentNode.parentNode.querySelector('img').cloneNode(true);
//     mealImage.style.float = 'left';
//     mealImage.style.marginRight = '10px';
//     mealImage.style.width = '50px';
//     newHeading.appendChild(mealImage);
//     newHeading.innerHTML += mealName + ' - <span class="meal-price">' + mealPrice + '</span>';

//     // Utwórz nowy element <span> dla liczby sztuk
//     var quantitySpan = document.createElement('span');
//     quantitySpan.classList.add('quantity');
//     quantitySpan.innerText = '1'; // Domyślna liczba sztuk

//     // Pobierz oryginalną cenę dania
//     var originalPrice = parseFloat(mealPrice.replace('PLN', '').trim());

//     // Utwórz przycisk minus
//     var minusButton = document.createElement('button');
//     minusButton.innerText = '-';
//     minusButton.addEventListener('click', function () {
//       var quantity = parseInt(quantitySpan.innerText);
//       if (quantity > 1) {
//         quantitySpan.innerText = (quantity - 1).toString();

//         // Zmniejszaj cenę o oryginalną wartość dania po każdym kliknięciu minusa
//         var newPrice = (originalPrice * quantitySpan.innerText).toFixed(2);
//         mealPrice = newPrice + ' PLN';
//         newHeading.querySelector('.meal-price').innerText = mealPrice;
//       }
//     });

//     // Utwórz przycisk plus
//     var plusButton = document.createElement('button');
//     plusButton.innerText = '+';
//     plusButton.addEventListener('click', function () {
//       var quantity = parseInt(quantitySpan.innerText);
//       quantitySpan.innerText = (quantity + 1).toString();

//       // Zwiększaj cenę o oryginalną wartość dania po każdym kliknięciu plusa
//       var newPrice = (originalPrice * quantitySpan.innerText).toFixed(2);
//       mealPrice = newPrice + ' PLN';
//       newHeading.querySelector('.meal-price').innerText = mealPrice;
//     });

//     // Dodaj przyciski minus i plus oraz liczbę sztuk do elementu <h3>
//     newHeading.appendChild(minusButton);
//     newHeading.appendChild(quantitySpan);
//     newHeading.appendChild(plusButton);

//     // Utwórz nowy element <li> i wstaw do niego nowy element <h3>
//     var newListItem = document.createElement('li');
//     newListItem.appendChild(newHeading);

//     // Wstaw nowy element <li> do listy zamówień
//     orderedItemsList.appendChild(newListItem);
//   });
// });

// Iteruj przez wszystkie przyciski zamówienia
console.log([...orderButtons]);
orderButtons.forEach((button) => {
  // Dodaj nasłuchiwanie na kliknięcie przycisku
  button.addEventListener('click', () => {
    console.log(button);
    if (button.classList.contains('clicked')) {
      console.log('do nothing');
      return; // Jeśli tak, zakończ działanie funkcji
    }

    // Dodaj klasę clicked do przycisku, aby oznaczyć go jako kliknięty
    button.classList.add('clicked');

    // Pobierz nazwę dania
    const mealName = button.parentNode.parentNode.querySelector('h3').innerText;
    // Pobierz cenę dania
    const mealPrice = button.parentNode.querySelector('.price-value').innerText;

    // Utwórz nowy element <h3> z nazwą dania i ceną
    const mealImageSrc = button.parentNode.parentNode.querySelector('img').src;
    const newListItem = document.createElement('li');
    newListItem.classList.add('order-item');

    newListItem.innerHTML = `
      <img src="${mealImageSrc}">
      <p>${mealName} - <span class="meal-price">${mealPrice}</span></p>
      <button class="minus-button" type="button">-</button>
      <span class="quantity">1</span>
      <button class="plus-button" type="button">+</button>
    `;

    // Pobierz oryginalną cenę dania
    const originalPrice = parseFloat(mealPrice.replace('PLN', '').trim());
    const minusButton = newListItem.querySelector('.minus-button');
    const plusButton = newListItem.querySelector('.plus-button');

    // Połącz przycisk minus
    minusButton.addEventListener('click', () => {
      const quantitySpan = newListItem.querySelector('.quantity');
      let quantity = parseInt(quantitySpan?.innerText);

      if (quantity > 1) {
        quantity--;
        quantitySpan.innerText = quantity;

        updatePrice(quantity);
      }
    });

    // Połącz przycisk plus
    plusButton.addEventListener('click', () => {
      const quantitySpan = newListItem.querySelector('.quantity');
      let quantity = parseInt(quantitySpan?.innerText);

      quantity++;
      quantitySpan.innerText = quantity;

      updatePrice(quantity);
    });

    function updatePrice(quantity) {
      const newPrice = (originalPrice * quantity).toFixed(2);

      newListItem.querySelector('.meal-price').innerText = `${newPrice} PLN`;
    }

    // Wstaw nowy element <li> do listy zamówień
    orderedItemsList.appendChild(newListItem);
  });
});


 


