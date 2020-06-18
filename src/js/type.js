class TypeWriter {
    constructor(parentElement, words, cursor) {
        this.parentElement = parentElement;
        this.cursor = cursor;
        this.words = words;
        this.index = 0;
        this.time;
        this.txt = "";
        this.isDeleting = false;
        this.type();
    }

    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    type() {

        const currentIndex = this.index % this.words.length;
        const fullWord = this.words[currentIndex];

        if (this.isDeleting) {
            // remove char
            this.cursor.classList.remove("blink");
            this.time = this.getRandomValue(20, 50);
            this.txt = fullWord.substring(0, this.txt.length - 1);
        }
        else {
            // add char
            this.cursor.classList.remove("blink");
            this.time = this.getRandomValue(150, 200);
            this.txt = fullWord.substring(0, this.txt.length + 1);
        }

        this.parentElement.innerText = this.txt;

        if (!this.isDeleting && this.txt == fullWord) {
            this.cursor.classList.add("blink");
            this.time = this.getRandomValue(900, 1100);
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt == "") {
            this.cursor.classList.add("blink");
            this.time = this.getRandomValue(400, 600);
            this.isDeleting = false;
            this.index += 1;
        }

        setTimeout(() => this.type(), this.time);
    }
}





window.addEventListener("DOMContentLoaded", () => {
    const parentElement = document.querySelector(".txt-type");
    const cursor = document.querySelector('.cursor');
    const words = JSON.parse(parentElement.getAttribute("data-words"));
    new TypeWriter(parentElement, words, cursor);
})