package pl.hudman.cashflow.model;

import javax.persistence.*;

@Entity
@Table(name = "user_cash_flow")
public class User {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password_user")
    private String password;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "phone_number")
    private String phoneNumber;

    public User(String email, String password, String companyName, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
    }

    public User() {
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
