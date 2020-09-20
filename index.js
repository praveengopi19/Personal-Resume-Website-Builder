let skillid = 1;
let experienceid = 1;
let educationid = 1;
let projectid = 1;

var listobj = {
    skills: [1],
    education: [1],
    experience: [1],
    projects: [1]
}

let formvalues = document.getElementById("resume_form").elements;

document.getElementById("click_div").addEventListener("click", async (event) => {

    console.time("Time this");

    // /&& event.target.nodeName === "BUTTON"
    if (event.target.id === "delete") {

        let type = event.target.parentNode.parentNode.id

        await listobj[type].splice(listobj[type].indexOf(Number(event.target.parentNode.id)), 1)

        event.target.parentNode.remove()

        event.stopPropagation();
        event.preventDefault();
    }

    //addskills

    /*else if (event.target.id === "addskills") {
        skillid = skillid + 1;
        let template = `
                <button type="button" class="remove_icon"><i id="delete" class="fa fa-minus-circle "></i></button>
            <input type="text" name="skill[${skillid}][heading]" />
                <input type="text" name="skill[${skillid}][value]" />
                
             `;

        listobj.skills.push(skillid);
        let parent = document.getElementById("skills");
        let div = document.createElement("div");
        div.setAttribute("id", skillid)
        div.innerHTML = template;
        parent.appendChild(div);

        console.log(listobj.skills)

        event.stopPropagation();
        event.preventDefault();
    } */

    //obj add skills

    else if (event.target.id === "addskills") {
        skillid = skillid + 1;
        let template = `
                <button type="button" class="remove_icon"><i id="delete" class="fa fa-minus-circle "></i></button>
            <input type="text" name="skill[${skillid}][heading]" />
                <input type="text" name="skill[${skillid}][value]" />
             `;
        listobj.skills.push(skillid)
        let parent = document.getElementById("skills");
        let div = document.createElement("div");
        div.setAttribute("id", skillid)
        div.setAttribute("class", "input_set")
        div.innerHTML = template;
        parent.appendChild(div);

        event.stopPropagation();
        event.preventDefault();
    }

    //obj education

    else if (event.target.id === "addeduction") {
        educationid = educationid + 1;
        let template = `
        <button type="button" class="remove_icon"><i id="delete" class="fa fa-minus-circle "></i></button>
        <input type="text" name="education[${educationid}][university]" placeholder="university" />
        <input type="text" name="education[${educationid}][course]" placeholder="course" />
        <input type="text" name="education[${educationid}][from]" placeholder="from" />
        <input type="text" name="education[${educationid}][cgpa]" placeholder="cgpa (optional)" />
             `;

        listobj.education.push(educationid)
        let parent = document.getElementById("education");
        let div = document.createElement("div");
        div.setAttribute("class", "input_set")
        div.setAttribute("id", educationid)
        div.innerHTML = template;
        parent.appendChild(div);

        event.stopPropagation();
        event.preventDefault();
    }

    //obj experience

    else if (event.target.id === "addexperience") {
        experienceid = experienceid + 1;
        let template = `
                        <button type="button" class="remove_icon"><i id="delete" class="fa fa-minus-circle "></i></button>
                        <input type="text" name="experience[${experienceid}][companyname]" placeholder="comapny name" />
                        <input type="text" name="experience[${experienceid}][role]" placeholder="role" />
                        <textarea id="experience[${experienceid}][description]" placeholder="description"></textarea>
                        <input type="text" name="experience[${experienceid}][duration]" placeholder="duration" />
             `;
        listobj.experience.push(experienceid)
        let parent = document.getElementById("experience");
        let div = document.createElement("div");
        div.setAttribute("id", experienceid)
        div.setAttribute("class", "input_set")
        div.innerHTML = template;
        parent.appendChild(div);

        event.stopPropagation();
        event.preventDefault();
    }

    else if (event.target.id === "addproject") {
        projectid = projectid + 1;
        let template = `
                        <button type="button" class="remove_icon"><i id="delete" class="fa fa-minus-circle "></i></button>
                        <input type="text" name="project[${projectid}][name]" placeholder="title" />
                        <textarea id="project[${projectid}][description]" placeholder="description"></textarea>
              `;
        listobj.projects.push(projectid)
        let parent = document.getElementById("projects");
        let div = document.createElement("div");
        div.setAttribute("id", projectid)
        div.setAttribute("class", "input_set")
        div.innerHTML = template;
        parent.appendChild(div);

        event.stopPropagation();
        event.preventDefault();
    }




    //Submit

    else if (event.target.id === "submitform" || event.target.id === "previewresume") {

        let error = false

        if (!formvalues["photo"].files[0]) {
            return false
        }

        let extension = formvalues["photo"].files[0].type.split('/').pop().toLowerCase()

        if (extension !== "jpeg" && extension !== "gif" && extension !== "png" && extension !== "jpg") {
            console.log(extension)
            return false
        }

        if (formvalues["photo"].files[0].size > 512000) {
            return false
        }

        let html = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,300,400,500,600,700" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href="./style.css" rel="stylesheet">`

        let img = new Image()
        img.src = window.URL.createObjectURL(formvalues["photo"].files[0])

        html = html + `
        <title>Resume | ${formvalues["name"].value}</title>
        </head>
    
    <body>
        <div class="left">
            <div class="leftbg"
            style="background : url(${event.target.id === "submitform" ? `./${formvalues["photo"].files[0].name}` : `${img.src}`}) center center no-repeat !important; background-size: cover !important ">
            </div>
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
            ${formvalues["about"].value.trim().replace(/\n/g, "</p>\n<p>")}
            </p>
        </div>`
        }

        html = html + `
        <!-- Skills -->
        <div class="content">
                    <h4 class="heading">SKILLS</h4>`

        let skillcheck = false;
        for (let i = 0; i < listobj.skills.length; i++) {
            let tempvalue = formvalues[`skill[${listobj.skills[i]}][value]`].value;
            let tempheading = formvalues[`skill[${listobj.skills[i]}][heading]`].value;
            if (tempvalue && tempvalue.trim().length) {
                skillcheck = true;
                html = html + `
                <div class="category">
                ${tempheading && tempheading.trim().length ? `<strong> ${tempheading} : </strong>` : ""}
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

        for (let i = 0; i < listobj.education.length; i++) {
            let tempuniversity = formvalues[`education[${listobj.education[i]}][university]`].value;
            let tempcourse = formvalues[`education[${listobj.education[i]}][course]`].value;
            let tempfrom = formvalues[`education[${listobj.education[i]}][from]`].value;
            let tempcgpa = formvalues[`education[${listobj.education[i]}][cgpa]`].value;

            if (tempuniversity && tempuniversity.trim().length) {
                educationcheck = true;
                html = html + `
                    <div class="category">
                        <div>
                            <strong>${tempuniversity}</strong>
                        </div>
                        <span>${tempcourse}</span>
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

        for (let i = 0; i < listobj.experience.length; i++) {
            let tempcompany = formvalues[`experience[${listobj.experience[i]}][companyname]`].value;
            let temprole = formvalues[`experience[${listobj.experience[i]}][role]`].value;
            let tempdescription = formvalues[`experience[${listobj.experience[i]}][description]`].value;
            let tempduration = formvalues[`experience[${listobj.experience[i]}][duration]`].value;

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

        for (let i = 0; i < listobj.projects.length; i++) {
            let tempname = formvalues[`project[${listobj.projects[i]}][name]`].value;
            let tempdescription = formvalues[`project[${listobj.projects[i]}][description]`].value;

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

        //preview resume && submit form

        if (event.target.id === "previewresume") {
            localStorage.setItem("resume_online", JSON.stringify(html));
            window.open("preview.html")
        }
        else if (event.target.id === "submitform") {

            let style = await fetch('./style.css')
            style = await style.text()

            var zip = new JSZip();
            zip.file("index.html", html);
            zip.file(formvalues["photo"].files[0].name, formvalues["photo"].files[0])
            zip.file("style.css", style)

            let content = await zip.generateAsync({ type: "base64" });

            // let element = document.createElement('a');
            // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html))
            // element.setAttribute('download', 'index.html')
            // element.style.display = 'none'
            // document.body.appendChild(element)
            // element.click();
            // document.body.removeChild(element)

            let element = document.createElement('a');
            element.setAttribute('href', "data:application/zip;base64," + content)
            element.setAttribute('download', 'index.zip')
            element.style.display = 'none'
            document.body.appendChild(element)
            element.click();
            document.body.removeChild(element)

        }

        event.stopPropagation();
        event.preventDefault();
    }

    console.timeEnd("Time this");

})


