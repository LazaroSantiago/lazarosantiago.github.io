const header = document.querySelector("header");

const logoHeader = document.querySelector("header img");

const logo = document.querySelector("#img-logo");

document.addEventListener("scroll", () => {
  logo.style.transform = "scale(" + (1 + this.window.scrollY * -0.006) + ")";

  logo.style.opacity = 1 + -this.window.scrollY * 0.005;

  if (window.scrollY > 150) {
    header.classList.add("scroll");
    logoHeader.style.opacity = 0.3 + this.window.scrollY * 0.002;
  }
  if (window.scrollY < 150) {
    header.classList.remove("scroll");
    logoHeader.style.opacity = 0;
  }
});

/*-------------------contenedor fondo del cielo---------------------*/

const edificio1 = document.querySelector("#img-edificio1");
const edificio2 = document.querySelector("#img-edificio2");
const edificio3 = document.querySelector("#img-edificio3");
const spider1 = document.querySelector("#img-spider1");
const spider2 = document.querySelector("#img-spider2");
const spider3 = document.querySelector("#img-spider3");
const duende = document.querySelector("#img-duende");
const tela2 = document.querySelector("#tela2");

window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  duende.style.transform =
    "translateY(" +
    scrollPosition * 0.15 +
    "px)"; /* Adjust the multiplier for the desired speed */

  spider1.style.transform = "translateX(" + this.window.scrollY * 0.3 + "px)";
  spider2.style.transform = "scale(" + (1 + this.window.scrollY * 0.0003) + ")";
  spider3.style.transform = "translateX(" + -this.window.scrollY * 0.3 + "px)";

  edificio1.style.transform = "translateX(" + this.window.scrollY * 0.3 + "px)";
  edificio2.style.transform =
    "scale(" + (1 + -this.window.scrollY * 0.0002) + ")";
  edificio3.style.transform =
    "translateX(" + -this.window.scrollY * 0.3 + "px)";

  tela2.style.transform = "translateX(" + this.window.scrollY * 0.3 + "px)";
});

/*-----------------------HISTORIAS DE LOS SPIDERS---------------------*/

window.addEventListener("scroll", function () {
  let box = this.document.querySelector("section.mini-historias");
  let historias = this.document.querySelectorAll(
    "section.mini-historias .historia"
  );

  let altura = window.innerHeight / 2.8;

  let distancia = box.getBoundingClientRect().top;

  historias.forEach((h) => {
    h.classList.add("transform_up");
    if (distancia <= altura) {
      h.classList.add("aparece");
    } else {
      if (h.classList.contains("aparece")) {
        h.classList.remove("aparece");
      }
    }
  });
});

/*------------------------------GHOST SPIDER---------------------------------*/
const section4 = document.querySelector("#ghostspider");
const c1 = document.querySelector("#race1");
const c2 = document.querySelector("#race2");
const c3 = document.querySelector("#race3");

window.addEventListener("scroll", function () {
  const pos = section4.getBoundingClientRect();
  const desplazamiento = window.scrollY;
  if (pos.top < window.innerHeight && pos.bottom > 0) {
    c1.style.transform =
      "translateY(" +
      (desplazamiento - pos.top) * 0.03 +
      "px) rotate(-13.078deg)";
    c2.style.transform =
      "translateY(" +
      (desplazamiento - pos.top) * 0.03 +
      "px) rotate(-26.474deg)";
    c3.style.transform =
      "translateY(" +
      (desplazamiento - pos.top) * 0.01 +
      "px) rotate(-36.016deg)";
  }
});

document.addEventListener("scroll", () => {
  function clean() {
    document.querySelectorAll(".img").forEach((s) => {
      s.classList.remove("mostrar");
    });
    document.querySelectorAll(".texto").forEach((s) => {
      s.classList.remove("mostrar");
    });
  }
  if (window.scrollY < 4080) {
    clean();
    document.querySelector("#img1").classList.add("mostrar");
    document.querySelector("#text1").classList.add("mostrar");
  }
  if (window.scrollY > 4080 && window.screenY < 4450) {
    clean();
    document.querySelector("#img2").classList.add("mostrar");
    document.querySelector("#text2").classList.add("mostrar");
  }
  if (window.scrollY > 4450 && window.screenY < 4950) {
    clean();
    document.querySelector("#img3").classList.add("mostrar");
    document.querySelector("#text3").classList.add("mostrar");
  }
  if (window.scrollY > 4950) {
    clean();
    document.querySelector("#img4").classList.add("mostrar");
    document.querySelector("#text4").classList.add("mostrar");
  }
});
