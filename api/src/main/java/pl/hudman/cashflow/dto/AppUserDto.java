package pl.hudman.cashflow.dto;

public class AppUserDto {
    private int id;
    private String email;
    private String password;
    private String companyName;
    private String phoneNumber;

    public AppUserDto(int id, String email, String password, String companyName, String phoneNumber) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
    }

    public AppUserDto(String email, String password, String companyName, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
    }

    public AppUserDto() {
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
