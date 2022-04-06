//id's to identify the block for deletion and updating of listobj for iteration
let skillid = 1;
let experienceid = 1;
let educationid = 1;
let projectid = 1;

const nodeIdsMap = {
    skill:1,
    experience:1,
    education:1,
    project:1
}

//to hold to values and to determine the block existence (i.e., skills block has any value or not )
var listobj = {
    skill: [1],
    education: [1],
    experience: [1],
    project: [1]
}

const innerHTMLTemplate = {
    skill:(id) => (
    `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
    <div class="input_container">
        <input type="text" name="skill[${id}][heading]" required />
        <label>Heading</label>
    </div>
    <div class="input_container">
        <input type="text" name="skill[${id}][value]" required />
        <label>Skills <sup>*</sup></label>
    </div>`
    ),
    education:(id)=>(
    `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
    <div class="input_container">
        <input type="text" name="education[${id}][university]" required />
        <label>University <sup>*</sup></label>
    </div>
    <div class="input_container">
        <input type="text" name="education[${id}][course]" required />
        <label>Course <sup>*</sup></label>
    </div>
    <div class="input_container">
        <input type="text" name="education[${id}][from]" required />
        <label>Duration (From - To) <sup>*</sup></label>
    </div>
    <div class="input_container">
        <input type="text" name="education[${id}][cgpa]" required />
        <label>CGPA</label>
    </div>`
),
    project:(id)=>(
        `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
        <div class="input_container">
            <input type="text" name="experience[${experienceid}][companyname]" required />
            <label>Company Name <sup>*</sup></label>
        </div>
        <div class="input_container">
            <input type="text" name="experience[${experienceid}][role]" required />
            <label>Role <sup>*</sup></label>
        </div>
        <div class="input_container">
            <textarea id="experience[${experienceid}][description]" required></textarea>
            <label>Description</label>
        </div>
        <div class="input_container">
            <input type="text" name="experience[${experienceid}][duration]" required />
            <label>Duration Duration (From - To) <sup>*</sup></label>
        </div>`
    ),
    experience:(id)=>(
        `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
         <div class="input_container">
            <input type="text" name="project[${projectid}][name]" required />
            <label>Title <sup>*</sup></label>
         </div>
         <div class="input_container">
            <textarea id="project[${projectid}][description]" required></textarea>
            <label>Description</label>
        </div>`
    )
}

const generateZip = async (html, photo) => {
  let style = await fetch("./styles/style.css");
  style = await style.text();

  //creating zip file
  const zip = new JSZip();
  zip.file("index.html", html);
  zip.file(photo.name, photo);
  zip.file("style.css", style);

  let content = await zip.generateAsync({ type: "base64" });

  return content
};

const handleAddPartion = (event) => {

    const parent = event.target.parentNode
    const nodeid = nodeIdsMap[parent.id]++;
    const template = innerHTMLTemplate[parent.id](nodeid)
    listobj[parent.id].push(nodeid)

    let div = document.createElement("div");
    div.setAttribute("id", nodeid)
    div.setAttribute("class", "input_set")
    div.innerHTML = template;
    parent.insertBefore(div, event.target);

}

const handleDeletePartion = (event) => {
     event.target.parentNode.remove()
}

const fieldsetClickHandler = (event) =>{

    console.log(event.target.id)
    if(event.target.id === "delete"){
        handleDeletePartion(event)
    }else if(event.target.id === "add"){
        handleAddPartion(event)
    }

    event.stopPropagation()
    event.preventDefault()
}

document.querySelectorAll("fieldset#skill, fieldset#education, fieldset#experience, fieldset#project").forEach((node)=>{
    node.addEventListener("click", fieldsetClickHandler)
})

document.getElementById("resume_form").addEventListener("submit",(event)=>{


    event.preventDefault();
});