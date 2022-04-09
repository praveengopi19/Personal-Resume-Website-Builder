// id's to identify the block for deletion and updating of listobj for iteration
const nodeIdsMap = {
  skill: 1,
  experience: 1,
  education: 1,
  project: 1,
};

// to hold to values and to determine the block existence (i.e., skills block has any value or not )
const listobj = {
  skill: [1],
  education: [1],
  experience: [1],
  project: [1],
};

const PHOTO_NAME="displayPicture."

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
  experience: (id) => (
    `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
        <div class="input_container">
            <input type="text" name="experience[${id}][companyname]" required  placeholder=" "/>
            <label>Company Name <sup>*</sup></label>
        </div>
        <div class="input_container">
            <input type="text" name="experience[${id}][role]" required  placeholder=" "/>
            <label>Role <sup>*</sup></label>
        </div>
        <div class="input_container">
            <textarea id="experience[${id}][description]"  placeholder=" "></textarea>
            <label>Description</label>
        </div>
        <div class="input_container">
            <input type="text" name="experience[${id}][duration]" required  placeholder=" " />
            <label>Duration Duration (From - To) <sup>*</sup></label>
        </div>`
  ),
  project: (id) => (
    `<button type="button" id="delete" class="fa fa-minus-circle remove_icon"></button>
         <div class="input_container">
            <input type="text" name="project[${id}][name]" required  placeholder=" "/>
            <label>Title <sup>*</sup></label>
         </div>
         <div class="input_container">
            <textarea id="project[${id}][description]"  placeholder=" "></textarea>
            <label>Description</label>
        </div>`
  ),
};

const handleAddPartion = (event) => {
  const parent = event.target.parentNode;
  const nodeid = ++nodeIdsMap[parent.id];
  const template = innerHTMLTemplate[parent.id](nodeid);
  listobj[parent.id].push(nodeid);

  const div = document.createElement('div');
  div.setAttribute('id', nodeid);
  div.setAttribute('class', 'input_set');
  div.innerHTML = template;
  parent.insertBefore(div, event.target);
};

const handleDeletePartion = (event) => {
  const id = Number(event.target.parentNode.id);
  const parent = event.target.parentNode.parentNode.id;
  const sectionObj = listobj[parent];
  sectionObj.splice(sectionObj.indexOf(id), 1);
  event.target.parentNode.remove();
};

const fieldsetClickHandler = (event) => {
  if (event.target.id === 'delete') {
    handleDeletePartion(event);
  } else if (event.target.id === 'add') {
    handleAddPartion(event);
  }

  event.stopPropagation();
  event.preventDefault();
};

document.querySelectorAll('fieldset#skill, fieldset#education, fieldset#experience, fieldset#project').forEach((node) => {
  node.addEventListener('click', fieldsetClickHandler);
});

const getPhotoExtension = (photo) => photo.type.split('/').pop().toLowerCase();

const hasValidPhoto = (photoFiles) => {
  if (!photoFiles[0]) {
    return ({ condition: false, code: 1 });
  }

  const extension = getPhotoExtension(photoFiles[0]);

  if (extension !== 'jpeg' && extension !== 'gif' && extension !== 'png' && extension !== 'jpg') {
    return ({
      condition: false,
      code: 2,
      reason: 'Invalid File format! \nSupported formats are jpeg, gif, png, jpg ',
    });
  }

  if (photoFiles[0].size > 512000) {
    return ({
      condition: false,
      code: 2,
      reason: 'Image size should be less than 512 KB',
    });
  }

  return ({ condition: true });
};

const handleError = (error) => {
  // console.warn(error)
  if (error.code === 1) {
    const errorTag = document.getElementsByTagName('small');
    errorTag[0].style.display = 'block';
  } else if (error.code === 2) {
    alert(error.reason);
  } else {
    alert('Oops! Something wrong happened');
  }
};

const constructDom = (formvalues, isPreview) => {
  const { condition: validPhoto, ...rest } = hasValidPhoto(formvalues.photo.files);

  if (!validPhoto) {
    throw ({ ...rest });
  }

  const name = formvalues.name.value?.trim();
  const tagline = formvalues.tagline.value?.trim();
  const mailid = formvalues.mailid.value?.trim();

  const about = formvalues.about.value?.trim();

  if (!(name && tagline && mailid)) {
    throw ({ code: 1 });
  }

  // const imageURL = new FileReader(form.photo.files[0]).readAsDataURL()
  const imageURL = isPreview ? window.URL.createObjectURL(formvalues.photo.files[0]) : PHOTO_NAME + getPhotoExtension(formvalues.photo.files[0]);

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
                        </a>`;

  const linkMap = {
    linkedin: [formvalues.linkedin.value?.trim(), 'https://www.linkedin.com/in/'],
    github: [formvalues.github.value?.trim(), 'https://github.com/'],
    globe: [formvalues.portfolio.value?.trim(), ''], // as globe since for css classname
    behance: [formvalues.behance.value?.trim(), 'https://www.behance.net/'],
    dribbble: [formvalues.dribbble.value?.trim(), 'https://dribbble.com/'],
    twitter: [formvalues.twitter.value?.trim(), 'https://twitter.com/'],
    instagram: [formvalues.instagram.value?.trim(), 'https://instagram.com/'],
  };

  Object.entries(linkMap).forEach(([identifier, url]) => {
    if (url[0]) {
      html += `
            <a href="${url[1] + url[0]}" target="_blank">
                <i class="fa fa-${identifier}"></i>
            </a>`;
    }
  });

  html += `
                                  </div>
                                  </div>
                              </div>
                          </div>
                          <div class="right">
                              <div class="right_inner">`;

  if (about) {
    html += `
                                    <div class="content">
                                        <h4 class="heading">INTRO</h4>
                                        <p>${about.replace(/\n/g, '</p>\n<p>')}</p>
                                    </div>`;
  }

  if (listobj.skill.length) {
    html += `
        <!-- Skills -->
            <div class="content">
                <h4 class="heading">SKILLS</h4>`;

    listobj.skill.forEach((id) => {
      const skillContent = formvalues[`skill[${id}][value]`].value.trim();
      const heading = formvalues[`skill[${id}][heading]`].value.trim();
      if (skillContent) {
        html += `
                <p>${heading ? `<strong> ${heading} : </strong>` : ''}<span>${skillContent}</span></p>`;
      } else {
        throw ({ code: 1 });
      }
    });

    html += `
            </div>`;
  }

  if (listobj.education.length) {
    html += `
                                <!-- Education -->
                                    <div class="content">
                                        <h4 class="heading">EDUCATION</h4>`;

    listobj.education.forEach((id) => {
      const university = formvalues[`education[${id}][university]`].value.trim();
      const course = formvalues[`education[${id}][course]`].value.trim();
      const from = formvalues[`education[${id}][from]`].value.trim();
      const cgpa = formvalues[`education[${id}][cgpa]`].value.trim();

      if (university && course && from) {
        html += `
                                        <div class="category">
                                            <div>
                                                <strong>${university}</strong>
                                            </div>
                                            <span>${course}</span>
                                            <div>
                                                <div class="duration">${from}${cgpa ? `
                                                <div class="cgpa">
                                                    CGPA: ${cgpa}
                                                </div>` : ''}</div>
                                            </div>
                                        </div>`;
      } else {
        throw ({ code: 1 });
      }
    });
    html += `
                                    </div>`;
  }

  if (listobj.experience.length) {
    html += `
                        <!-- Experience -->
                            <div class="content">
                                <h4 class="heading">EXPERIENCE</h4>`;

    listobj.experience.forEach((id) => {
      const company = formvalues[`experience[${id}][companyname]`].value.trim();
      const role = formvalues[`experience[${id}][role]`].value.trim();
      const description = formvalues[`experience[${id}][description]`].value.trim().replace(/\n/g, '</p>\n<p>');
      const duration = formvalues[`experience[${id}][duration]`].value.trim();

      if (company && role && duration) {
        html += `
                                <div class="category">
                                    <div>
                                        <strong>${company}</strong>
                                    </div>
                                    <div>
                                        <strong>${role}</strong>
                                    </div>
                                    <div class="duration">${duration}</div>
                                    <p>${description}</p>
                                </div>`;
      } else {
        throw ({ code: 1 });
      }
    });

    html += `
                            </div>`;
  }

  if (listobj.project.length) {
    html += `
                        <!-- Projects -->
                            <div class="content">
                                <h4 class="heading">PROJECTS</h4>`;

    listobj.project.forEach((id) => {
      const project = formvalues[`project[${id}][name]`].value.trim();
      const description = formvalues[`project[${id}][description]`].value.trim().replace(/\n/g, '</p>\n<p>');

      if (project) {
        html += `           <div class="category">
                                    <div class="subheading">
                                        <strong>${project}</strong>
                                    </div>
                                    <p>${description}</p>
                                </div>`;
      } else {
        throw ({ code: 1 });
      }
    });

    html += `
                            </div>`;
  }

  if (formvalues.pdflink.value.trim()) {
    html += `
                            <a class="pdf_link" href="${formvalues.pdflink.value.trim()}">
                                GRAB A PDF OF MY FULL RESUME
                            </a>`;
  }

  html += `
                        </div>
                    </div>
            </body>
            </html>`;

  return html;
};

const generateZip = async (html, photo) => {
  let style = await fetch('./styles/style.css');
  style = await style.text();

  const name = PHOTO_NAME + getPhotoExtension(photo)

  // creating zip file
  const zip = new JSZip();
  zip.file('index.html', html);
  zip.file(name, photo);
  zip.file('style.css', style);

  const content = await zip.generateAsync({ type: 'base64' });

  return content;
};

const downloadZip = (content, fileName) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:application/zip;base64,${content}`);
  element.setAttribute('download', `${fileName}_personal_resume_website.zip`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const hideErrorDisplay = () => {
  const error = document.getElementsByTagName('small');

  if (error[0].style.display === 'block') {
    error[0].style.display = 'none';
  }
};

document.getElementById('resume_form').addEventListener('submit', (event) => {
  console.time("Start")
  try {
    const dom = constructDom(event.target.elements, event.submitter.id === "previewresume");
    hideErrorDisplay();

    if (event.submitter.id === "downloadzip") {
      generateZip(dom, event.target.photo.files[0]).then(
        (content) => downloadZip(content, event.target.name.value.trim()),
      );
    } else {
      localStorage.setItem('resume_online', JSON.stringify(dom));
      window.open('preview.html');
    }
  } catch (e) {
    handleError(e);
  }
  console.timeEnd("Start")
  event.preventDefault();
});


window.addEventListener('unload', (event) => {
  localStorage.clear('resume_online');
  event.stopPropagation();
  event.preventDefault();
});
