let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        // Mouse events
        paper.addEventListener('mousedown', (e) => this.startDrag(e, paper));
        document.addEventListener('mousemove', (e) => this.drag(e, paper));
        window.addEventListener('mouseup', () => this.endDrag());

        // Touch events
        paper.addEventListener('touchstart', (e) => this.startDrag(e, paper));
        document.addEventListener('touchmove', (e) => this.drag(e, paper));
        window.addEventListener('touchend', () => this.endDrag());

        // Prevent text selection on touch
        paper.addEventListener('touchstart', (e) => e.preventDefault());
    }

    startDrag(e, paper) {
        this.holdingPaper = true;

        const event = e.touches ? e.touches[0] : e;

        paper.style.zIndex = highestZ;
        highestZ += 1;

        this.prevMouseX = event.clientX;
        this.prevMouseY = event.clientY;
    }

    drag(e, paper) {
        if (!this.holdingPaper) return;

        const event = e.touches ? e.touches[0] : e;

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

        this.velocityX = this.mouseX - this.prevMouseX;
        this.velocityY = this.mouseY - this.prevMouseY;

        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
    }

    endDrag() {
        this.holdingPaper = false;
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
