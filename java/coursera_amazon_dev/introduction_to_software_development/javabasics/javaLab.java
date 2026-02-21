public class javaLab {

   public static void main(String[] args) {
      String word = "Java programming is fun and educational";
      boolean containsFun = word.contains("fun");
      System.out.println("Checking if it contains fun: " + containsFun);
      String replacedString = word.replace("educational", "awesome");
      System.out.println("Palavras trocadas: " + replacedString);
      String shortenWord = word.substring(0, 17);
      System.out.println("Palavras encurtadas: " + shortenWord);
   }
}
