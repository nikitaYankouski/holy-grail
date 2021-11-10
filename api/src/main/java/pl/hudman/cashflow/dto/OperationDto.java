package pl.hudman.cashflow.dto;

public class OperationDto {
    private int id;
    private int userId;
    private String description;
    private String timeStamp;
    private boolean isInCome;
    private long amountOfMoney;

    public OperationDto(int id, int userId, String description, String timeStamp, boolean isInCome, long amountOfMoney) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.timeStamp = timeStamp;
        this.isInCome = isInCome;
        this.amountOfMoney = amountOfMoney;
    }

    public OperationDto(String description, String timeStamp, boolean isInCome, long amountOfMoney) {
        this.description = description;
        this.timeStamp = timeStamp;
        this.isInCome = isInCome;
        this.amountOfMoney = amountOfMoney;
    }

    public OperationDto() {
    }

    public long getAmountOfMoney() {
        return amountOfMoney;
    }

    public void setAmountOfMoney(long amountOfMoney) {
        this.amountOfMoney = amountOfMoney;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public void setInCome(boolean inCome) {
        isInCome = inCome;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public String getDescription() {
        return description;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public boolean isInCome() {
        return isInCome;
    }
}
