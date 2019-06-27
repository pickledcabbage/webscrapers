from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException


browser = webdriver.Chrome('D:\workspace\chromedriver\chromedriver.exe')

browser.get("https://github/com/TheDancerCodes")

timeout = 20

try:
    WebDriverWait(browser, timeout).until(EC.visibility_of_element_located((By.XPATH, "//img[@class=' avatar width-full rounded-2']")))
except TimeoutException:
    print("Timed out waiting for page to load")
    browser.quit()

titles_element = browser.find_elements_by_xpath("//a[@class='text-bold']")

titles = [x.text for x in titles_element]

print('titles:')
print(titles, '\n')