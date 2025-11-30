class BankAccount {
  #balance;

  #checkBalance() {
    return this.#balance;
  }

  deposit(deposit) {
    this.#balance += deposit;
  }

  withdraw(withdrawal) {
    if (this.#checkBalance() - withdrawal > 0) {
      this.#balance -= withdrawal;
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
