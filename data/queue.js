// Class to store a channel's queue during a STC event.
class STCQueue {

	// @param {list} List of users in the queue.
	#queue;
	// @param {boolean} If the queue is open.
	#isOpen;
	// @param {boolean} If the queue is paused.
	#isPaused;

	// Default values for the queue when initialized.
	constructor() {
		this.#isOpen = false;
		this.#isPaused = false;
		this.#queue = [];
	}

	// Checks if Queue is Open
	getIsOpen() {
		return #this.isOpen;
	}

	// Sets new value if queue is open. If closed, it will clear the queue.
	// @param {Boolean} 'isOpen' value to change for isOpen.
	setIsOpen(isOpen) {
		this.#isOpen = isOpen;
		if (!isOpen) {
			(this.#queue).length = 0;
		}
	}

	// Checks if Queue is Paused
	getIsPaused() {
		return isPaused;
	}

	// Sets new value if queue is paused
	// @param {Boolean} 'isPaused' value to change for isPaused.
	setIsPaused(isPaused) {
		this.#isPaused = isPaused
	}

	// Gets length of queue.
	getQueueSize() {
		return (this.#queue).length;
	}

	// Add user to queue.
	// @param {String} 'userName' New user to be added to the queue.
	addQueue(userName) {
		(this.#queue).push(userName);
	}

	// Removes next user from queue and returns the user. Undefined if empty.
	removeQueue() {
		const nextUser = (this.#queue).shift();
		return nextUser;
	}
}
