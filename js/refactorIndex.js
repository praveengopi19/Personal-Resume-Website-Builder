
//id's to identify the block for deletion and updating of listobj for iteration
const nodeIdsMap = {
    skill: 1,
    experience: 1,
    education: 1,
    project: 1
}

//to hold to values and to determine the block existence (i.e., skills block has any value or not )
const listobj = {
    skill: [1],
    education: [1],
    experience: [1],
    project: [1]
}

const innerHTMLTemplate = {
    skill: (id) => (
        `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
    <div class="input_container">
        <input type="text" name="skill[${id}][heading]"  placeholder=" " />
        <label>Heading</label>
    </div>
    <div class="input_container">
        <input type="text" name="skill[${id}][value]" required  placeholder=" " />
        <label>Skills <sup>*</sup></label>
    </div>`
    ),
    education: (id) => (
        `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
    <div class="input_container">
        <input type="text" name="education[${id}][university]" required  placeholder=" " />
        <label>University <sup>*</sup></label>
    </div>
    <div class="input_container">
        <input type="text" name="education[${id}][course]" required  placeholder=" " />
        <label>Course <sup>*</sup></label>
    </div>
    <div class="input_container">
        <input type="text" name="education[${id}][from]" required  placeholder=" " />
        <label>Duration (From - To) <sup>*</sup></label>
    </div>
    <div class="input_container">
        <input type="text" name="education[${id}][cgpa]"  placeholder=" " />
        <label>CGPA</label>
    </div>`
    ),
    project: (id) => (
        `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
        <div class="input_container">
            <input type="text" name="experience[${experienceid}][companyname]" required  placeholder=" "/>
            <label>Company Name <sup>*</sup></label>
        </div>
        <div class="input_container">
            <input type="text" name="experience[${experienceid}][role]" required  placeholder=" "/>
            <label>Role <sup>*</sup></label>
        </div>
        <div class="input_container">
            <textarea id="experience[${experienceid}][description]"  placeholder=" "></textarea>
            <label>Description</label>
        </div>
        <div class="input_container">
            <input type="text" name="experience[${experienceid}][duration]" required  placeholder=" " />
            <label>Duration Duration (From - To) <sup>*</sup></label>
        </div>`
    ),
    experience: (id) => (
        `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
         <div class="input_container">
            <input type="text" name="project[${projectid}][name]" required  placeholder=" "/>
            <label>Title <sup>*</sup></label>
         </div>
         <div class="input_container">
            <textarea id="project[${projectid}][description]"  placeholder=" "></textarea>
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
    const id = Number(event.target.parentNode.id)
    const parent = event.target.parentNode.parentNode.id
    const sectionObj = listobj[parent]
    sectionObj.splice(sectionObj.indexOf(id), 1)
    event.target.parentNode.remove()
}

const fieldsetClickHandler = (event) => {

    console.log(event.target.id)
    if (event.target.id === "delete") {
        handleDeletePartion(event)

    } else if (event.target.id === "add") {
        handleAddPartion(event)
    }

    event.stopPropagation()
    event.preventDefault()
}

document.querySelectorAll("fieldset#skill, fieldset#education, fieldset#experience, fieldset#project").forEach((node) => {
    node.addEventListener("click", fieldsetClickHandler)
})

const hasValidPhoto = (photoFiles) => {

    if (!photoFiles[0]) {
        return ({ condition: false, code: 1 })
    }

    let extension = photoFiles[0].type.split('/').pop().toLowerCase()

    if (extension !== "jpeg" && extension !== "gif" && extension !== "png" && extension !== "jpg") {
        return ({
            condition: false,
            code: 2,
            reason: "Invalid File format! \nSupported formats are jpeg, gif, png, jpg "
        })
    }

    if (formvalues["photo"].files[0].size > 512000) {
        return ({
            condition: false,
            code: 2,
            reason: "Image size should be less than 512 KB"
        })
    }

    return ({ condition: true })

}

const handleError = (error) => {

    if (error.code === 1) {
        let errorTag = document.getElementsByTagName("small");
        errorTag[0].style.display = "block";
    } else if (error.code === 2) {
        alert(reasonCode.reason)
    } else {
        alert("Oops! Something wrong happened")
    }

}

const constructDom = (formvalues) => {

    const { condition: validPhoto, ...rest } = hasValidPhoto(formvalues.photo);

    if (validPhoto) {
        throw new Error(rest)
    }

    const name = formvalues.name.value?.trim()
    const tagline = formvalues.tagline.value?.trim()
    const mailid = formvalues.mailid.value?.trim()

    const about = formvalues.about.value?.trim()

    if (!(name && tagline && mailid)) {
        throw new Error({ code: 1 })
    }

    // const imageURL = new FileReader(form.photo.files[0]).readAsDataURL()
    const imageURL = window.URL.createObjectURL(formvalues["photo"].files[0]);

    let html = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no">
            <link href="https://fonts.googleapis.com/css?family=Catamaran:200,300,400,500,600,700" rel="stylesheet">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
            <link href="style.css" rel="stylesheet">
            <title>Resume | ${name}</title>
        </head>
        <body>
            <div class="left">
                <div class="leftbg"
                style="background : url(${imageURL}) center center no-repeat !important; background-size: cover !important ">
                </div>
                <div class="left_inner">
                    <div class="left_info">
                        <h2> Hey, I'm ${name}</h2>
                        <div>${tagline}</div>
                        <div class="links">
                        <a href="mailto:${mailid}" target="_blank">
                            <i class="fa fa-envelope"></i>
                        </a>`

    const linkMap = {
        linkedin: formvalues["linkedin"].value?.trim(),
        github: formvalues["github"].value?.trim(),
        globe: formvalues["portfolio"].value?.trim(), // as globe since for css classname
        behance: formvalues["behance"].value?.trim(),
        dribbble: formvalues["dribbble"].value?.trim(),
        twitter: formvalues["twitter"].value?.trim(),
        instagram: formvalues["instagram"].value?.trim()
    }

    Object.entries(linkMap).forEach(([identifier, url]) => {
        if (url) {
            html = html + `
            <a href="https://www.linkedin.com/in/${url}" target="_blank">
                <i class="fa fa-${identifier}"></i>
            </a>`
        }
    })


    if (about) {
        html = html + `
                                    <div class="content">
                                        <h4 class="heading">INTRO</h4>
                                        <p>${about.replace(/\n/g, "</p>\n<p>")}</p>
                                    </div>`
    }

    if (listobj.skill.length) {
        html = html + `
        <!-- Skills -->
            <div class="content">
                <h4 class="heading">SKILLS</h4>`


        listobj.skill.forEach((id) => {
            let skillContent = formvalues[`skill[${id}][value]`].value.trim();
            let heading = formvalues[`skill[${id}][heading]`].value.trim();
            if (skillContent) {
                html = html + `
                <p>${heading ? `<strong> ${heading} : </strong>` : ""}<span>${skillContent}</span></p>`
            }
            else {
                throw new Error({ code: 1 })
            }
        })

        html = html + `
            </div>`
    }

    if (listobj.education.length) {
        html = html + `
                                <!-- Education -->
                                    <div class="content">
                                        <h4 class="heading">EDUCATION</h4>`

        listobj.education.forEach((id) => {
            let university = formvalues[`education[${id}][university]`].value.trim();
            let course = formvalues[`education[${id}][course]`].value.trim();
            let from = formvalues[`education[${id}][from]`].value.trim();
            let cgpa = formvalues[`education[${id}][cgpa]`].value.trim();

            if (university && course && from) {
                html = html + `
                                        <div class="category">
                                            <div>
                                                <strong>${university}</strong>
                                            </div>
                                            <span>${course}</span>
                                            <div>
                                                <div class="duration">${from}${cgpa ? `
                                                <div class="cgpa">
                                                    CGPA: ${cgpa}
                                                </div>`: ``}</div>
                                            </div>
                                        </div>`
            }
            else {
                throw new Error({ code: 1 })
            }
        })
        html = html + `
                                    </div>`;
    }

    if (listobj.experience.length) {
        html = html + `
                        <!-- Experience -->
                            <div class="content">
                                <h4 class="heading">EXPERIENCE</h4>`

        listobj.experience.forEach((id) => {
            let company = formvalues[`experience[${id}][companyname]`].value.trim();
            let role = formvalues[`experience[${id}][role]`].value.trim();
            let description = formvalues[`experience[${id}][description]`].value.trim().replace(/\n/g, "</p>\n<p>");
            let duration = formvalues[`experience[${id}][duration]`].value.trim();

            if (company && role && duration) {
                html = html + `
                                <div class="category">
                                    <div>
                                        <strong>${company}</strong>
                                    </div>
                                    <div>
                                        <strong>${role}</strong>
                                    </div>
                                    <div class="duration">${duration}</div>
                                    ${description}
                                </div>`
            }
            else {
                throw new Error({ code: 1 })
            }
        })

        html = html + `
                            </div>`;
    }

    if (listobj.project.length) {
        html = html + `
                        <!-- Projects -->
                            <div class="content">
                                <h4 class="heading">PROJECTS</h4>`


        listobj.project.forEach((id) => {
            let name = formvalues[`project[${id}][name]`].value.trim();
            let description = formvalues[`project[${id}][description]`].value.trim().replace(/\n/g, "</p>\n<p>");

            if (name) {
                html = html +
                    `           <div class="category">
                                    <div class="subheading">
                                        <strong>${name}</strong>
                                    </div>
                                    <p>${description}</p>
                                </div>`
            }
            else {
                throw new Error({ code: 1 })
            }
        })

        html = html + `
                            </div>`;
    }

    if (formvalues['pdflink'].value.trim()) {
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

    return html
}

const downloadZip = (content, fileName) => {
    let element = document.createElement('a');
    element.setAttribute('href', "data:application/zip;base64," + content)
    element.setAttribute('download', `${fileName}_personal_resume_website.zip`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click();
    document.body.removeChild(element)
}

const hideErrorDisplay = () =>{
    let error = document.getElementsByTagName("small")

    if (error[0].style.display === "block") {
        error[0].style.display = "none"
    }
}

document.getElementById("resume_form").addEventListener("submit", (event) => {

    console.log(event.target.value)

    try {
        const dom = constructDom(event.target.elements);
        hideErrorDisplay();
        generateZip(dom, event.target.photo.files[0]).then((content) => downloadZip(content, event.target.name.value.trim()))
    } catch (e) {
        handleError(e)
        return
    }

    event.preventDefault();
});

document.getElementById("previewresume").addEventListener("click", (event) => {

    try {

        let formvalues = document.getElementById("resume_form").elements;
        const dom = constructDom(formvalues);
        hideErrorDisplay();
        localStorage.setItem("resume_online", JSON.stringify(dom));
        window.open("preview.html")

    } catch (e) {
        console.log(e)
        handleError(e)
        return
    }

    event.preventDefault();
})

window.addEventListener("unload", (event) => {
    localStorage.clear("resume_online")
    event.stopPropagation();
    event.preventDefault();
});
