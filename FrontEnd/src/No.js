#include <iostream>
#include <vector>
#include <string>
using namespace std;
class Account {
private:
    int id;
    string name;
    double balance;
public:
    Account(int i,string n,double b){
        id=i;
        name=n;
        balance=b;
    }
    int getId(){
        return id;
    }
    string getName(){
        return name;
    }
    double getBalance(){
        return balance;
    }
    void deposit(double amount){
        balance+=amount;
    }
    bool withdraw(double amount){
        if(amount>balance){
            return false;
        }
        balance-=amount;
        return true;
    }
    void display(){
        cout<<"ID: "<<id<<endl;
        cout<<"Name: "<<name<<endl;
        cout<<"Balance: "<<balance<<endl;
    }
};
class Bank {
private:
    vector<Account> accounts;
public:
    void addAccount(int id,string name,double balance){
        accounts.push_back(Account(id,name,balance));
    }
    Account* findAccount(int id){
        for(auto &acc:accounts){
            if(acc.getId()==id){
                return &acc;
            }
        }
        return nullptr;
    }
    void showAll(){
        for(auto &acc:accounts){
            acc.display();
            cout<<"------"<<endl;
        }
    }
};
int main(){
    Bank bank;
    bank.addAccount(1,"Prince",1000);
    bank.addAccount(2,"Alex",2000);
    bank.addAccount(3,"John",3000);
    int choice;
    while(true){
        cout<<"1.Deposit\n2.Withdraw\n3.Show All\n4.Exit\n";
        cin>>choice;
        if(choice==4){
            break;
        }
        if(choice==3){
            bank.showAll();
            continue;
        }
        int id;
        double amount;
        cout<<"Enter ID: ";
        cin>>id;
        Account* acc=bank.findAccount(id);
        if(acc==nullptr){
            cout<<"Account not found\n";
            continue;
        }
        cout<<"Enter amount: ";
        cin>>amount;
        if(choice==1){
            acc->deposit(amount);
        } else if(choice==2){
            if(!acc->withdraw(amount)){
                cout<<"Insufficient balance\n";
            }
        }
    }
    cout<<"Goodbye"<<endl;
    return 0;
}
