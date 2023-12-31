let show=document.getElementById("after-nav-col-1");
let donotshow = document.getElementById("after-nav-col-2")

let role = localStorage.getItem("role")
let token = localStorage.getItem("token")
if(role=="admin"){
  show.innerHTML=
  `
  
      <div class="row">
          <a><h2>Dashboard</h2></a>
      </div>
     
     <div class="row">
      <a href="./appointment.html"> <h2>All Appointments</h2></a>   
      </div>
      <div class="row">
          <a href="./addteacher.html"><h2>Add photographer</h2></a>    
      </div>
      <div class="row">
          <a href="./remove.html"> <h2>Remove photographer</h2></a>
  `
  
}else if(role=="photographer"){
  show.innerHTML=
` 
   
   <div class="row">
    <a href="./appointment.html"> <h2>Show Appointments</h2></a>   
    </div>
   
`
donotshow.innerHTML=""

}



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
   let teachers = Data.map((item)=>{
      return `
      <tr>
        <td>
          <h4>${item._id}</h4>
        </td>
        <td>
          <h4>${item.name}</h4>
        </td>
        <td>
          <h4>${item.availability}</h4>
        </td>
        
        
      </tr>
      `
   })

   document.getElementById("photographer").innerHTML=teachers.join(" ")
}

function searchphotographer(){
    let q=document.querySelector(".searchphotographer").value;
    
    let newdata=Dat.filter(function(elem){
        return elem.teacherName.toLowerCase().includes(q.toLocaleLowerCase());
    });
  console.log(newdata)
    showphotographer(newdata);
}