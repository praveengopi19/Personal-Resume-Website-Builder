
let previewhtml = JSON.parse(localStorage.getItem("resume_online"))
previewhtml = previewhtml.split("<body>")[1].split("</body>")[0]
document.getElementById("previewid").innerHTML = previewhtml