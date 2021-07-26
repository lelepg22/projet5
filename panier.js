//Card Html

function cardPanier(product, color, quantity) {
  var html = ` 
                  <li class="oneItemPanier"> 
                      <img src="${product.imageUrl}" alt="${product.name}" class='card-img-top cardimgpanier'> </img>
                       <span class= 'textPanier'> ${product.name} - ${color}  </span> <span class='qtyPanier'><span class="prodUni">€ ${product.price} un.</span> qte. <span class="qty">${quantity}</span>    <i class="iconMinusPlus fas fa-plus"> <i class="iconMinusPlus fas fa-minus"></i> </i>  € <span class="productTotal" data-id="${product._id}">${prixItem}</span></span>
                  </li>    
                                      
                
                    
           `;
  return html;
}

let myCartStored = JSON.parse(localStorage.cart);
myPanierChange = [...myCartStored];
let myArray = [];
let productTotal = 0;

//Assembling and Calculating

function productCount(c, d) {
  if (c == undefined) {
    return productTotal;
  } else if (myArray[0][d] == undefined) {
    return productTotal;
  } else {
    if (c == myArray[0][d].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, "")) {      
      myArray[0].splice(d, 1);
      productTotal = ++productTotal;
      d = 0;
      productCount(c, d);
    } else if (c != myArray[0][d]) {
      productCount(c, ++d);
    }

    //Found equal item on cart
    // if(c != d) {

    //         //Assembling each equal item in Temporary Arrays
    //         function arraying(j){
    //             if(tempArray != undefined) {
    //                 if(tempArray[j] == undefined){ tempArray.push([myArray[0][c].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, ''), myArray[0][d].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, '')]) ;return tempArray}
    //                 else if (tempArray[j][0] == myArray[0][c].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, '')) { tempArray[j].push(myArray[0][c].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, ''), myArray[0][d].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, ''))}
    //                 else if(tempArray[j][0] != myArray[0][c].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, '')) { j++; arraying(j)}
    //             }
    //         }
    //         arraying(0);
    //     }
  }
}

function productQuantity(item) {
  myArray.push(myCartStored);

  productCount(item, 0);
}

let j = -1;

//Creating Card
async function createPanierCard() {
  let products = await getAllTeddies();

  function loopinCard(x, myItemsList, c) {
    if (j <= -1) {
      ++j;
      
    } else if (j > 5) {
      j = -1;
      
    } else if (j == 5) {++x; if(myCartStored[x] == undefined) {x=0}
      j = 5;
      
    } else if (j >= 0 && myCartStored[x] != undefined) {
      ++j;
    }

    if (myCartStored[x] == undefined) {
      if (products[j] == undefined) {
        return 0;
      } else {
        if (myCartStored[0] != undefined) {
          loopinCard(0, products[j]);
        }
      }
    }

    productTotal = 0;
    if (myCartStored[0] == undefined) {
      return 0;
    } else if (myCartStored[x] == undefined) {
      if (products[j] == undefined) {
        if (j == -1) {
          j = 0;
          loopinCard(x, products[j]);
        }
      } else if (j >= 5) {
        j = 0;
        loopinCard(x, products[j]);
      }
      loopinCard(0, products[j]);
    } else if (myCartStored[x] && myItemsList.name != undefined) {
      let productColourGetter = myCartStored[x]
        .substring(25, 37)
        .replace(/\s|:|Color/g, "");

      if (
        myCartStored[x].substring(9, 15).indexOf(myItemsList.name.substring(0, 5)) != -1
      ) {        
        productQuantity(myCartStored[x].replace(/\s|0|1|2|3|4|5|6|7|8|9/g, ""));

        function idPushing (times){ for (var number = 1; number <= times; number++) {
        myArrayProducts.push(myItemsList._id)}
        }
        
        idPushing(productTotal);


        function findColor(z) {
          if (myItemsList.colors[z] == undefined) {
            return 0;
          } else if (x == undefined) {
             loopinCard(0,products[0]);
          } else if (
            myItemsList.colors[z].replace(/\s/g, "").indexOf(productColourGetter) != -1
          ) {
            productColour = myItemsList.colors[z];
            return productColour;
          } else {
            findColor(++z);
          }
        }

        findColor(0);

        prixItem = myItemsList.price * productTotal;
        if (localStorage.total == undefined) {
          localStorage.total = prixItem;
        } else {
          localStorage.total = parseInt(localStorage.total) + prixItem;
        }

        if (localStorage.qtyPanier == undefined) {
          localStorage.qtyPanier = productTotal;
        } else {
          localStorage.qtyPanier =
            productTotal + parseInt(localStorage.qtyPanier);
        }

        document
          .getElementById("itemsPanier")
          .insertAdjacentHTML(
            "afterbegin",
            cardPanier(myItemsList, productColour, productTotal)
          );
      } else if (j == 5) {
        j = 0; loopinCard(x,products[j])
      } else if (myCartStored[x] != undefined) {++x;
        if (myCartStored[x] != undefined) {--x;
          loopinCard(x, products[j]);          
        }
        else if(myCartStored.length > 0){ loopinCard(0,products[j])}
      }
      // {debugger; if(b == products[j]) {if (products[++j] != undefined ){loopinCard(0, products[++j])} else{ j = 0 ;loopinCard(x,products[j])} }}
    }
    
  }
  // async function baby () { if(myCartStored.length > 0){
  //   while(myCartStored.length > 0) { let products = await getAllTeddies(); products.forEach( function (product) { loopinCard(0,0)
                
  //           } )
  //       }
  //   }
  //   }
  //   setInterval(baby, 3000);
  myCartStored.forEach(function (thing) {
    for (let product of products) {
      loopinCard(0, product);

      if (
        myCartStored.length == 1 &&
        myCartStored[0]
          .substring(9, 15)
          .indexOf(product.name.substring(0, 5)) != 0
      ) {
        continue;
      }
      // myCartStored.forEach( function(v) { for (let product of products) {debugger;; loopinCard(0)} } )}
    }
  });

  // setInterval(refreshCart, 1000);
  //     function refreshCart () { debugger;
  if (myCartStored.length != 0) {
    if (products[j] != undefined) {
      loopinCard(0, products[j]);
    } else {
      j = 0;
      loopinCard(0, products[j]);
    }
    loopinCard(0, products[j]);
  }
}

// if(myCartStored.length > 0) { debugger;
//     async function completePanier () {  let xuxu = await getAllTeddies()
//     for (let go of xuxu) {

//     }
//     }

if (myCartStored != undefined) {
  createPanierCard();
}

function refreshTotal() {
  document.getElementById("totalCart").textContent =
    "Total  €  " + localStorage.total;
}
setTimeout(refreshTotal, 100);

//Event Listener Minus Plus

function addOrRemovePanier(pathClicked) {
  function littleLoopPanier(m, g) {  
     
    if (myPanierChange[m] == undefined) {
      return 0;
    } else if (m == 0) { 
      
            if (
        pathClicked.path[g].children[1].innerHTML.replace(/\s|-/g, "") ==
        myPanierChange[m]
          .replace(/\s|Item|0|1|2|3|4|5|6|7|8|9|:|Color/g, "")
          .replace("[]", "")
      ) {
        if (
          pathClicked.path[0].outerHTML ==
          '<i class="iconMinusPlus fas fa-minus" aria-hidden="true"></i>'
        ) {          
          myPanierChange.splice(m, 1);
          localStorage.cart = JSON.stringify(myPanierChange);    
          


        } else if (
          pathClicked.path[0].outerHTML ==
          '<i class="iconMinusPlus fas fa-plus" aria-hidden="true"> <i class="iconMinusPlus fas fa-minus" aria-hidden="true"></i> </i>'
        ) {
          myArrayProducts.push(pathClicked.path[1].children[3].dataset.id)
          myPanierChange.push(myPanierChange[m]);
          localStorage.cart = JSON.stringify(myPanierChange);
          return 0;
        }
      }
      littleLoopPanier(++m, g);
    } else if (m >= 1) {
      if (
        pathClicked.path[g].children[1].innerHTML.replace(/\s|-/g, "") ==
        myPanierChange[m]
          .replace(/\s|Item|0|1|2|3|4|5|6|7|8|9|:|Color/g, "")
          .replace("[]", "")
      ) {
        if (
          pathClicked.path[0].outerHTML ==
          '<i class="iconMinusPlus fas fa-minus" aria-hidden="true"></i>'
        ) {  
         
        myPanierChange.splice(m, 1);
        localStorage.cart = JSON.stringify(myPanierChange);     
        }
        else if (
          pathClicked.path[0].outerHTML ==
          '<i class="iconMinusPlus fas fa-plus" aria-hidden="true"> <i class="iconMinusPlus fas fa-minus" aria-hidden="true"></i> </i>'
        ) {
          myArrayProducts.push({id: pathClicked.path[1].children[3].dataset.id})
          myPanierChange.push(myPanierChange[m])
          localStorage.cart = JSON.stringify(myPanierChange);
          return 0;
          
        }

        
      }
      littleLoopPanier(++m, g);    }
  }

  if (
    pathClicked.path[0].outerHTML ==
    '<i class="iconMinusPlus fas fa-minus" aria-hidden="true"></i>'
  ) {
    console.log("clicked minus");
    function removeIdArray(k) {
      if (myArrayProducts[k].id == pathClicked.path[2].children[3].dataset.id){ myArrayProducts.splice(k,1) }
      else{ removeIdArray(++k) }
    }
      removeIdArray(0)

    if (localStorage.chiffrePanier >= 1) {
      if (localStorage.chiffrePanier > 0) {
        addPanierHeader(--localStorage.chiffrePanier);
      }
    } else {
      addPanierHeader(0);
      localStorage.chiffrePanier = getPanierCount;
    }



    let valueUnity = parseInt(
      pathClicked.path[2].children[0].innerHTML.replace(/\s|€|un./g, "")
    );
    let valueTotalItem = parseInt(
      pathClicked.path[2].children[3].innerHTML.replace(/\s|€|/g, "")
    );
    let valueQty = parseInt(pathClicked.path[2].children[1].innerHTML);
    let valueTotalPanier = parseInt(
      pathClicked.path[8].children[1].innerHTML.replace(/\s|:|Total|€/g, "")
    );
    let valueTotalPanierTxt = "Total €" + String(valueTotalPanier - valueUnity);
    let x = 0;

    if (valueQty > 0) {
      pathClicked.path[2].children[3].innerHTML = valueTotalItem - valueUnity;
      pathClicked.path[2].children[1].innerHTML = --valueQty;
      pathClicked.path[8].children[1].innerHTML = valueTotalPanierTxt;
      localStorage.total = valueTotalPanier - valueUnity;
      littleLoopPanier(0, 3);
    }
  } else if (
    pathClicked.path[0].outerHTML ==
    '<i class="iconMinusPlus fas fa-plus" aria-hidden="true"> <i class="iconMinusPlus fas fa-minus" aria-hidden="true"></i> </i>'
  ) {
    console.log("clicked PLUS");

    if (localStorage.chiffrePanier >= 1) {
      addPanierHeader(++localStorage.chiffrePanier);
    } else {
      addPanierHeader(++getPanierCount);
      localStorage.chiffrePanier = getPanierCount;
    }

    let valueUnity = parseInt(
      pathClicked.path[1].children[0].innerHTML.replace(/\s|€|un./g, "")
    );
    let valueTotalItem = parseInt(
      pathClicked.path[1].children[3].innerHTML.replace(/\s|€|/g, "")
    );
    let valueQty = parseInt(pathClicked.path[1].children[1].innerHTML);
    let valueTotalPanier = parseInt(
      pathClicked.path[7].children[1].innerHTML.replace(/\s|:|Total|€/g, "")
    );
    let valueTotalPanierTxt = "Total €" + String(valueTotalPanier + valueUnity);

    pathClicked.path[1].children[3].innerHTML = valueTotalItem + valueUnity;
    pathClicked.path[1].children[1].innerHTML = ++valueQty;
    pathClicked.path[7].children[1].innerHTML = valueTotalPanierTxt;
    localStorage.total = valueTotalPanier + valueUnity;
    littleLoopPanier(0, 2);
  }

  console.log(pathClicked);
}
document
  .getElementById("panierCard")
  .addEventListener("click", addOrRemovePanier);

function resetTotal() {
  localStorage.total = 0;
}

if (document.getElementById("totalCart").textContent == "Total  €  undefined") {
  window.location.reload();
}



window.onbeforeunload = resetTotal();

// { <p> <img src="${product.imageUrl}" alt="${product.name}" class='card-img-top mx-sm-0 cardimgpanier'></img> - ${product.name} - ${product.colour} x ${productQuantity} | <i class="fas fa-plus"> <i class="fas fa-minus"></i></i>   </p>}