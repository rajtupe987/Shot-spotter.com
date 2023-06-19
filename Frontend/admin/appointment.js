let token = localStorage.getItem("token")

let Dat ;
async function getData() {
 
  
 
      try {
          let res = await fetch("http://localhost:8000/studio", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  
                  "Authorization":token
              },
              
          })
          let data = await res.json();
          console.log(data);
          Dat=data;
          showphotographer(data);
      } catch (error) {
          console.log(error);
      }
     

  
}
getData();


function showphotographer(Data){
   let slots = Data.map((item)=>{
      return `
      <tr>
        <td>
          <h4>${item._id}</h4>
        </td>
        <td>
          <h4>${item.name}</h4>
        </td>
        <td>
          <h4>${item.location}</h4>
        </td>
        <td>
          <h4>${item.availability}</h4>
        </td>
        <td>
        <h4>${item.price}</h4>
      </td>
        
        
      </tr>
      `
   })

   document.getElementById("photographer").innerHTML=slots.join("  ")
}