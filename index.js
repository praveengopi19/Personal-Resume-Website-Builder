

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

    html = html + `
    <title>Resume | ${formvalues["name"].value}</title>
    </head>

<body>
    <div class="left">
        <div class="leftbg"></div>
        <div class="left_inner">
            <div class="left_info">
        `;

    if (formvalues["name"].value && formvalues["name"].value.trim().length) {
        html = html + `
                <h2> Hey, I'm ${formvalues["name"].value}</h2>`
    }

    if (formvalues["tagline"].value && formvalues["tagline"].value.trim().length) {
        html = html + `
        <div>
            ${formvalues["tagline"].value}
        </div>`
    }

    html = html + `
                <div class="links">`

    if (formvalues["mailid"].value && formvalues["mailid"].value.trim().length) {
        html = html + `
        <a href="mailto:${formvalues["mailid"].value}" target="_blank">
            <i class="fa fa-envelope"></i>
        </a>`
    }

    if (formvalues["linkedin"].value && formvalues["linkedin"].value.trim().length) {
        html = html + `
        <a href="https://www.linkedin.com/in/${formvalues["linkedin"].value}" target="_blank">
            <i class="fa fa-linkedin"></i>
        </a>`
    }

    if (formvalues["github"].value && formvalues["github"].value.trim().length) {
        html = html + `
        <a href="https://www.linkedin.com/in/${formvalues["github"].value}" target="_blank">
            <i class="fa fa-github"></i>
        </a>`
    }

    if (formvalues["portfolio"].value && formvalues["portfolio"].value.trim().length) {
        html = html + `
        <a href="${formvalues["portfolio"].value}" target="_blank">
            <i class="fa fa-globe"></i>
        </a>`
    }

    if (formvalues["twitter"].value && formvalues["twitter"].value.trim().length) {
        html = html + `
        <a href="https://www.linkedin.com/in/${formvalues["linkedin"].value}" target="_blank">
            <i class="fa fa-linkedin"></i>
        </a>`
    }

    html = html + `
                </div>
            </div>
        </div>
    </div>
    <div class="right">
        <div class="right_inner">`

    if (formvalues["about"].value && formvalues["about"].value.trim().length) {
        html = html + `
        <div class="content">
        <h4 class="heading">INTRO</h4>
        <p>
        ${formvalues["about"].value}
        </p>
    </div>`
    }

    html = html + `
    <!-- Skills -->
    <div class="content">
                <h4 class="heading">SKILLS</h4>`

    let skillcheck = false;
    for (let i = 1; i <= skills; i++) {
        let tempvalue = formvalues[`skill[${i}][value]`].value;
        let tempheading = formvalues[`skill[${i}][heading]`].value;
        if (tempvalue && tempvalue.trim().length) {
            skillcheck = true;
            html = html + `
            <div class="category">
            ${tempheading && tempheading.trim().length ? `<strong> ${tempheading} </strong>` : ""}
            <span>${tempvalue}</span>
        </div>`
        }
    }

    html = html + `
    </div>`

    if (skillcheck == false) {
        html = html.split("<!-- Skills -->")[0];
    }

    html = html + `
    <!-- Education -->
    <div class="content">
                <h4 class="heading">EDUCATION</h4>`
    let educationcheck = false;

    for (let i = 1; i <= education; i++) {
        let tempuniversity = formvalues[`education[${i}][university]`].value;
        let tempcourse = formvalues[`education[${i}][course]`].value;
        let tempfrom = formvalues[`education[${i}][from]`].value;
        let tempcgpa = formvalues[`education[${i}][cgpa]`].value;

        if (tempuniversity && tempuniversity.trim().length) {
            educationcheck = true;
            html = html + `
                <div class="category">
                    <div>
                        <strong>${tempuniversity}</strong>
                    </div>
                </div>
                <div class="category">
                    ${tempcourse}
                    <div>
                        <div class="duration">
                            ${tempfrom}
                            ${tempcgpa && tempcgpa.trim().length ? `<div style="float: right;">
                            ${tempcgpa}
                        </div>`: ``}
                        </div>
                    </div>
                </div>`
        }
    }

    html = html + `
    </div>`;

    if (educationcheck == false) {
        html = html.split("<!-- Education -->")[0];
    }

    html = html + `
    <!-- Experience -->
    <div class="content">
                <h4 class="heading">EXPERIENCE</h4>`

    let experiencecheck = false;

    for (let i = 1; i <= experience; i++) {
        let tempcompany = formvalues[`experience[${i}][companyname]`].value;
        let temprole = formvalues[`experience[${i}][role]`].value;
        let tempdescription = formvalues[`experience[${i}][description]`].value;
        let tempduration = formvalues[`experience[${i}][duration]`].value;

        if (tempcompany && tempcompany.trim().length) {
            experiencecheck = true;
            html = html + `
                <div class="category">
                    <div>
                        <strong>${tempcompany}</strong>
                    </div>
                    <div>
                        <strong>${temprole}</strong>
                    </div>
                    <div class="duration">
                        <strong>${tempduration}</strong>
                    </div>
                    ${tempdescription}
                </div>`
        }
    }

    html = html + `
    </div>`;

    if (experiencecheck == false) {
        html = html.split("<!-- Experience -->")[0];
    }

    html = html + `
    <!-- Projects -->
    <div class="content">
                <h4 class="heading">PROJECTS</h4>`

    let projectcheck = false;

    for (let i = 1; i <= projects; i++) {
        let tempname = formvalues[`project[${i}][name]`].value;
        let tempdescription = formvalues[`project[${i}][description]`].value;

        if (tempname && tempname.trim().length) {
            projectcheck = true;
            html = html +
                `<div class="category">
                <div class="subheading">
                    <strong>${tempname}</strong>
                </div>
                    <p>${tempdescription}</p>
                </div>`
        }
    }

    html = html + `
    </div>`;

    if (projectcheck == false) {
        html = html.split("<!-- Projects -->")[0];
    }


    html = html + `
        </div>
    </div>
</body>
</html>`

    console.log(html)
    return false
}
