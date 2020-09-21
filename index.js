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

    try {

        // /&& event.target.nodeName === "BUTTON"
        if (event.target.id === "delete") {

            let type = event.target.parentNode.parentNode.id

            await listobj[type].splice(listobj[type].indexOf(Number(event.target.parentNode.id)), 1)

            event.target.parentNode.remove()

            event.stopPropagation();
            event.preventDefault();
        }


        //obj add skills

        else if (event.target.id === "addskills") {
            skillid = skillid + 1;
            let template = `
             <button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
                <div class="input_container">
                    <input type="text" name="skill[${skillid}][heading]" required />
                    <label>Heading</label>
                </div>
                <div class="input_container">
                    <input type="text" name="skill[${skillid}][value]" required />
                    <label>Skills <sup>*</sup></label>
                </div>
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
        <button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
        <div class="input_container">
            <input type="text" name="education[${educationid}][university]" required />
            <label>University <sup>*</sup></label>
        </div>
        <div class="input_container">
            <input type="text" name="education[${educationid}][course]" required />
            <label>Course <sup>*</sup></label>
        </div>
        <div class="input_container">
            <input type="text" name="education[${educationid}][from]" required />
            <label>Duration <sup>*</sup></label>
        </div>
        <div class="input_container">
            <input type="text" name="education[${educationid}][cgpa]" required />
            <label>CGPA</label>
        </div>
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
        <button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
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
            <label>Duration <sup>*</sup></label>
        </div>
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
        <button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
        <div class="input_container">
            <input type="text" name="project[${projectid}][name]" required />
            <label>Title <sup>*</sup></label>
        </div>
        <div class="input_container">
            <textarea id="project[${projectid}][description]" required></textarea>
            <label>Description</label>
        </div>
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

            let error = document.getElementsByTagName("small")

            if (!formvalues["photo"].files[0]) {
                error[0].style.display = "block"
                return false
            }

            let extension = formvalues["photo"].files[0].type.split('/').pop().toLowerCase()

            if (extension !== "jpeg" && extension !== "gif" && extension !== "png" && extension !== "jpg") {
                alert("Invalid File format supported formats are jpeg, gif, png, jpg ")
                return false
            }

            if (formvalues["photo"].files[0].size > 512000) {
                alert("Image size should be less than 500kb")
                return false
            }

            let html = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,300,400,500,600,700" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href="style.css" rel="stylesheet">`

            let img = new Image()
            img.src = window.URL.createObjectURL(formvalues["photo"].files[0])

            if (!formvalues["name"].value.trim().length || !formvalues["name"].value.trim()) {
                error[0].style.display = "block"
                return false
            }

            html = html + `
        <title>Resume | ${formvalues["name"].value}</title>
        </head>
    
    <body>
        <div class="left">
            <div class="leftbg"
            style="background : url(${event.target.id === "submitform" ? `${formvalues["photo"].files[0].name}` : `${img.src}`}) center center no-repeat !important; background-size: cover !important ">
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
            else {
                error[0].style.display = "block"
                return false
            }

            html = html + `
                    <div class="links">`

            if (formvalues["mailid"].value && formvalues["mailid"].value.trim().length) {
                html = html + `
            <a href="mailto:${formvalues["mailid"].value.trim()}" target="_blank">
                <i class="fa fa-envelope"></i>
            </a>`
            }
            else {
                error[0].style.display = "block"
                return false
            }

            if (formvalues["linkedin"].value && formvalues["linkedin"].value.trim().length) {
                html = html + `
            <a href="https://www.linkedin.com/in/${formvalues["linkedin"].value.trim()}" target="_blank">
                <i class="fa fa-linkedin"></i>
            </a>`
            }

            if (formvalues["github"].value && formvalues["github"].value.trim().length) {
                html = html + `
            <a href="https://github.com/${formvalues["github"].value.trim()}" target="_blank">
                <i class="fa fa-github"></i>
            </a>`
            }

            if (formvalues["portfolio"].value && formvalues["portfolio"].value.trim().length) {
                html = html + `
            <a href="${formvalues["portfolio"].value.trim()}" target="_blank">
                <i class="fa fa-globe"></i>
            </a>`
            }

            if (formvalues["twitter"].value && formvalues["twitter"].value.trim().length) {
                html = html + `
            <a href="https://twitter.com/${formvalues["twitter"].value.trim()}" target="_blank">
                <i class="fa fa-twitter"></i>
            </a>`
            }

            if (formvalues["instagram"].value && formvalues["instagram"].value.trim().length) {
                html = html + `
            <a href="https://instagram.com/${formvalues["instagram"].value.trim()}" target="_blank">
                <i class="fa fa-instagram"></i>
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

            if (listobj.skills.length > 0) {
                html = html + `
            <!-- Skills -->
            <div class="content">
                        <h4 class="heading">SKILLS</h4>`

                for (let i = 0; i < listobj.skills.length; i++) {
                    let tempvalue = formvalues[`skill[${listobj.skills[i]}][value]`].value.trim();
                    let tempheading = formvalues[`skill[${listobj.skills[i]}][heading]`].value.trim();
                    if (tempvalue && tempvalue.length) {
                        html = html + `
                    <p>
                    ${tempheading && tempheading.length ? `<strong> ${tempheading} : </strong>` : ""}
                        <span>${tempvalue}</span>
                    </p>`
                    }
                    else {
                        error[0].style.display = "block"
                        return false
                    }
                }

                html = html + `
            </div>`

            }


            if (listobj.education.length > 0) {
                html = html + `
            <!-- Education -->
            <div class="content">
                <h4 class="heading">EDUCATION</h4>`

                for (let i = 0; i < listobj.education.length; i++) {
                    let tempuniversity = formvalues[`education[${listobj.education[i]}][university]`].value.trim();
                    let tempcourse = formvalues[`education[${listobj.education[i]}][course]`].value.trim();
                    let tempfrom = formvalues[`education[${listobj.education[i]}][from]`].value.trim();
                    let tempcgpa = formvalues[`education[${listobj.education[i]}][cgpa]`].value.trim();

                    if (tempuniversity && tempuniversity.length && tempcourse && tempcourse.length && tempfrom && tempfrom.length) {
                        html = html + `
                    <div class="category">
                        <div>
                            <strong>${tempuniversity}</strong>
                        </div>
                        <span>${tempcourse}</span>
                        <div>
                            <div class="duration">
                                ${tempfrom}
                                ${tempcgpa && tempcgpa.trim().length ? `<div class="cgpa">
                                CGPA: ${tempcgpa}
                            </div>`: ``}
                            </div>
                        </div>
                    </div>`
                    }
                    else {
                        error[0].style.display = "block"
                        return false
                    }
                }

                html = html + `
            </div>`;

            }

            if (listobj.experience.length > 0) {

                html = html + `
        <!-- Experience -->
        <div class="content">
                    <h4 class="heading">EXPERIENCE</h4>`


                for (let i = 0; i < listobj.experience.length; i++) {
                    let tempcompany = formvalues[`experience[${listobj.experience[i]}][companyname]`].value.trim();
                    let temprole = formvalues[`experience[${listobj.experience[i]}][role]`].value.trim();
                    let tempdescription = formvalues[`experience[${listobj.experience[i]}][description]`].value.trim().replace(/\n/g, "</p>\n<p>");
                    let tempduration = formvalues[`experience[${listobj.experience[i]}][duration]`].value.trim();

                    if (tempcompany && tempcompany.length && temprole && temprole.length && tempduration && tempduration.length) {
                        html = html + `
                    <div class="category">
                        <div>
                            <strong>${tempcompany}</strong>
                        </div>
                        <div>
                            <strong>${temprole}</strong>
                        </div>
                        <div class="duration">
                            ${tempduration}
                        </div>
                        ${tempdescription}
                    </div>`
                    }
                    else {
                        error[0].style.display = "block"
                        return false
                    }
                }

                html = html + `
        </div>`;
            }

            if (listobj.projects.length > 0) {
                html = html + `
        <!-- Projects -->
        <div class="content">
                    <h4 class="heading">PROJECTS</h4>`

                let projectcheck = false;

                for (let i = 0; i < listobj.projects.length; i++) {
                    let tempname = formvalues[`project[${listobj.projects[i]}][name]`].value.trim();
                    let tempdescription = formvalues[`project[${listobj.projects[i]}][description]`].value.trim().replace(/\n/g, "</p>\n<p>");

                    if (tempname && tempname.length) {
                        projectcheck = true;
                        html = html +
                            `<div class="category">
                            <div class="subheading">
                                <strong>${tempname}</strong>
                            </div>
                            <p>${tempdescription}</p>
                        </div>`
                    }
                    else {
                        error[0].style.display = "block"
                        return false
                    }
                }

                html = html + `
        </div>`;
            }

            if (formvalues['pdflink'].value && formvalues['pdflink'].value.trim()) {
                html = html + `
            <a class="pdf_link" href="${formvalues['pdflink'].value.trim()}">
            	GRAB A PDF OF MY FULL RESUME
            </a>`
            }

            html = html + `
            </div>
        </div>
    </body>
    </html>`

            //preview resume && submit form
            if (error[0].style.display === "block") {
                error[0].style.display = "none"
            }

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
    }
    catch (e) {
        alert("Something wrong happened, Please inform me")
        return false
    }

})


window.addEventListener("unload", (event) => {
    localStorage.clear("resume_online")
    event.stopPropagation();
    event.preventDefault();
});


