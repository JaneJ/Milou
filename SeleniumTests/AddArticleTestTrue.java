package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class AddArticleTestTrue {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "http://milou.herokuapp.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testAddArticleTestTrue() throws Exception {
    driver.get(baseUrl + "/pages/addarticle.html");
    driver.findElement(By.xpath("(//input[@name='teema'])[2]")).click();
    driver.findElement(By.id("formArtikliPealkiri")).clear();
    driver.findElement(By.id("formArtikliPealkiri")).sendKeys("Atrikli lisamine");
    driver.findElement(By.id("lyhikirjeldus2")).clear();
    driver.findElement(By.id("lyhikirjeldus2")).sendKeys("Ok");
    driver.findElement(By.id("artiklisisu")).clear();
    driver.findElement(By.id("artiklisisu")).sendKeys("Sisu");
    driver.findElement(By.id("autor")).clear();
    driver.findElement(By.id("autor")).sendKeys("Jane Jürgenson");
    driver.findElement(By.cssSelector("input[type=\"submit\"]")).click();
    assertEquals("Artikkel edukalt üles laetud!", closeAlertAndGetItsText());
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
