/**
 * Base class for all drawable objects in the game.
 * Provides fundamental functionality for image loading, rendering, and collision detection.
 * All visual game elements extend from this class.
 */
class DrawableObject {
    /** @type {number} - X position in the game world */
    x = 10;
    /** @type {number} - Y position in the game world */
    y = 10;
    /** @type {HTMLImageElement} - Current image being displayed */
    img;
    /** @type {number} - Width of the object */
    width = 100;
    /** @type {number} - Height of the object */
    height = 50;
    /** @type {Object.<string, HTMLImageElement>} - Cache of loaded images for performance */
    imageCache = {};
    /** @type {number} - Current frame index for animations */
    currentImage = 0;
    /** @type {Object} - Collision box offsets for precise collision detection */
    offset = {};
    /** @type {number} - Real collision box X position */
    rX;
    /** @type {number} - Real collision box Y position */
    rY;
    /** @type {number} - Real collision box width */
    rW;
    /** @type {number} - Real collision box height */
    rH;

    /**
     * Loads a single image from the specified path.
     * Creates a new Image object and sets its source.
     * @param {string} path - Path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Calculates the real collision frame based on object position and offsets.
     * Used for precise collision detection by adjusting the collision box.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch (e) {
            // Error loading image - using fallback
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chicks || this instanceof Endboss || this instanceof Coins || this instanceof Bottles || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawRealFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chicks || this instanceof Endboss || this instanceof Coins || this instanceof Bottles || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images into the image cache for animations.
     * @param {string[]} arr - Array of image paths to load
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimationOnce(images, frameRate = 100) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        let i = 0;
        const step = () => {
            if (i < images.length) {
                this.img = this.imageCache[images[i]];
                i++;
                setTimeout(step, frameRate);
            } else {
                this.isAnimating = false;
            }
        };

        step();
    }
}
