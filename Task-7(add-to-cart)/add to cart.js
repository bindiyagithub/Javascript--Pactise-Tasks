let products = [];
let carts = []; // for add the multiple items into this blank array, those items we add into cart with btn.

fetch("https://fakestoreapi.com/products")
.then(y=>y.json())
.then(y=>
{
  display(y);
})

    

function display(arrayProducts)
{
      
        ////////// display the category button using map() //////////////
   products = arrayProducts;

   let categoryBtn = products.map((value)=>
   {

     return(`<button class="btn btn-primary m-2 ms-5" 
     onclick="FilterByCategory('${value.category}')">
     ${value.category}</button>`);
   });


   ////////////  remove dublicate button ////////////////
  let reduceBtn = categoryBtn.reduce((pre,value)=>{
          if(pre.includes(value) == false)
          {
               pre.push(value);
          }
          return pre;
   },[])
   document.getElementById("displayButton").innerHTML = reduceBtn.join("");   

      
//////////// display the products //////////////////////
              
      let productCards = arrayProducts.map((value , index)=>
      {

            // for search the title text in red color
            let SearchText= document.getElementById("term").value;
              let mytitle = "";

            if(SearchText == "")
            {
               mytitle = value.title;

            }
            else
            {
              mytitle = `${value.title.slice(0,value.title.indexOf(SearchText))}
              <span style="background-color:red">
              ${value.title.substr(value.title.indexOf(SearchText) , SearchText.length)}
              </span> 
              ${value.title.substr(value.title.indexOf(SearchText)+ 
                SearchText.length)}`;
                console.log(mytitle);
            }

              // for display all products
                  return(`<div class="col-4 mt-2 ">
                    <div class="card"> 
                    <div class="card-header mb-2  mx-2">
                    <img class="card-img-top" src="${value.image}" alt="Card image" 
                    width="200" height="350" draggable="true" ondragstart="drag(event,${index})">
                    </div>
          
                    <div class="card-body">
                    <h4 class="card-title">${mytitle}</h4>
                    <h5 class="text-secondary">category : ${value.category}</h5>
                    <h5>${value.price}</h5>
                    <p class="card-text" id="${index}" 
                    onclick= "readmore(${index})">
                    ${value.description.slice(0 ,22).concat("<a href='#'>Readmore.... </a>")}
                    </p>
                    </div>
          
                    <div class="card-footer d-grid">
                     <button type = "button" class="btn btn-info" 
                     onclick="AddtoCart(${index})" >
                     Add To Cart</button>  
                    </div> </div>
                  </div>`)


      })
    
   
   document.getElementById("displayProducts").innerHTML =  productCards.join(""); 

}
display(products); 

/////////////   now filter the product by their category //////////

// note :- isme mens'clothing & women'clothing mai problem hai
      function FilterByCategory(categoryName)
      {
        let d =  products.filter((value)=>
          {
              return value.category == categoryName;
          });
          
          display(d);
      }

  /////////////////  now add to product into cart ///////////////

  
  
  function AddtoCart(index)
  {
      let selectedItems = products[index]; 

        let myIndex = carts.findIndex((value)=>
        {
             return value.title == selectedItems.title;
        })

      if(myIndex < 0)
      {
           selectedItems["quantity"] = 1; 
           carts.push(selectedItems);
      }
      else
      {
          carts[myIndex].quantity = carts[myIndex].quantity+1;
          
      }
      //console.log(carts);
      document.getElementById("count").innerHTML = carts.length;

  }
  //////////////// for display total price ///////////////////
  /* yaha humne jo bhi add to cart kiya hai wo sari items ki
  price ka total karna hai so use reduce  */

   function displayPrice()
   {
      let price = carts.reduce((pre ,val)=>{
            return pre + val.quantity * val.price; 

      },0);
            console.log(price);
            document.getElementById("btn").innerHTML =price;
   }



   function cartDisplay()
{
  console.log(carts);
    
  $('#myModal').modal('show');
 
  let t = carts.map((value)=> {
    return(`<div>
      <img height="200" width="200" src=${value.image} />
      <input type="text" value=${value.quan}>
      <button> + </button>
      <button> - </button>
      <span>${value.price}</span>
    
    </div>`)
  })
  document.getElementById("cartDisplay").innerHTML = t.join(" ");


}
  


   // for drag the image

  function drag(ev,id) 
{
  ev.dataTransfer.setData("text",id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  AddtoCart(data);
}


   //////////////  readmore & readless on description ////////////////

   function readmore(index)
{
  let d = document.getElementById(index).innerText;

  if(d.includes("Readmore") == true)
  {
    document.getElementById(index).innerHTML = products[index].description
    .concat("<a href='#'>...Readless</a>");
  }
  else
  {
    document.getElementById(index).innerHTML = products[index].description
    .slice(0,22).concat("...Readmore");
  }

}

   ///////// for searching on title - any text in red color ///////////

   function filterTitleText()
   {
      let SearchText = document.getElementById("term").value;


      let htmldata = products.filter((value,index)=> 
      {

        return value.title.toLowerCase().includes(SearchText.toLowerCase());

      });
     display(htmldata);
     
    }

    