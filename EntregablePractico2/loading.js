let button = document.querySelectorAll(".loading-button");
const overlay = document.querySelector("#loading-screen");
const spinner = document.querySelector("#spinner")
const number = document.querySelector("#number");

button.forEach(c => {
    c.addEventListener('click', function loading() {
        spinner.classList.add("begin")
        overlay.classList.add("visible");
            
        let offset = 0;
        let time = setInterval(() => {
            offset += 1;
            console.log(number)
            if (number)
                number.textContent=offset;
            if (offset === 100)
                clearInterval(time);
        }, 50)
    
        setTimeout(function goHome() {
            location.href="index.html"
            loading.classList.remove("begin")
        }, 5000);
    }
    )
})