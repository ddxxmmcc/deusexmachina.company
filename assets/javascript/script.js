$(function() {

// Thanks to Andy E for this shuffler:
// https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
String.prototype.shuffle = function () {
    var trim = this.trim();
    var [padL, padR] = this.split(trim);
    var a = trim.split("").filter(c => c !== " "),
        fullLen = trim.length,
        len = a.length;

    for(var i = len - 1; i > 0; i--) {
        var tmp = a[i];

        var j = Math.floor(Math.random() * (i + 1));
        a[i] = a[j];
        a[j] = tmp;
    }

    for (var i = (fullLen - len); i > 0; i--) {
        a.splice(Math.floor(Math.random() * (len - 1) + 1), 0, " ");
    }
    
    return [padL, ...a, padR].join("");
}

// Thanks to Justin Windle for posting this scrambler:
// https://codepen.io/soulwire/pen/mErPAK
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

/* thanks to https://commoner.earth for the the holy ciphers */
/* https://github.com/tyleretters/apodcastfornow.com/blob/master/assets/script.js */
const phrases = [
  'Community',
  'web3',
  'Impatience',
  'Possiblity',
  'Change',
  'ETH',
  'Kelp',
  '⁂',
  'Unfound',
  'Crypto',
  'አሁን',
  'Hopeful',
  'Lost',
  'Cyborgs',
  'Tao',
  'Rebuilding',
  '䷜',
  'Exiting the VC',
  '☥',
  'Alienation',
  '404s',
  '909s'
]

if ($('.scramble').length) {
  const el = document.querySelector('.scramble');
  const fx = new TextScramble(el);

  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1200);
    })
    counter = (counter + 1) % phrases.length;
  }

  next();
}

});