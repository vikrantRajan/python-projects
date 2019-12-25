class Account:
    
    def __init__(self, filepath):
        self.filepath=filepath
        with open(filepath, 'r') as file:
            self.balance = float(file.read())
            
    
    def withdraw(self, amount):
        self.balance = self.balance - amount
        
    def deposit(self, amount):
        self.balance = self.balance + amount
        
    def commit(self):
        with open(self.filepath, 'w') as file:
            file.write(str(self.balance))
        
        
class Chequing(Account):

    def __init__(self, filepath, fee):
        Account.__init__(self, filepath)
        self.fee = fee
    def transfer(self, amount):
        self.balance = self.balance - amount - self.fee

# account = Account("balance.txt")
chequing = Chequing("balance.txt", 3.99)
print(chequing.balance)
# chequing.deposit(4000)
chequing.transfer(3300)
chequing.commit()
print(chequing.balance)