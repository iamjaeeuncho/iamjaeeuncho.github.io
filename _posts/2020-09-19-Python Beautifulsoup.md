---
title: "[Python] 파이썬 크롤링 - BeautifulSoup"
date: 2020-9-18
categories:
- study
tags:
- python
toc: true
toc_ads: true
toc_sticky: true
---


## BeautifulSoup란?
- 뷰티플 수프는 HTML과 XML 문서를 파싱하기위한 파이썬 패키지
- 웹 스크래핑에 유용한 HTML에서 데이터를 추출하는 데 사용할 수있는 구문 분석 된 페이지에 대한 구문 분석 트리를 생성
<br>
<br>

### Parsing이란?
- 어떤 문장을 분석하거나 문법적 관계를 해석하는 행위로, 컴퓨터 과학에서는 일련의 문자열을 의미있는 token(어휘 분석) 단위로 분해하고, 그것들로 이루어진 Parse tree를 만드는 과정
- Parser는 문법 및 구문 분석하는 parsing을 수행하는 프로그램

<center><img src="https://user-images.githubusercontent.com/46369038/110205592-2be03f00-7ebc-11eb-83b1-ba3c1a11044b.png" width="700" style="border: 2px solid rgb(213, 213, 213);"><br>
<i>credit: http://web.eecs.utk.edu/~azh/blog/teenytinycompiler2.html</i></center>
<br>
<br>

## HTML 문자열 파싱
- 문자열로 정의된 html 데이터 파싱(parsing : HTML에서 특정값만 추출)하기
- 예를 들어 <h3 title='Good Content Title'>Contents Title</h3> 구문에서 h3는 태그(tag), title은 속성(attribute), Good Content Title은 속성값(Value)

```python
from bs4 import BeautifulSoup
------------------------------
html = '''
<html>
  <head>
    <title>BeautifulSoup test</title>
  </head>
  <body>
    <div id='upper' class='test' custom='good'>
      <h3 title='Good Content Title'>Contents Title</h3>
      <p>Test contents</p>
    </div>
    <div id='lower' class='test' custom='nice'>
      <p>Test Test Test 1</p>
      <p>Test Test Test 2</p>
      <p>Test Test Test 3</p>
    </div>
  </body>
</html>'''
```
<br>
<br>

### HTML 태그값 추출
#### find
- find함수는 html을 tag명으로 검색하거나 검색 조건을 명시하여 찾고자하는 tag를 검색
- 속성(attribution)은 기본적으로 dict

```python
soup = BeautifulSoup(html)
------------------------------
soup.find('div')
soup.find('div', custom='nice')
soup.find('div', id='upper')
soup.find('div', class='test')            # class는 키워드라 검색이 안됨
soup.find('div', class_='test')
------------------------------
attrs = {'id': 'upper', 'class': 'test'}  # 속성은 기본적으로 dict
soup.find('div', attrs=attrs)             # id가 upper이면서 class가 test인 것 찾기
```
<br>
<br>

#### find_all
- find가 조건에 만족하는 하나의 첫번째 tag만 검색한다면, find_all은 조건에 맞는 모든 tag를 리스트로 반환

```python
soup.find_all('div')
soup.find_all('div', class_='test')
```
<br>
<br>

#### get_text
- 태그 안의 value를 추출
- 부모 태그에서 get_text를 하면 모든 자식 tag의 value를 추출.

```python
tag = soup.find('h3')
print(tag)
tag.get_text()
------------------------------
tag = soup.find('p')
print(tag)
tag.get_text()
------------------------------
tag = soup.find('div', id='upper')
print(tag)
tag.get_text()
```
<br>
<br>

### HTML 속성값 추출
- 경우에 따라서 추출하고자 하는 값이 태그가 아니라 속성(attribute)값에도 존재함
- 이 경우에는 검색한 tag에 attribute 이름을 [ ]연산을 통해 추출가능. 예를 들어, div.find('h3')['title']

```python
value = soup.find('h3')

print(tag)
tag['title']
```
<br>
<br>

## 연습문제
### 뉴스 데이터 크롤링
#### Id, Class 속성으로 태그 찾기

```python
import requests
from bs4 import BeautifulSoup
------------------------------
# url에 담겨진 텍스트 가져옴
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)

resp.text
------------------------------
# Title 추출
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)

soup = BeautifulSoup(resp.text)       

# Title의 텍스트만
title = soup.find('h3', class_='tit_view')
title.get_text()                            
------------------------------
# 작성자, 작성일  추출
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)

soup = BeautifulSoup(resp.text)             

# <span class="txt_info"> 똑같은 값이 여러개 있을 때, 순서로 표시
soup.find_all('span', class_='txt_info')[0]
soup.find_all('span', class_='txt_info')[1]
------------------------------
# <span class="txt_info"> 똑같은 값이 여러개 있을 때
# 부모 먼저 찾고 그 안에서 또 찾음 -> 범위 줄여나가기
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)

soup = BeautifulSoup(resp.text)                  # url에 담겨진 텍스트 가져옴

info = soup.find('span', class_='info_view')     # 전체
info.find('span', class_='txt_info')             # 세분화
------------------------------
# beautifulsoup 활용해 div 중에서 id가 할머니컨테이너 찾음
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)

soup = BeautifulSoup(resp.text)

container = soup.find('div', id='harmonyContainer')

contents = ''
for p in container.find_all('p'):
    contents += p.get_text().strip()

contents
```
<br>
<br>

#### Css를 이용하여 태그 찾기
- select(모두 반환), select_one(첫번째만 반환)함수 사용하여 Css 태그 찾기 가능
- css selector 사용법
  - 태그명 찾기 tag 
  - 자손 태그 찾기 - 자손 관계 (tag tag) : 띄어쓰기로 구분
  - 자식 태그 찾기 - 다이렉트 자식 관계 (tag > tag) : '>' 기호로 구분
  - 아이디 찾기 #id
  - 클래스 찾기 .class
  - 속성값 찾기 [name='test']
    - 속성값 prefix 찾기 [name ^='test']
    - 속성값 suffix 찾기 [name $='test']
    - 속성값 substring 찾기 [name *='test]
  - n번째 자식 tag 찾기 :nth-child(n)
<br>
<br>

##### find와 select 차이?
- > find의 목적은 원하는 태그를 찾는 것이다.
  > 태그는 이름(name), 속성(attribute), 속성값(value)로 구성된다.
  > 따라서 find로 이름, 속성, 속성값을 특정하여 태그를 찾을 수 있다.

- > select는 CSS selector로 tag 객체를 찾아 반환한다.
  > 가장 첫 번째 결과를 반환하는 select_one()은 find()에,
  > 전체 결과를 리스트로 반환하는 select()는 find_all()에 대응한다.

```python
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
soup = BeautifulSoup(resp.text)

soup.select('h3')
------------------------------
soup.select('div#harmonyContainer')        # div 태그이면서 id가 harmonyContainer인 모두
soup.select('#harmonyContainer p')         # id가 harmonyContainer인 것 중에 id가 p인 모두
------------------------------
# p는 직계 자식이 아니라 자손이므로 띄어쓰기
# harmonyContainer 바로 밑에 있는 section이 자식이므로 >

soup.select('#harmonyContainer > section')
------------------------------
soup.select('h3.tit_view')                 # 클래스명은 .으로 구분
soup.select('.txt_newsview')
soup.select('h3[class="txt_newsview"]')

soup.select('h3[class^="tx"]')             # tx로 시작하는 것 추출
soup.select('h3[class$="_view"]')          # 끝나는 것
soup.select('h3[class*="_"]')              # 포함하는 것
------------------------------
soup.select('span.txt_info')               # span이면서 class가 txt_info인 것 중에 1번째꺼
soup.select('span.txt_info:nth-child(2)')  # n번째 자식 tag 찾기 :nth-child(n)   
```
<br>
<br>

#### 정규표현식으로 태그 찾기

```python
import re
soup.find_all('h1')
------------------------------
soup.find_all(re.compile('h\d'))                 # h로 시작해서 숫자 한개로 끝나는
------------------------------
# 모든 이미지 불러오기. 모든거 다, 문자 쩜 '\.'
soup.find_all('img', attrs={'src': re.compile('.+\.jpg')})
soup.find_all('img', attrs={'src': re.compile('.+\.png')})
soup.find_all('img', attrs={'src': re.compile('.+\.gif')})
------------------------------
soup.find_all('h3', class_='tit_view')     
soup.find_all('h3', class_=re.compile('..+newsview$'))    # view로 끝나는 모든 것
```
<br>
<br>

#### 댓글 개수 추출
- 댓글의 경우, 최초 로딩시에 전달되지 않음
- 이 경우는 추가적으로 AJAX로 비동기적 호출을 하여 따로 data 전송을 함
  - 개발자 도구의 network 탭에서 확인(XHR: XmlHTTPRequest)
  - 비동기적 호출: 사이트의 전체가 아닌 일부분만 업데이트 가능하도록 함
<br>
<br>
