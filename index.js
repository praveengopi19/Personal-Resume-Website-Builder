

let skills = 1;
let experience = 1;
let education = 1;
let projects = 1;

document.getElementById("click_div").addEventListener("click", (event) => {

    if (event.target.id === "delete" && event.target.nodeName === "BUTTON" && event.keyCode != 13) {
        console.log(event.target.parentNode.remove())
        console.log("yes")
    }

    if (event.target.id === "addskills") {
        skills = skills + 1;
        let template = `
                <button type="button" id="delete">Delete</button>
            <input type="text" name="skill[${skills}][heading]" />
                <input type="text" name="skills[${skills}][value]" />
                
             `;
        let parent = document.getElementById("skills");
        let div = document.createElement("div");
        div.innerHTML = template;
        parent.appendChild(div);

    }

    //event.stopPropagation();
    //event.preventDefault();
})



function addSkills() {
    skills = skills + 1;
    let template = `
            <input type="text" name="skill[${skills}][heading]" />
                <input type="text" name="skills[${skills}][value]" />
                <button type="button" id="delete">Delete</button>
             `;
    let parent = document.getElementById("skills");
    let div = document.createElement("div");
    div.innerHTML = template;
    parent.appendChild(div);
    return false
}

function addExperience() {
    experience = experience + 1;
    let template = `
            <br>
            <input type="text" name="skill[${experience}][heading]" />
                <input type="text" name="skills[${experience}][value]" /> `;
    let parent = document.getElementById("experience");
    parent.insertAdjacentHTML('beforeend', template);
    return false
}

function addEducation() {
    education = education + 1;
    let template = `
            <br>
            <input type="text" name="skill[${education}][heading]" />
                <input type="text" name="skills[${education}][value]" /> `;
    let parent = document.getElementById("education");
    parent.insertAdjacentHTML('beforeend', template);
    return false
}

function addProjects() {
    projects = projects + 1;
    let template = `
            <br>
            <input type="text" name="skill[${projects}][heading]" />
                <input type="text" name="skills[${projects}][value]" /> `;
    let parent = document.getElementById("project");
    parent.insertAdjacentHTML('beforeend', template);
    return false
}

let formvalues = document.getElementById("resume_form").elements;

var html = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,300,400,500,600,700" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href="./style.css" rel="stylesheet">`



function submitform() {

    html = html + `<title>Resume | ${formvalues["name"].value}</title>
    </head>

<body>
    <div class="left">
        <div class="leftbg">
        </div>
        <div class="left_inner">
        <div class="left_info">
        `;

    if (formvalues["name"].value && formvalues["name"].value.trim().length) {
        html = html + `
            <h2> Hey, I'm ${formvalues["name"].value}
            </h2>`
    }

    if (formvalues["tagline"].value && formvalues["tagline"].value.trim().length) {
        html = html + `<div>
            ${formvalues["tagline"].value}
        </div>`
    }

    html = html + `<div class="links">`

    if (formvalues["mailid"].value && formvalues["mailid"].value.trim().length) {
        html = html + `<a href="mailto:${formvalues["mailid"].value}" target="_blank">
            <i class="fa fa-envelope"></i>
        </a>`
    }

    if (formvalues["linedin"].value && formvalues["linkedin"].value.trim().length) {
        html = html + `<a href="https://www.linkedin.com/in/${formvalues["linedin"].value}" target="_blank">
        <i class="fa fa-linkedin"></i>
    </a>`
    }

    if (formvalues["github"].value && formvalues["github"].value.trim().length) {
        html = html + `<a href="https://www.linkedin.com/in/${formvalues["github"].value}" target="_blank">
        <i class="fa fa-github"></i>
    </a>`
    }

    if (formvalues["linedin"].value && formvalues["linkedin"].value.trim().length) {
        html = html + `<a href="https://www.linkedin.com/in/${formvalues["linedin"].value}" target="_blank">
        <i class="fa fa-linkedin"></i>
    </a>`
    }

    if (formvalues["linedin"].value && formvalues["linkedin"].value.trim().length) {
        html = html + `<a href="https://www.linkedin.com/in/${formvalues["linedin"].value}" target="_blank">
        <i class="fa fa-linkedin"></i>
    </a>`
    }

    for (let i = 1; i <= skills; i++) {
        console.log(formvalues[`skill[${i}][heading]`].value);
    }

    for (let i = 1; i <= education; i++) {
        console.log(formvalues[`skill[${i}][heading]`].value);
    }

    for (let i = 1; i <= experience; i++) {
        console.log(formvalues[`skill[${i}][heading]`].value);
    }

    for (let i = 1; i <= projects; i++) {
        console.log(formvalues[`skill[${i}][heading]`].value);
    }

    console.log(html)
    return false
}
