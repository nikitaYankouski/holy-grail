package pl.hudman.cashflow.utility;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Validation {

    public static final String pattern = "yyyy-MM-dd";

    public static boolean checkDateFormat(String date) {
        if (date.length() < 10) {
            return false;
        } else if (date.length() > 10) {
            date = date.substring(0, 10);
        }

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            formatter.parse(date);
            return true;
        } catch (DateTimeParseException ex) {
            return false;
        } catch (NullPointerException ex) {
            return false;
        }
    }
}