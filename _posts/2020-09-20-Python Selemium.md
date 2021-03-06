---
title: "[Python] 파이썬 request 모듈"
date: 2020-9-18
categories:
- study
tags:
- python
toc: true
toc_ads: true
toc_sticky: true
---

<br>
<br>

#### 다음 뉴스 댓글 개수 크롤링하기

```python
import requests
```

#### HTTP 상태 코드
 - 1xx (정보): 요청을 받았으며 프로세스를 계속한다
 - 2xx (성공): 요청을 성공적으로 받았으며 인식했고 수용하였다
 - 3xx (리다이렉션): 요청 완료를 위해 추가 작업 조치가 필요하다
 - 4xx (클라이언트 오류): 요청의 문법이 잘못되었거나 요청을 처리할 수 없다
 - 5xx (서버 오류): 서버가 명백히 유효한 요청에 대해 충족을 실패했다

[출처: 위키피디아](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)

```python
url = 'https://comment.daum.net/apis/v1/posts/@20190728165812603'

# Network > 주로 XHR 탭에서 찾음 > 
# 댓글 갯수 46개랑 맞는 부분 확인, 여기서는 commentCount
# XHR = XMLHttpRequest (XHR)은 AJAX 요청을 생성하는 JavaScript API

resp = requests.get(url)
print(resp)

# 4로 시작하면 오류
```

```python
# header를 만들어서 같이 호출하면 호출될 확률 상승함 (l00%는 아니지만)
# Name > Headers 복사

url = 'https://comment.daum.net/apis/v1/posts/@20190728165812603'

headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3J1bV9rZXkiOiJuZXdzIiwiZ3JhbnRfdHlwZSI6ImFsZXhfY3JlZGVudGlhbHMiLCJzY29wZSI6W10sImV4cCI6MTYwOTI2NzIxNiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DTElFTlQiXSwianRpIjoiNDg2Yjk4MzEtNTI4OC00ZDc2LWI4NDEtYjJkMGUwZDhhYzA2IiwiZm9ydW1faWQiOi05OSwiY2xpZW50X2lkIjoiMjZCWEF2S255NVdGNVowOWxyNWs3N1k4In0.NfCdggvtK5scaply56X4siVfU93XZy6Dy3l_9qcTXyE',
    'Origin': 'https://news.v.daum.net',
    'Referer': 'https://news.v.daum.net/v/20190728165812603',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
}

resp = requests.get(url, headers=headers)
# print(resp.text)              # json 형식으로 출력
resp.json()['commentCount']     # 바로 dict로 반환, 댓글수
```

#### 로그인하여 데이터 크롤링하기
 - 특정한 경우, 로그인을 해서 크롤링을 해야만 하는 경우가 존재
 - 예) 쇼핑몰에서 주문한 아이템 목록, 마일리지 조회 등
 - 이 경우, 로그인을 자동화 하고 로그인에 사용한 세션을 유지하여 크롤링을 진행

#### 로그인 후 데이터 크롤링 하기
 1. endpoint 찾기 (개발자 도구의 network를 활용)
 2. id와 password가 전달되는 form data찾기
 3. session 객체 생성하여 login 진행
 4. 이후 session 객체로 원하는 페이지로 이동하여 크롤링
 

```python
import requests
from bs4 import BeautifulSoup
```

* endpoint 찾기

```python
# 개발자 도구 켜놓은 상태에서 로그인
# 개발자 도구 > member_check.asp 클릭

# 로그인 endpoint

url = 'https://www.kangcom.com/member/member_check.asp'
```

* id, password로 구성된 form data 생성하기

```python
# 로그인은 form data가 중요

data = {
    'id': 'redjoun',
    'pwd': 'a12b34c56'
}

```

* login
 - endpoint(url)과 data를 구성하여 post 요청
 - login의 경우 post로 구성하는 것이 정상적인 웹사이트!

```python
# 마일리지 데이터 읽기

s = requests.Session()

resp = s.post(url, data=data)
print(resp)
```

* crawling
 - login 시 사용했던 session을 다시 사용하여 요청

```python
my_page = 'https://www.kangcom.com/mypage'
resp = s.get(my_page)                       # mypage html 받아옴

soup = BeautifulSoup(resp.text)             # text로 분류
# soup.select('td.a_bbslist55')[3]          # td이면서 class가 a_bbslist55인 것

soup.select_one('td.a_bbslist55:nth-child(3)')
mileage = td.get_text()
mileage
```









# 모듈 사용하기

```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup
import time
```

#### selenium
 - 웹페이지 테스트 자동화용 모듈
 - 개발/테스트용 드라이버(웹브라우저)를 사용하여 실제 사용자가 사용하는 것처럼 동작
 - 실습전 확인사항
   - selenium 모듈 설치
   : Anaconda Navigator > Environments > All 선택 > selenium 검색 및 선택 > Apply
   - [크롬 드라이버 다운로드](https://chromedriver.chromium.org/downloads)
   : ChromeDriver 88.0.4324.27 부분 클릭 > window용 다운로드
- 크롤링 끝판왕, request와 beautifulsoup으로 실패하면 selenium 사용하면 끝
- selenium은 프로그래밍으로 하는게 아니라 웹브라우저 동작하는 것처럼 함


#### selenium 예제
 - python.org 로 이동하여 자동으로 검색해보기
   1. python.org 사이트 오픈
   2. input 필드를 검색하여 Key 이벤트 전달
 


cf. 경로
1. 절대경로: 어떠한 웹페이지나 파일이 가지고 있는 고유한 경로
2. 상대경로: '현재 위치한 곳을 기준'으로 해서 '그곳의 위치'
  * / : 루트 -> 가장 최상의 디렉토리로 이동한다.(Web root)
  * ./ : 현재 위치 -> 파일이 현재 디렉토리를 의미
  * ../ : 현재 위치의 상단 폴더 -> 상위 디렉토리로 이동
  * ../../ : 두단계 상위 디렉토리로 이동하려면
    - ex) index.php가 C:\index\a에 위치한다면,
      여기서 / 는 C:, ./ 는 a, ../ 는 index라는 것.



```python
chrome_driver = './chromedriver'
driver = webdriver.Chrome(chrome_driver)

driver.get('https://www.python.org')

search = driver.find_element_by_id('id-search-field')   # .find_element_by_id : id로 검색

search.clear()                                 # .clear : 인풋 박스 내용 제거
time.sleep(3)

search.send_keys('lambda')                     # 검색어 입력
time.sleep(3)

search.send_keys(Keys.RETURN)                  # ENTER 키
time.sleep(3)

driver.close()
```

#### selenium을 이용한 다음뉴스 웹사이트 크롤링
 - driver 객체의 find_xxx_by 함수 활용

 ```python
chrome_driver = './chromedriver'
driver = webdriver.Chrome(chrome_driver)

url = 'https://news.v.daum.net/v/20190728165812603'

driver.get(url)

src = driver.page_source                            # 페이지 소스
soup = BeautifulSoup(src)

driver.close()

comment = soup.select_one('span.alex-count-area')    # 댓글 영역 선택
comment.get_text()
```


#### selenium을 활용하여 특정 element의 로딩 대기
 - WebDriverWait 객체를 이용하여 해당 element가 로딩 되는 것을 대기
 - 실제로 해당 기능을 활용하여 거의 모든 사이트의 크롤링이 가능
 - WebDriverWait(driver, 시간(초)).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'CSS_RULE')))
 

 ```python
chrome_driver = './chromedriver'
driver = webdriver.Chrome(chrome_driver)

url = 'https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=105&oid=081&aid=0003018031'

driver.get(url)

# span.u_cbox_count 가 충분히 로딩될 수 있도록 기다려줌
# 드라이버에게 최대 10초간 기다리게 함.
# until 요소 (CSS 요소에 의해서, )
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'span.u_cbox_count')))

src = driver.page_source                             # 페이지 소스
soup = BeautifulSoup(src)

driver.close()

comment = soup.select_one('span.u_cbox_count')      # 댓글갯수 선택
comment.get_text()
```









# 웹 크롤링

```python
import requests
from bs4 import BeautifulSoup
```

#### 뉴스 제목 크롤링

```python
# def 함수명(input)
def get_daum_news_title(news_id):
    # daum.net/v/뒤는 동적으로 바뀌므로 {}로 변경하고 format 지정
    url = 'https://news.v.daum.net/v/{}'.format(news_id)
    resp = requests.get(url)
    
    soup = BeautifulSoup(resp.text)

    # h3의 해당 id 입력
    title_tag = soup.select_one('h3.tit_view')
    
    # title_tag가 값을 찾았으면 해당 tag 반환, 아니면 빈 문자열
    if title_tag:                   
        return title_tag.get_text()
    return ""
```

```python
get_daum_news_title('20190728165812603')
```

```python
get_daum_news_title('20190801114158041')
```

#### 뉴스 본문 크롤링

```python
def get_daum_news_content(news_id):
    url = 'https://news.v.daum.net/v/{}'.format(news_id)
    resp = requests.get(url)
    
    soup = BeautifulSoup(resp.text)
    
    content = ''
    # div가 harmonyContainer에서 p만 모음
    for p in soup.select('div#harmonyContainer p'):
        content += p.get_text()   # p가 계속 반복하면서 get_text에 누적
    return content                # 최종 content 반환
```

```python
get_daum_news_content('20190728165812603')
```

```python
get_daum_news_content('20190801114158041')
```


#### 뉴스 댓글 크롤링
```python
# 구글 개발자 모드로 '댓글 더보기' 클릭시 어떻게 반응하는지 확인
# comments?로 시작하는 페이지 생성됨
# request url 복사 및 규칙 찾기 (ex. offset과 limit으로 댓글 갯수 유추)

# requests.get(url)만 하면 오류나므로 headers도 같이 불러옴

url = 'https://comment.daum.net/apis/v1/posts/133493400/comments?parentId=0&offset=3&limit=10&sort=POPULAR&isInitial=false&hasNext=true&randomSeed=1609266058'

headers = {
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3J1bV9rZXkiOiJuZXdzIiwiZ3JhbnRfdHlwZSI6ImFsZXhfY3JlZGVudGlhbHMiLCJzY29wZSI6W10sImV4cCI6MTYwOTMwNTkwMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9DTElFTlQiXSwianRpIjoiMzBlYjRlOTAtNWE5NS00Y2JiLTg1ZjAtNjQyZDU2ZDIyYTczIiwiZm9ydW1faWQiOi05OSwiY2xpZW50X2lkIjoiMjZCWEF2S255NVdGNVowOWxyNWs3N1k4In0.S__Je940YmYKfAzzmLQmin7CQih85aRreckA_rwurDY',
         'Origin': 'https://news.v.daum.net',
         'Referer': 'https://news.v.daum.net/v/20190728165812603',
         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
}

resp = requests.get(url, headers=headers)
resp.json()
```

```python
# offset 3부터 시작해서 빈리스트이면 끝

def get_daum_news_comments(news_id):
    
    headers = {
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3J1bV9rZXkiOiJuZXdzIiwiZ3JhbnRfdHlwZSI6ImFsZXhfY3JlZGVudGlhbHMiLCJzY29wZSI6W10sImV4cCI6MTYwOTMwNTkwMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9DTElFTlQiXSwianRpIjoiMzBlYjRlOTAtNWE5NS00Y2JiLTg1ZjAtNjQyZDU2ZDIyYTczIiwiZm9ydW1faWQiOi05OSwiY2xpZW50X2lkIjoiMjZCWEF2S255NVdGNVowOWxyNWs3N1k4In0.S__Je940YmYKfAzzmLQmin7CQih85aRreckA_rwurDY',
         'Origin': 'https://news.v.daum.net',
         'Referer': 'https://news.v.daum.net/v/20190728165812603',
         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    }

    # news_id와 offset 동적으로 변경될꺼니까 {}로 변경
    url_template = 'https://comment.daum.net/apis/v1/posts/{}/comments?parentId=0&offset={}&limit=10&sort=RECOMMEND&isInitial=false'
    offset = 0
    comments = []
    
    while True:
        url = url_template.format(news_id, offset)
        resp = requests.get(url, headers=headers)
        data = resp.json()
        if not data:                      # 만약 data가 비어있으면 종료
            break
            
        comments.extend(data)             # 받아오는 contents를 data에 담음
        offset += 10                      # limit이 10씩 증가하므로
        
    return comments
```

```python
resp = requests.get(url)
url_template.text()
```

```python
len(get_daum_news_comments('133493400'))
len(get_daum_news_comments('20190801114158041'))
```






