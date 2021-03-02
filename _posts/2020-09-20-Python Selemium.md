---
title: "[Python] 파이썬 request 모듈"
date: 2020-9-18
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

<br>
<br>



#### Parsing
: 어떤 문장을 분석하거나 문법적 관계를 해석하는 행위로
컴퓨터 과학에서는 일련의 문자열을 의미있는 token(어휘 분석) 단위로 분해하고
그것들로 이루어진 Parse tree를 만드는 과정

#### Parser
: parsing을 수행하는 프로그램으로 문법 및 구문 분석하는 프로그램

```
from bs4 import BeautifulSoup
```

#### html 문자열 파싱
 - 문자열로 정의된 html 데이터 파싱하기

```
# parsing : HTML에서 특정값만 추출

# <h3 title='Good Content Title'>Contents Title</h3>
# h3 : tag,  title= : attribute 속성

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

#### find 함수
 - 특정 html tag를 검색
 - 검색 조건을 명시하여 찾고자하는 tag를 검색

```
soup = BeautifulSoup(html)
```
```
# .find함수는 html tag명으로 검색
soup.find('h3')
```
```
# soup.find('div')
# soup.find('div', custom='nice')
# soup.find('div', id='upper')

# soup.find('div', class='test')        class는 키워드라 검색이 안됨
soup.find('div', class_='test')
```
```
# attribute는 기본적으로 dict

attrs = {'id': 'upper', 'class': 'test'}
soup.find('div', attrs=attrs)            # id가 upper이면서 class가 test인 것
```

#### find_all 함수
 - find가 조건에 만족하는 하나의 tag만 검색한다면, find_all은 조건에 맞는 모든 tag를 리스트로 반환

 ```
 # find는 첫번째 함수만 반환
# find_all은 모두 반환하나 list 형식으로

# soup.find_all('div')
soup.find_all('div', class_='test')
```

#### get_text 함수
 - tag안의 value를 추출
 - 부모tag의 경우, 모든 자식 tag의 value를 추출

```
# get_text : 태그 안의 value를 추출
tag = soup.find('h3')
print(tag)
tag.get_text()
```

```
tag = soup.find('p')
print(tag)
tag.get_text()
```
```
# div는 텍스트 없이 다른 태그를 감쌈
# 부모태그에서 get_text를 하면 차일드태그 다 가져옴
# .strip(): String의 왼쪽과 오른쪽 제거.
# .lstrip(): String의 왼쪽 제거.
# .rstrip(): String의 오른쪽 제거.

tag = soup.find('div', id='upper')
print(tag)
tag.get_text()
```

#### attribute 값 추출하기
 - 경우에 따라 추출하고자 하는 값이 attribute에도 존재함
 - 이 경우에는 검색한 tag에 attribute 이름을 [ ]연산을 통해 추출가능
 - 예) div.find('h3')['title']

```

value = soup.find('h3')


print(tag)

tag['title']
```
