$(".type").keyup(function () {
  if (!$(this).text().trim().length) {
    $(this).prepend('<span class="caret"></span>');
  }
});

$("#output").hide();
$(document).ready(function () {
  $("#form").on("submit", function (e) {
    $.ajax({
      data: {
        text: $('#mytext').html(),
        keys: $("#keys").val(),
      },
      type: "POST",
      url: "/submit",

      beforeSend: function () {
        $("#loader").show();
      },
    }).done(function (data) {
      $("#loader").hide();
      var tt = $("#textarea").val();
      if (tt != "") $("#output").html(data).show();
      // else $("#output").hide();
    });
    e.preventDefault();
  });
});

// ------------------- get text

// function getmytext_andpasstopy(){
//   let mytext = document.getElementById('mytext').textContent;
//   let mykey = document.getElementById('keys').value;
//   console.log(mytext);
//   const req =  new XMLHttpRequest()
//   req.open('POST',`/submit/${JSON.stringify(mytext)}/${JSON.stringify(mykey)}`)
//   req.send()
// }

// --------------------

const colors = [
    "orange",
    "orangered",
    "darkorange",
    "gold",
    "tomato",
    "goldenrod",
    "yellow",
  ],
  fire_spread = 15; // best range 10-20

function addParticle() {
  var fs = document.createElement("div"),
    skew =
      Math.random() < 0.5
        ? Math.random() * fire_spread
        : -Math.random() * fire_spread;
  fs.className = "fire_shaft";
  fs.style.height = Math.random() * 50 + 25 + "vh";
  fs.style.transform = "skew(" + skew + "deg)";
  fs.style.left = Math.random() * 100 + "%";
  var p = document.createElement("div");
  p.className = "particle";
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.onanimationend = function () {
    this.remove();
  };
  document.body.appendChild(fs).appendChild(p);
}

setInterval(addParticle, 1000 / 60);

function handleKeyUp(event) {
  const BASE_FONT_SIZE = 10;
  const MIN_FONT_SIZE = 1.5;

  const input = event.target;

  const inputLength = input.innerText.length;
  const inputFontSize = input.style.fontSize;

  let newFontSize = BASE_FONT_SIZE;

  if (inputLength > BASE_FONT_SIZE) {
    newFontSize = BASE_FONT_SIZE - Math.ceil(inputLength / BASE_FONT_SIZE);
  }

  input.style.fontSize =
    newFontSize < MIN_FONT_SIZE ? `${MIN_FONT_SIZE}rem` : `${newFontSize}rem`;
}

function handleBlur(event) {
  const input = event.target;

  if (!input.innerText.trim().length) {
    input.innerHTML = "";
  }
}

const input = document.querySelector(".input");

input.addEventListener("keyup", handleKeyUp);
input.addEventListener("blur", handleBlur);

//

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = ["Rail", "Fence", "Encoder", "Rail Fence Encoder", ":)"];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();
