import { books } from './data.js'

// Đổi màu banner
let color = document.getElementsByClassName('color')
for (let i = 0; i < color.length; i++) {
  color[i].addEventListener('click', function (){
    let header = document.getElementsByTagName('header')[0]

    //Do em không lấy được background-color của từng id color nên phải làm cách này
    if (color[i].id != 'gradient') {
      header.style.backgroundImage = 'none'
      switch (color[i].id) {
        case 'red':
          header.style.backgroundColor = '#992154'
          break;
  
        case 'yellow':
          header.style.backgroundColor = '#fcbf16'
          break;
  
        case 'blue':
          header.style.backgroundColor = '#173451'
          break;
      
        default:
          break;
    } 
    } else {
      header.style.backgroundImage = 'linear-gradient(to right, #fcbf16, #992154)'
    }
  })
}

// Tạo box của từng quyển sách
function createItem(item) {
  let div = document.createElement('div')
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let p = document.createElement('p')

  img.src = `./images/0${item.id}.jpg`
  h2.innerHTML = item.name
  p.innerHTML = item.price

  div.className = 'item'
  div.appendChild(img)
  div.appendChild(h2)
  div.appendChild(p)

  return div
}

// Tạo list sách và sắp xếp theo tên
function list(item) {
  let list = document.getElementById('list')
  for (let i = 0; i < item.length; i ++) {
    list.appendChild(createItem(item[i]))
  }
}

function compare( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

list(books.sort(compare))

// Tìm kiếm 
let search = document.getElementById('search')
search.addEventListener('change', function () {
  let box = document.getElementsByClassName('item')
  for (let i = 0; box.length > 0; i++) {
    box[0].remove()
  }
  let searchList = []
  for (let i = 0; i < books.length; i++) {
    if (books[i].name.toLowerCase().includes(search.value.toLowerCase())) {
      searchList.push(books[i])
    }
  }
  list(searchList)
})

// Lọc khoảng giá
document.getElementById('apply-price-filter').addEventListener('click',function filterPrice() {
  let box = document.getElementsByClassName('item')
  for (let i = 0; box.length > 0; i++) {
    box[0].remove()
  }

  let min = document.getElementById('min-price').value
  let max = document.getElementById('max-price').value

  console.log(box);
  let filter = []
  for (let i = 0; i < books.length; i++) {
    if (min <= books[i].price && books[i].price <= max) {
      filter.push(books[i])
    }
  }

  list(filter)
})



function createElement() {
  let checkbox = document.querySelectorAll('input[type=checkbox]')
  
  for (let i = 0; i < checkbox.length; i++) {
    document.getElementById(`provider-${i+1}`).addEventListener('change', event => {
      action()
      if (event.target.checked) {
        let temp = []
        for (let j = 0; j < books.length; j++) {
          if (books[j].provider === checkbox[i].labels[0].textContent) {
            temp.push(books[j])
          }
        }
        list(temp);
      }
    })}}
// document.getElementById('provider-1').addEventListener('change', event => {
//   console.log(event.target.checked);
// })
function action() {
  let box = document.getElementsByClassName('item')
  for (let i = 0; box.length > 0; i++) {
    box[0].remove()
  }
  createElement()
}

