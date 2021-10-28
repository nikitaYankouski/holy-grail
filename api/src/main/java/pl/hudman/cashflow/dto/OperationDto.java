package pl.hudman.cashflow.dto;

public class OperationDto {
    private int id;
    private int userId;
    private String description;
    private String timeStamp;
    private boolean isInCome;

    public OperationDto(int id, int userId, String description, String timeStamp, boolean isInCome) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.timeStamp = timeStamp;
        this.isInCome = isInCome;
    }

    public OperationDto(int userId, String description, String timeStamp, boolean isInCome) {
        this.userId = userId;
        this.description = description;
        this.timeStamp = timeStamp;
        this.isInCome = isInCome;
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
