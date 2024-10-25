const currentUrl = window.location.pathname;
let catUrl = currentUrl.replace(/^./, ""); // категория 
const url = '../data.php';

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ catUrl: catUrl }) // Преобразуем объект в JSON
})
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
    goodsOut(data);
    subCategory(data);
});


// рисую кнопки с подкатегориями
function subCategory(data) {
    let newArr = [];
    
    let cat = data[0].category_ru_name
    document.querySelector('.categoryName').innerHTML = cat;


    for (let key in data) {
        newArr.push(data[key].subcategory);
        
    }
    let uniqueSubcat = new Set(newArr); // делаю категории уникальными
    let arrSubcat = Array.from(uniqueSubcat);

    let outSub = '';
    outSub += `<button class="mini subBtn active hidden"></button>`;

    arrSubcat.forEach(item => {
        outSub += `<button class="mini subBtn" data-atr="${item}">${item}</button>`;
    });

    // куда вывести подкатегории
    document.querySelector('.subcategory').innerHTML = outSub;

    // Добавляем обработчики событий для кнопок подкатегорий
    document.querySelectorAll('.subBtn').forEach(button => {
        button.addEventListener('click', () => {
            let subcategory = button.getAttribute('data-atr');
            goodsOut(data, subcategory); // Передаем данные и выбранную подкатегорию
        });
    });


    // тут делаю активную кнопку оранжевого цвета
    let btns = document.querySelectorAll('.subBtn')

      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            let current = document.querySelectorAll(".active");
            
                current[0].className = current[0].className.replace(" active", "");
            //console.log(this) // <button class="mini subBtn" data-atr="универсальный">
            this.className += " active";
        });
      }

      // рисую кнопки для переключения шт/гр
      let unitsBtns = document.querySelector('.unitsBtns');
      let outUnit = '';

      outUnit += `<div class="units">`;
      outUnit += `<button class="mini" data-atr="шт">Штуки</button>`;
      outUnit += `<button class="mini" data-atr="гр">Граммы</button>`;
      outUnit += `</div>`;

      unitsBtns.innerHTML = outUnit;
      selectedSubcategory = '';

    // Добавляем обработчики событий для кнопок единиц измерения
    document.querySelectorAll('.units .mini').forEach(button => {
        button.addEventListener('click', () => {
            let units = button.getAttribute('data-atr'); // Получаем значение data-atr
            console.log(units)
            goodsOut(data, selectedSubcategory, units); // Передаем units в goodsOut
        });
    });    

}





// вывожу список товаров
function goodsOut(data, selectedSubcategory = null, units = '') {
    let out = '';

    // if (data.length < 0) {
    //     out += `<h2>Нет товаров в этой категории</h2>`;
    // }

    //let units = 'шт';

    out += `<table>
    <thead>
    <tr>
        <th></th>
        <th></th>
        <th class="align-left"></th>
        <th></th>
    </tr>
    </thead>`;

    // Фильтруем товары по выбранной подкатегории
    data.forEach(item => {
        if (!selectedSubcategory || item.subcategory === selectedSubcategory) {
            
            if (item.name.includes(units)) {
                out += 
            `<tbody>
            <tr>
                <td>
                <p class="align-left">${item.id}</p>
                </td>
                <td>
                <p class="align-left">${item.name}</p>
                </td>
                <td class="align-left">
                <button class="mini">в корзину</button>
                </td>
            </tr>
            </tbody>`;
            }
        }
    });

    out += `</table>`;
    document.querySelector('.lists').innerHTML = out;
}





// по клику на кнопку нужно выводить подкатегорию (переменная) которая равна классу кнопки (переменная)
// и передавать (переменная) в функцию goodsOut
// let subBtn = document.querySelector('.subBtn');

//subBtn.addEventListener('click', )