var obj;
var obj1;

async function conexionAjax() {
  // await code here
  let result = await makeRequest("GET", "http://localhost:3000/invitados");
  // code below here will only execute when await makeRequest() finished loading
  
}

document.addEventListener('DOMContentLoaded', () => {
  conexionAjax();
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  filterLabel.textContent = "Ocultar los que no hayan respondido";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';  
        } else {
          li.style.display = 'none';                        
        }
      }
    } else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }                                 
    }
  });
  
  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);  
      element[property] = value; 
      return element;
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);     
      li.appendChild(element); 
      return element;
    }
    
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);     
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);

    let postObj = { 
      id: obj1[obj1.length-1].id+1, 
      nombre: text, 
      confirmado: false
  }

    let post = JSON.stringify(postObj)
    const url = "http://localhost:3000/invitados"
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(post);
    xhr.onload = function () {
      if(xhr.status === 201) {
          console.log("Post successfully created!") 
      }
  }
   
    
  });
    
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';

      for (let i = 0; i < document.getElementsByTagName("li").length; i++) {

        if(document.getElementsByTagName("li")[i].getElementsByTagName("span")[0]==listItem.getElementsByTagName("span")[0]){


          let putObj = { 
            id: obj1[i].id, 
            nombre: obj1[i].nombre, 
            confirmado: true
        }
      
          let put = JSON.stringify(putObj);
          const url = "http://localhost:3000/invitados/"+obj1[i].id;
          let xhr = new XMLHttpRequest();
          xhr.open('PUT', url, true);
          xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
          xhr.send(put);
          xhr.onload = function () {
            if(xhr.status === 200) {
                console.log("Put successfull!") 
            }
        }
        }
        
        
      }
   
      
      


    } else {
      listItem.className = '';

      for (let i = 0; i < document.getElementsByTagName("li").length; i++) {

        if(document.getElementsByTagName("li")[i].getElementsByTagName("span")[0]==listItem.getElementsByTagName("span")[0]){


          let putObj = { 
            id: obj1[i].id, 
            nombre: obj1[i].nombre, 
            confirmado: false
        }
      
          let put = JSON.stringify(putObj);
          const url = "http://localhost:3000/invitados/"+obj1[i].id;
          let xhr = new XMLHttpRequest();
          xhr.open('PUT', url, true);
          xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
          xhr.send(put);
          xhr.onload = function () {
            if(xhr.status === 200) {
                console.log("Put successfull!"); 
            }
        }
        }
        
        
      }
    }
  });
    
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {

          for (let i = 0; i < document.getElementsByTagName("li").length; i++) {

            if(document.getElementsByTagName("li")[i].getElementsByTagName("span")[0]==li.getElementsByTagName("span")[0]){

    
              
          
              
              const url = "http://localhost:3000/invitados/"+obj1[i].id;
              let xhr = new XMLHttpRequest();
              xhr.open('DELETE', url, true);
              xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
              xhr.send();
              xhr.onload = function () {
                if(xhr.status === 200) {
                    console.log("Delete successfull!") 
                }
            }
            }
            
            
          }
          ul.removeChild(li);
          
          

        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';  
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit'; 

          for (let i = 0; i < document.getElementsByTagName("li").length; i++) {


            if(li.getElementsByTagName("span")[0]==document.getElementsByTagName("li")[i].getElementsByTagName("span")[0]){


              let patchObj = { 
                id: obj1[i].id, 
                nombre: li.getElementsByTagName("span")[0].innerText 
                
            }

              let patch = JSON.stringify(patchObj);
              const url = "http://localhost:3000/invitados/"+obj1[i].id;
              let xhr = new XMLHttpRequest();
              xhr.open('PATCH', url, true);
              xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
              xhr.send(patch);
              xhr.onload = function () {
                if(xhr.status === 200) {
                    console.log("Patch successfull!") 
                }
              }
            }
          }
                 
        }
      };
      
      // select and run action in button's name
      nameActions[action]();
    }
  });  
});  
  
  
function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          
           obj=this.responseText;
           obj1 = JSON.parse(obj);

          for (let i = 0; i < obj1.length; i++) {
            
            const li = document.createElement("li");
          const span = document.createElement("span");
          let nombre = document.createTextNode(obj1[i].nombre);
          let label = document.createElement("label");
          const confirmed = document.createTextNode("Confirmed");
          const confirmedCheckbox= document.createElement("input");
          confirmedCheckbox.type= "checkbox";
          const buttonEdit = document.createElement("button");
          const buttonRemove = document.createElement("button");

          if (obj1[i].confirmado==true) {
            confirmedCheckbox.checked = true;

            li.className="responded";
            
          }

          buttonEdit.appendChild(document.createTextNode("edit"));
          buttonRemove.appendChild(document.createTextNode("remove"));

          
          label.appendChild(confirmed);
          label.appendChild(confirmedCheckbox);

          span.appendChild(nombre);
          
          li.appendChild(span);
          li.appendChild(label);
          li.appendChild(buttonEdit);
          li.appendChild(buttonRemove);

          document.getElementById("invitedList").appendChild(li);
          a0 = obj1.a0;

          }
      }
      };
      xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
      };
      xhr.send();
  });
}


  
  
  
  
  
  