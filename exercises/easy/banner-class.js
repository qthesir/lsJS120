class Banner {
  constructor(message, width) {
    this.message = message;
    this.width = width ?? this.message.length;
  }

  displayBanner() {
    console.log(
      [
        this.horizontalRule(),
        this.emptyLine(),
        this.messageLine(),
        this.emptyLine(),
        this.horizontalRule(),
      ].join("\n")
    );
  }

  horizontalRule() {
    return `+-${"-".repeat(this.width)}-+`;
  }

  emptyLine() {
    return `| ${" ".repeat(this.width)} |`;
  }

  messageLine() {
    if (this.width <= 0) {
      return `|  |`;
    }

    let widthRemainder = this.width - this.message.length;
    if (widthRemainder < 0) {
      let truncatedMessage = this.message.slice(0, this.width - 3);
      return `| ${truncatedMessage}... |`;
    } else {
      return `| ${" ".repeat(Math.ceil(widthRemainder / 2))}${
        this.message
      }${" ".repeat(Math.floor(widthRemainder / 2))} |`;
    }
  }
}

// Test cases

let banner1 = new Banner("To boldly go where no one has gone before.");
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner("", 75);
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+
