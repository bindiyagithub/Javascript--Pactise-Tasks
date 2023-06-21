const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "bison steak",
    category: "dinner",
    price: 22.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

function display(data) {
  // display data
  const mynewMenu = data.map(function (value) {
    return ` <article class="menu-item">
  <img src="${value.img}" alt="menu item" class="photo" />
  <div class="item-info">
    <header>
      <h4>${value.title}</h4>
      <h6>${value.category}</h6>
      <h4 class="price">${value.price}</h4>
	  
    </header>
    <p class="item-text">
      ${value.desc}
    </p>
  </div>
</article>`;
  });
    document.getElementById("menu").innerHTML = mynewMenu.join("");

        // display all category buttons

       let displayBtn  =  data.map( (value) =>{
            return`<button type="button" class="filter-btn" 
            data-id="all" onclick= "FilterByCategory('${value.category}')">
                ${value.category}</button>`; 
             });

      //document.getElementById("btn").innerHTML = displayBtn.join(" ");

           //now filter category buttons

        let filterBtn =  displayBtn.reduce( (pre , value)=>{
                         
                         if( pre.includes(value) == false)
                         {
                                 pre.push(value);

                         }
                         return pre;

        },[]);

      document.getElementById("btn").innerHTML =  filterBtn.join(""); 
      
  } 
  display(menu);
        
  // now filter the Menu-items by clicking on this category-button


    /*  function FilterByCategory(categoryName){
        let DisplayFilterItems =  menu.filter((value)=>{
            return value.category.toLowerCase() == categoryName.toLowerCase();
        })
            display(DisplayFilterItems);
      }    */   

  // same here above we can filter the Menu Item by searching the category- button name 

       function FilterByCategory(){
             let SearchItem = document.getElementById("searchCategory").value;
              let FilterItems =  menu.filter((value)=>{
                     return value.category.toLowerCase() == SearchItem.toLowerCase();
              })
              display(FilterItems);       
        }    

      /* in search box, if we select category then display the category & if we select the
      price then display the price  */ 

           


  // now arrange category-name in ASC & DESC order       
        function sortCategoryItems(order)
        {
            let myData = menu;
            let value1 = 1;
            let value2 = -1;
               
              if(order == "dsc")
              {
                value1 = -1;
                value2 = 1;    
              }
                
        let d = myData.sort(function(a,b){

            if(a.category == b.category)
            {
                if(a.title > b.title)
                {
                    return 1;
                }
                else
                {
                  return -1
                }
            }
                else if(a.category == b.category)
                {
                  if(a.price > b.price)
                  {
                    return 1
                  }
                  else
                  {
                  return -1;
                  }
                }
                else if(a.category > b.category)
                 { 
                  return value1;

                 }
            else
            {
              return value2;
            }

        });
      
          //console.log(d);
          display(d);
      
      }      
 
     // now display all Category-Item in ASC & DESC price
   

