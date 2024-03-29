$(document).ready(()=>{
    document.querySelectorAll(".country-link").forEach((item)=>{
        item.addEventListener('click',(event)=>{
            event.preventDefault();
            console.log(item.innerHTML);
            window.location.href=`../author/${item.innerHTML}`
        })
    })

    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a); 
            let label = inp.parentNode.getElementsByTagName('label');
            if(label.length !== 0){
                label[0].remove();
            }
            let added = 0;
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {

              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                if(added == 3) break;
                added++;
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                inp.form.action=`../${inp.id}/${inp.value}`;
                closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
    }

    function capitalizeFirstLetter(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    document.querySelector("#submit-country").addEventListener("click", (event)=>{
    
        const inp = document.getElementById("country"),
              inpValue = capitalizeFirstLetter(inp.value);
        inp.form.action=`../country/${inpValue}`;
        if(countries.indexOf(inpValue) === -1){
            event.preventDefault();
            if(inp.parentNode.getElementsByTagName('label').length === 0){
                let label = document.createElement('label');
                label.setAttribute("for", inp.id);
                label.innerText="Wrong country name!";
                inp.parentNode.insertBefore(label, inp.nextSibling);
            }
        }
    }, false);

    autocomplete(document.getElementById("country"), countries);
})

// const headers = ["Book title", "Author"];

// arr = Object.entries(list);
// var table = $("<table class='table' />");
// table[0].border = "1";

// var columnCount = headers.length;

// var row = $(table[0].insertRow(-1));
// for (var i = 0; i < columnCount; i++) {
//     var headerCell = $('<th scope="col" />');
//     headerCell.html(headers[i]);
//     row.append(headerCell);
// }

// for (var i = 1; i < arr.length; i++) {
//     row = $(table[0].insertRow(-1));
//     var rowData = Object.values(arr[i]);

//     for (var j = 0; j < columnCount; j++) {
//         var cell = $("<td />");
//         cell.html(rowData[j]);
//         row.append(cell);
//     }
// }

// var dvTable = $("#booksTable");
//     dvTable.html("");
//     dvTable.append(table);