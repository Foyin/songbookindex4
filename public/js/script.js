function songUpdateHandler() {
  //========================
  /*
  This function issued to update the details of a song in the server database
  It uses the current value of the textfields in the song details view to send
  to the database. The song_id field is  not user editable which means the user
  cannot add new rows to the database, only edit the detail fields of existing
  rows in the database's songs table.
  */
  let song_id = document.getElementById('song_id_field').value
  let song_title = document.getElementById('song_title_field').value
  let song_composer = document.getElementById('song_composer_field').value
  let song_bookcode = document.getElementById('song_bookcode_field').value
  let song_page = document.getElementById('song_page_field').value
  let song_length = document.getElementById('song_length_field').value
  let song_contributer = document.getElementById('song_contributer_field').value

  console.log(`Updating song_id: ${song_id}`)
  let url = `/api/song/${song_id}`
  let song_data = {
    id: song_id,
    title: song_title,
    composer: song_composer,
    bookcode: song_bookcode,
    page: song_page,
    length: song_length,
    studentnum: song_contributer
  }

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
     {"status": "SUCCESS"}
    */
      console.log(`Status: ${response.status}`)
    }
  }
  //send HTTP POST message with JSON data
  xhr.open('POST', url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(song_data)) //send JSON data to server
}

function bookUpdateHandler() {
  //========================
  /*
  This function is called to update the details of books in the datbase's bookcodes table
  The current values of book details fields is used to send to the database.
  The bookcode (primary key) is not user editable which means this funtion will
  not add new rows to the database's bookcodes table - only update details of
  existing books
  */
  let book_bookcode = document.getElementById('book_id_field').value
  let book_title = document.getElementById('book_title_field').value
  let book_format = document.getElementById('book_format_field').value
  let book_filename = document.getElementById('book_filename_field').value
  let book_page_offset = document.getElementById('book_page_offset_field').value
  let book_num_pages = document.getElementById('book_num_pages_field').value

  console.log(`Updating book_id: ${book_bookcode}`)
  let url = `/api/book/${book_bookcode}`
  let book_data = {
    bookcode: book_bookcode,
    title: book_title,
    format: book_format,
    filename: book_filename,
    page_offset: book_page_offset,
    num_pages: book_num_pages
  }

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
     {"status": "SUCCESS"}
    */
      console.log(`Status: ${response.status}`)
    }
  }
  //send HTTP POST message with JSON data
  xhr.open('POST', url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(book_data)) //send JSON data to server
}

function songSelectHandler(song_id) {
      // ==========================
/*
This function is called when a song is selected in the song search results list.
It requests the details of the song from the server and displays them in an HTML
area that allows the individual fields (except id) to be edited. The updated
information can be sent back to the server to update the details of the song
in the database's songs table.
*/
  let songDetailsDiv = document.getElementById('item_details')
  songDetailsDiv.innerHTML = ''
  let url = `/api/song/${song_id}`

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
      {
      "id": 372,
      "title": "Girl From Ipanema, The",
      "composer": "Jobim Antonio-Carlos",
      "bookcode": "RBK1",
      "page": "372",
      "length": "1",
      "studentnum": "100123456",
      }

      */
      //build and populate song details text input fields

      songDetailsDiv.innerHTML += `<h3>Song Details</h3>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_label">ID: <input  readonly class="details" type="text"  id="song_id_field" value="${response.id}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      let titleEscaped = response.title.replace(/"/g,'&quot;') //replace " character with html &quot; escape instead
      songDetailsDiv.innerHTML += `<div class="input_label">TITLE: <input class="details" type="text" id="song_title_field" value="${titleEscaped}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      let composerEscaped = response.composer.replace(/"/g,'&quot;') //replace " character with html &quot; escape instead
      songDetailsDiv.innerHTML += `<div class="input_label">COMPOSER: <input class="details" type="text" id="song_composer_field" value="${composerEscaped}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_label">BOOKCODE: <input class="details" type="text" id="song_bookcode_field" value="${response.bookcode}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_label">PAGE: <input class="details" type="text" id="song_page_field" value="${response.page}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_label">LENGTH: <input class="details" type="text" id="song_length_field" value="${response.length}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_label">STUDENT NUM: <input class="details" type="text" id="song_contributer_field" value="${response.studentnum}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<button id="song_update" onclick="songUpdateHandler()" >Update</button>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function bookSelectHandler(book_id) {
      // =========================
  /*
  This function is used when a book is selected in the books results list.
  It displays the selected book's details in an HTML area that allows
  each field to be edited (exept the bookcode) and for the edited values
  to be sent to the server to update the server database's table bookcodes
  entries.
  */
  let bookDetailsDiv = document.getElementById('item_details')
  bookDetailsDiv.innerHTML = ''
  let url = `/api/book/${book_id}`

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
      {
      "bookcode": "RBK1",
      "title": "Real Book Vol 1",
      "format": "PDF",
      "filename": "RBK1_RealBookV1.pdf",
      "page_offset": "10",
      "num_pages": "412",
      }

      */
      //build and populate book details text input fields

      bookDetailsDiv.innerHTML += `<h3>Book Details</h3>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_label">BOOKCODE: <input  readonly class="details" type="text"  id="book_id_field" value="${response.bookcode}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_label">TITLE: <input class="details" type="text" id="book_title_field" value="${response.title}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_label">FORMAT: <input class="details" type="text" id="book_format_field" value="${response.format}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_label">FILENAME: <input class="details" type="text" id="book_filename_field" value="${response.filename}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_label">PAGE OFFSET: <input class="details" type="text" id="book_page_offset_field" value="${response.page_offset}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_label">NUM PAGES: <input class="details" type="text" id="book_num_pages_field" value="${response.num_pages}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<button id="book_update" onclick="bookUpdateHandler()" >Update</button>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function keywordSearchHandler() {
       //======================
/*
This function is used to search songs based on a keyword.
It uses the server api like /api/songs?keyword=Jobim
to search for songs that have the keyword in the song's title
or the name of the composer

This function populate the two HTML lists: one showning songs (N:N table)
that match the keyword and the other showing the books that those
songs came from.
*/

  let keyword = document.getElementById('keyword').value.trim()
  document.getElementById('keyword').value = keyword //replace with trimmed value
  let url = `/api/songs?keyword=${keyword}`
  if (keyword === '') {
    url = `/api/songs`
  }

  let songDiv = document.getElementById('search_results')
  songDiv.innerHTML = ''
  //clear song details div
  let songDetailsDiv = document.getElementById('item_details')
  songDetailsDiv.innerHTML = ''


  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //response is expected to object like: {songs: [ {id: title:},{id: title:},...]}
      songDiv.innerHTML +=  `<h3>Songs matching: ${keyword} [first 30 results]</h3><ul style="list-style-type:none">`
      let results_bookcodes = {}

      //build HTML list of song obtained from the server
      for (let song of response.songs) {
        songDiv.innerHTML +=  `<li style="list-style-type:none" onclick="songSelectHandler(${song.id})">
<font color="blue">${song.bookcode} [${song.page}]  ${song.title}</font></li>`
      results_bookcodes[song.bookcode] = song.book_title //capture the bookcodes in the results as a set
      }
      songDiv.innerHTML += `</ul>`

      //put bookcodes that he songs came from in the book search results list
      console.log(results_bookcodes)
      let bookDiv = document.getElementById('book_results')
      bookDiv.innerHTML = '' //clear book results list
      bookDiv.innerHTML +=  `<h3>Books: ${keyword} </h3><ul style="list-style-type:none">`
      for (let bookcode in results_bookcodes) {
        bookDiv.innerHTML += `<li style="list-style-type:none" onclick="searchBookForKeywordHandler('${bookcode}')">
<font color="blue">${bookcode}: ${results_bookcodes[bookcode]}</font></li>`
      }
      bookDiv.innerHTML += `</ul>`

    }

  }
  xhr.open('GET', url, true)
  xhr.send()
}

function searchBookForKeywordHandler(bookcode) {
       //=============================
       /*Search server database for songs in the book represented by bookcode.
         If there is a keyword in the UI text field use that to include onlysongs
         whose title or composer contains the keyword

         Uses the server api like /api/songs?keyword=Jobim&bookcode=RBK1

         This function is called when a particular book is selected from the
         HTML book results list and so the book list itself is not updated
         (unlike the keywordSearchHandler which does update the book list)
       */
  console.log('search book for keyword: ' + bookcode)
  let keyword = document.getElementById('keyword').value.trim()
  document.getElementById('keyword').value = keyword //replace with trimmed value
  let url = `/api/songs?keyword=${keyword}&bookcode=${bookcode}`
  if (keyword === '') {
    url = `/api/songs?bookcode=${bookcode}`
  }

  let songDiv = document.getElementById('search_results')
  songDiv.innerHTML = ''
  //clear song details div
  let songDetailsDiv = document.getElementById('item_details')
  songDetailsDiv.innerHTML = ''


  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //response is expected to object like: {songs: [ {id: title:},{id: title:},...]}
      songDiv.innerHTML +=  `<h3>Songs from book: ${bookcode} (matching: ${keyword}) ALL RESULTS</h3><ul style="list-style-type:none">`
      for (let song of response.songs) {
        console.log(`${song.id}:  ${song.bookcode}: ${song.title}`)
        songDiv.innerHTML +=  `<li style="list-style-type:none" onclick="songSelectHandler(${song.id})">
<font color="blue">${song.bookcode} [${song.page}]  ${song.title}</font></li>`
      }
      songDiv.innerHTML += `</ul>`
      //Use book select function to show details of the particular book
      //so they can be edited and updated
      bookSelectHandler(bookcode)
    }

  }
  xhr.open('GET', url, true)
  xhr.send()
}


//Attach Enter-key Handler for search field
const ENTER = 13 //Enter key character code
document.getElementById("keyword")
  .addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === ENTER) {
      document.getElementById("search").click()
    }
  })
