package org.example;

public class App {

    public String getGreeting() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        System.out.println(new org.cloudians.App().getGreeting());
    }
}
