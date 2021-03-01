---
title: "[Python] 파이썬 정규 표현식 - re"
date: 2020-9-16
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 정규표현식(regular expression)
- 특정한 패턴과 일치하는 문자열를 '검색/치환/제거'하는 기능을 지원
- 정규표현식의 도움없이 패턴을 찾는 작업(Rule 기반)은 불완전 하거나, 작업의 cost가 높음
- 예를 들어, 이메일 형식 판별, 전화번호 형식 판별, 숫자로만 이루어진 문자열 등
<br>
<br>

## 기본 패턴
- a, X, 9 등등 문자 하나하나의 character들은 정확히 해당 문자와 동일. 
- 대소문자의 경우 기본적으로 구별하나, 구별하지 않도록 설정 가능
- 몇몇 문자들에 대해서는 예외가 존재하는데, '. ^ $ * + ? { } [ ] \ | ( )'들은 틀별한 의미로 사용 됨<br>
 > - . (마침표): 어떤 한개의 문자와도 일치. 즉, 모든 문자를 의미 (newline(엔터) 제외)
 > - \w: 문자 아무거나 일치 [a-zA-Z0-9_]
 > - \s: 공백문자와 일치
 > - \t, \n, \r: tab, newline, return
 > - \d: 숫자 0부터 9사이 아무거나 일치 [0-9]
 > - ^: 시작, $: 끝 각각 문자열의 시작과 끝을 의미
 > - \가 붙으면 스페셜한 의미가 없어짐. 예를들어 \\.는 .자체를 의미 \\\는 \를 의미
- 자세한 내용은 링크 참조 https://docs.python.org/3/library/re.html
<br>
<br>

## 문자로 변환 'r'
- 문자열 앞에 r이 붙으면 해당 문자열이 구성된 그대로 문자열로 변환

```python
a = 'abcdef\n'            # \n = 엔터
print(a)

b = r'abcdef\n'           # r'문자열' = raw string : 문자열 그대로 변환
print(b)
```
<br>
<br>

## 메타 캐릭터
- 메타 캐릭터란, 프로그래밍 언어 등에서 원래 그 문자가 가진 뜻이 아닌 특별한 용도로 사용하는 문자를 말한다
- cf. \를 앞에 붙여 원래 의미를 벗어나는 escape 문자들
<br>

### ( )
- ()을 사용하여, 매칭 결과를 각 그룹별로 분리 가능
- 패턴 명시 할 때, 각 그룹을 괄호() 안에 넣어 분리하여 사용

```python
m = re.search(r'\w+@.+', 'test@gmail.com')
m.group()                                # 그룹 호출하면 문자열 전체 호출
------------------------------
m = re.search(r'(\w+)@(.+)', 'test@gmail.com')
print(m.group(0))                        # 0번은 전체값
print(m.group(1))                        # 1번은 첫번째 괄호
print(m.group(2))                        # 2번은 두번째 괄호
```
<br>
<br>

### [ ]
- 보통 문자들의 범위를 나타내기 위해 사용하며, 원래 특수의미로 사용하는 것도 []안에 들어가면 원래 의미로 사용됨
  - [abck] : a or b or c or k
  - [abc.^] : a or b or c or . or ^
  - [a-d]  : -와 함께 사용되면 해당 문자 사이의 범위에 속하는 문자 중 하나
  - [0-9]  : 모든 숫자
  - [a-z]  : 모든 소문자
  - [A-Z]  : 모든 대문자
  - [a-zA-Z0-9] : 모든 알파벳 문자 및 숫자
  - [^0-9] : ^(not)가 맨 앞에 사용 되는 경우 해당 문자 패턴이 아닌 것과 매칭
              
```python
re.search(r'[cbm]at', 'aat')        # cbm 중 하나로 시작하고 at로 끝나는지
------------------------------
re.search(r'[0-9]hahah', '1hahah')  # 숫자 중 하나로 시작하고 hahah로 끝나는지
------------------------------
re.search(r'[abc.^]aron', 'caron')  # abc.^ 중 하나로 시작
------------------------------
re.search(r'[^abc]aron', 'aaron')  # aaron, baron, caron만 아니면 됨
```
<br>
<br>

### \
1. 다른 문자와 함께 사용되어 특수한 의미를 지니거나
  - \d : 숫자를          [0-9]와 동일
  - \D : 숫자가 아닌 문자  [^0-9]와 동일
  - \s : 공백 문자 (띄어쓰기, 탭, 엔터 등)
  - \S : 공백이 아닌 문자
  - \w : 알파벳대소문자, 숫자 [0-9a-zA-Z]와 동일
  - \W : non alpha-numeric 문자 [^0-9a-zA-Z]와 동일
2. 글자 자체를 표현하도록 할 경우 사용
  - \\. , \\\

```python
re.search('\sand', 'apple and banana')  # 띄어쓰기와 and 문자
------------------------------
re.search(r'\.and', '.and')             # \가 붙어서 .자체를 의미
```
<br>
<br>

### .
- 모든 문자를 의미
```python
re.search(r'p.g', 'pig')
```
<br>
<br>

### ^, $
- ^  문자열의 맨 앞부터 일치하는 경우 검색
- \$  문자열의 맨 뒤부터 일치하는 경우 검색

```python
re.search(r'b\w+a', 'cabana')     # b로 시작하고 아무글자 1번 이상 패턴 반복하고 a로 끝남
------------------------------
re.search(r'^b\w+a', 'cabana')    # ^ 문자열 맨 앞부터 일치할 때
------------------------------
re.search(r'^b\w+a', 'babana')    # ^ 문자열 맨 앞부터 일치할 때
------------------------------
re.search(r'b\w+a$', 'cabana')    # $ 문자열 맨 마지막
------------------------------
re.search(r'b\w+a$', 'cabanap')
```
<br>
<br>

### *, +, ?
- 패턴 뒤에 위치하는 *, +, ?는 해당 패턴이 반복적으로 존재하는지 검사
  - '+' : 1번 이상의 패턴이 발생 (1, 2 ~ )
  - '*' : 0번 이상의 패턴이 발생 (0, 1, 2 ~ )
  - '?' : 0 혹은 1번의 패턴이 발생 (있거나 없거나)
- 반복을 패턴의 경우 가능한 많은 부분이 매칭되도록 꼼꼼하게(greedy) 검색 하며, 가장 빨리 찾아진 것을 도출함.
- 예를 들어, a[bcd]*b 패턴을 abcbdccb에서 검색하는 경우, 'ab, abcb, abcbdccb' 전부 가능 하지만 최대한 많은 부분이 매칭된 abcbdccb가 검색됨.

```python
re.search(r'a[bcd]*b', 'abcbdccb') # a로 시작하고 b,c,d 중 하나가 0번 이상 반복되며 b로 끝나는 것
------------------------------
re.search(r'b\w+a', 'banana')      # b로 시작해서 어떤 숫자나 영문자가 1번 이상 반복하고 a로 끝나는 것
------------------------------
re.search(r'i+', 'piigiii')        # i가 반복되는 구간
------------------------------
re.search(r'pi+g', 'piig')         # p로 시작하고 i가 1번 이상 반복하고 g로 끝남
------------------------------
re.search(r'pi*g', 'piig')         # p로 시작하고 i가 0번 이상 반복하고 g로 끝남
------------------------------
re.search(r'https?', 'http://www.naver.com') # http로 시작하고 s는 1번 있거나 없거나
```
<br>
<br>

### *?, +? 
- 기본적으로 *, +, ?를 사용하면 greedy(맥시멈 매칭)하게 동작함
- *?, +?을 이용하면 해당 기능을 non-greedy(미니멈 매칭)하게 구현
```python
# 나는 <html>만 찾고 싶은데 <> 전체를 찾아서 <html>haha</html>
re.search(r'<.+>', '<html>haha</html>')
------------------------------
# ? : 최대가 아니라 최소로 찾음
re.search(r'<.+?>', '<html>haha</html>')
```
<br>
<br>

### { }
- *, +, ?을 사용하여 반복적인 패턴을 찾는 것이 가능하나, 반복의 횟수 제한은 불가
- 패턴뒤에 위치하는 중괄호{}에 숫자를 명시하면 해당 숫자 만큼의 반복인 경우에만 매칭

```python
re.search('pi{3}', 'piiig')             # 3번 반복
re.search('pi{3, 5}', 'piiiiiig')       # 최소 3 ~ 최대 5번 반복
```
<br>
<br>

### { }?
- {m,n}의 경우 m번에서 n번 반복하나 꼼꼼하게(greedy) 동작
- {m,n}?로 사용하면 느슨하게(non-greedy) 동작. 즉, 최소 m번만 매칭하면 만족

```python
re.search(r'a{3,5}', 'aaaaa')            # a를 최소 3번에서 최대 5번까지 검출 - 3개
------------------------------
re.search(r'a{3,5}?', 'aaaaa')           # 최소한만 검출 - 5개
```
<br>
<br>

## 관련 함수
### search
- '.search(찾고자하는 패턴, 찾을 대상)' 형식으로 특정 패턴 찾고자 할 때 사용
- 첫번째로 패턴을 찾으면 match 객체를 반환하고, 패턴을 찾지 못하면 None을 반환
- search 함수는 여러가지 중에서 가장 먼저오는 것을 발견 (ex. 11, 12, 11, 19 중에서 11만 출력)

```python
# .search(찾고자하는 패턴, 찾을 대상)
m = re.search(r'abc', '123abcdef')             # abcdef에서 'abc'가 있는지 찾는
print(type(m))
print(m.start())                               # 문자가 검색된 시작 위치 - 시작 포함
print(m.end())                                 # 문자가 검색된 종료 위치 - 종료 미포함
print(m.group())                               # 해당 검색된 패턴 자체를 출력
------------------------------
m = re.search(r'\d\d\d', '112abcdef119')       # 숫자 2개가 나란히 있는지
------------------------------
m = re.search(r'\d\d\d\w', '112abcdef119')     # 숫자 3개, 문자 1개
------------------------------
m = re.search(r'..\w\w', '@#$%ABCDabcd')       # 어떠한 문자든지 2개+문자2개
```
<br>
<br>

### match
- search와 match 둘 다 검색 함수이나 match는 처음부터 맞는지 확인, search는 어디에 있어도 있으면 출력
- 시작부터 해당 패턴이 존재하지 않다면 None 반환

```python
# .match(찾고자하는 패턴, 찾을 대상)
re.match(r'\d\d\d', 'my number is 123')          # 처음부터 안 나오므로 호출안됨
------------------------------
re.match(r'\d\d\d', '123 is my number')
------------------------------
re.search(r'^\d\d\d', '123 is my number')        # ^ 문자열 시작부터 탐색
```
<br>
<br>

### findall
- search가 최초로 매칭되는 패턴만 반환한다면, findall은 매칭되는 전체의 패턴을 반환
- 매칭되는 모든 결과를 리스트 형태로 반환

```python
re.findall(r'[\w-]+@[\w.]+', 'test@gmail.com haha test2@gmail.com nice test test')
```
<br>
<br>

### sub
- 주어진 문자열에서 일치하는 모든 패턴을 찾아서 치환(substitute)하고 그 결과를 문자열로 다시 반환
- 두번째 인자는 특정 문자열이 될 수도 있고, 함수가 될 수 도 있음
- count가 0인 경우는 전체를, 1이상이면 해당 숫자만큼 치환 됨

```python
# .sub(r'패턴', '치환','문자열')
print(re.sub(r'[\w-]+@[\w.]+', 'great', 'test@gmail.com haha test2@gmail.com nice test test'))
print(re.sub(r'[\w-]+@[\w.]+', 'great', 'test@gmail.com haha test2@gmail.com nice test test', count=1))
```
<br>
<br>

### compile
- 자주 사용하는 패턴을 compile로 해당표현식을 re.RegexObject 객체로 저장하여 사용
- 동일한 정규표현식을 매번 다시 쓰기 번거로움 해결

```python
email_reg = re.compile(r'[\w-]+@[\w.]+')

# 이미 패턴은 넘겨져 있으므로 문자열만 입력
print(email_reg.search('test@gmail.com haha good'))
print(email_reg.findall('test@gmail.com haha good'))
```
<br>
<br>

## 연습문제 
### 이메일 주소 추출
```python
import requests
from bs4 import BeautifulSoup
# 위의 두 모듈이 없는 경우에는 pip install requests bs4 실행

def get_news_content(url):
    response = requests.get(url)
    content = response.text
    soup = BeautifulSoup(content, 'html5lib')
    div = soup.find('div', attrs = {'id' : 'harmonyContainer'})
    content = ''
    for paragraph in div.find_all('p'):
        content += paragraph.get_text()
    return content

news1 = get_news_content('https://news.v.daum.net/v/20190617073049838')
print(news1)

re.findall(r'[\w-]+@[\w.]+', news1)

email_reg = re.compile(r'[\w-]+@[\w.]+\w+')
email_reg.search('test1@gmail.com.')
```

### 올바른 웹주소 찾기
```python
webs = ['http://www.test.co.kr', 
        'https://www.test1.com', 
        'http://www.test.com', 
        'ftp://www.test.com', 
        'http:://www.test.com',
       'htp://www.test.com',
       'http://www.google.com', 
       'https://www.homepage.com.']

web_reg = re.compile(r'https?://[\w.]+\w+$')

list(map(lambda w: web_reg.search(w) != None, webs))           
```
<br>
<br>
