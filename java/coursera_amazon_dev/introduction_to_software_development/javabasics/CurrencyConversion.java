public class CurrencyConversion {
    public static void main(String args[]) {

        double amountInUSD = 100.0;
        double exchangeRateUSDToEUR = 0.85;

        System.out.println("The initial amount in USD: " + amountInUSD);

        double amountInEUR = amountInUSD * exchangeRateUSDToEUR;

        System.out.println("the amount of EUR after converstion: " + amountInEUR);

        int deduction = 55;

        double balance = amountInEUR - deduction;
        System.out.println("Amount in EUR after expenditure: " + balance);

        System.out.printf("Amount in USD after converting back is $ %.2f ", +(balance /= exchangeRateUSDToEUR));

    }
}