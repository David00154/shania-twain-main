// register service workers

if ("serviceWorker" in navigator) {
    // window.addEventListener("load", () => {
    navigator.serviceWorker
        .register("/assets/js/service-worker.js")
        .then((req) => {
            if (!req.active) {
                console.log("Service Worker: Registering...");
            }
        })
        .catch((err) => console.error(`Service Worker ${err}`));
    // });
}

window.addEventListener("DOMContentLoaded", function () {
    const form = this.document.querySelector("#get-update-form")
    // console.log(form)
    form.addEventListener("submit", function (e) {
        e.preventDefault()
        const email = document.querySelector("input[name='email']").value
        const postcode = document.querySelector("input[name='postcode']").value
        const country = document.querySelector("select[name='country']").value
        if (!email || !postcode || !country) {
            alert("All the form fields are required.")
            return
        }
        // console.log("EMAIL => ", email)
        // console.log("POSTCODE => ", postcode)
        // console.log("COUNTRY => ", document.querySelector(`option[value='${country}']`).innerText)
        // window.location.href = "/success"
        const data = JSON.stringify({
            email,// 
            postcode,//
            country: document.querySelector(`option[value='${country}']`).innerText
        })
        fetch("https://formspree.io/f/xayzkaqd", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                //   status.innerHTML = "Thanks for your submission!";
                //   form.reset()
                window.location.href = "/success"
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        //   status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        console.log("FORM SUBMIT ERROR => ", data["errors"].map(error => error["message"]).join(", "))
                    } else {
                        alert("Oops! There was a problem submitting your form")
                    }
                })
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form")
        })
    })
})