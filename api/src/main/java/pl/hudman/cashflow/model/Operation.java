package pl.hudman.cashflow.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "operation")
public class Operation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int user_id;

    @Column(name = "description")
    private String description;

    @Column(name = "is_come")
    private boolean isCome;

    @Column(name = "time_stamp")
    private Timestamp timeStamp;

    @Column(name = "value_cash_flow")
    private long amountOfMoney;

    public Operation(String description, boolean isCome, Timestamp timeStamp, long amountOfMoney) {
        this.description = description;
        this.isCome = isCome;
        this.timeStamp = timeStamp;
        this.amountOfMoney = amountOfMoney;
    }

    public Operation() {
    }

    public void setUser(int user_id) {
        this.user_id = user_id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCome(boolean come) {
        isCome = come;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public void setAmountOfMoney(long amountOfMoney) {
        this.amountOfMoney = amountOfMoney;
    }

    public int getId() {
        return id;
    }

    public int getUser() {
        return user_id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCome() {
        return isCome;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public long getAmountOfMoney() {
        return amountOfMoney;
    }
}
