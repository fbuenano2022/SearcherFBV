let urlJs='https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json';
let urlxml='https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml';
let _html='';

let rJSON = async ( urlJs,arr ) => {
  try {
    let response = await fetch( urlJs ); 
    let result = await response.json()
    let res=result.map(function(el)
    {
      arr.push(el);
    });
  } catch (error) 
  {
    console.log( error );
    
  }
};
let rXML = async ( urlxml,arr ) => {
    try {
      let response = await fetch( urlxml ); 
      let result = await response.text()
      let xml = (new DOMParser()).parseFromString(result, 'application/xml');
      let _res=xml.getElementsByTagName('product');
      for(let x of _res)
      {
        let _name=x.getElementsByTagName("name")[0].innerHTML;
        let _price=x.getElementsByTagName("price")[0].innerHTML;
        let _src=x.getElementsByTagName("src")[0].innerHTML;
        let _type=x.getElementsByTagName("type")[0].innerHTML;
        let obj = { name: _name, price:_price ,src:_src, type:_type };
        arr.push(obj);
      }
    } catch (error) 
    {
      console.log( error );
    }
  };
 let _productsHTML= function(src,name,type,price)
 {
    let html=`<div class='col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4'>
    <div class='card card-blog card-plain'>
      <div class='card-header p-0 mt-n4 mx-3'>
        <a class='d-block shadow-xl border-radius-xl'>
          <img src='${src}' alt='${name}' class='img-fluid shadow border-radius-xl'>
        </a>
      </div>
      <div class='card-body p-3'>
        <p class='mb-0 text-sm'>${type}</p>
        <a href='javascript:;'>
          <h5>
            ${name}
          </h5>
        </a>
        <p class='mb-4 text-sm'>
          <b>Price: </b> $ ${price}
        </p>
      </div>
    </div>
  </div>  
    `;
    return html;
 } 

 let llamada=async function(_filter)
 {
  let arr = new Array();
  _html='';
  await rJSON(urlJs,arr);
  await rXML(urlxml,arr);
  let newarry=arr.filter(function (el){return el.type.toLowerCase().includes(_filter.toLowerCase()) || el.name.toLowerCase().includes(_filter.toLowerCase())});
  newarry.map(function(el){
    _html=_html+_productsHTML(el.src,el.name,el.type,el.price)
  });
  document.getElementById("_Products").innerHTML=_html;
 };

 let btn = document.getElementById('filter');
 btn.addEventListener('click', function(event){
  let txtFilter=document.getElementById('text');
  let _filter=txtFilter.value;
  llamada(_filter);
 });
 llamada('');
 

