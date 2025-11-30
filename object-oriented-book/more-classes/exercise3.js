class BankAccount {
  #balance = 0;

  #checkBalance() {
    console.log(`Current balance is: $${this.#balance}`);
  }

  deposit(amount) {
    this.#balance += amount;
    this.#checkBalance();
  }

  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      this.#checkBalance();
    } else {
      throw new RangeError("Insufficient Funds");
    }
  }
}

let bankAccount = new BankAccount();
bankAccount.deposit(100);
bankAccount.withdraw(50);
bankAccount.withdraw(100);

// Interesting. In this example, the only way to see funds is to see that you have none.
// It isn't possible to get the balance as an external user of the class.
