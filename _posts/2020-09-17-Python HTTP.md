---
title: "[Python] 파이썬 HTTP 메쏘드 - request"
date: 2020-9-17
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## HTTP Method
- HTTP(HyperText Transfer Protocol): HTML 문서 등의 리소스를 전송하는 프로토콜

<center>
<img src="https://user-images.githubusercontent.com/46369038/110088610-6b355f80-7dd8-11eb-99db-2e923ba7a29c.png" style="border: 2px solid rgb(213, 213, 213);">
<br>
<i>credit: https://github.com/VanHakobyan/HTTP-Protocol-Manipulation</i>
</center>
<br>
<br>

### 데이터 요청 방식
- Get 요청: 데이터를 URL에 포함하여 전달, 주로 리소스 요청에 사용
- Post 요청: 데이터를 Form data에 포함하여 전달, 주로 로그인 같이 민감한 데이터를 전송할때 사용
<br>
<br>

## requests 모듈
- http request/response를 위한 모듈
- HTTP method를 메소드 명으로 사용하여 request 요청 예) get, post

```python
import requests
url = 'https://news.v.daum.net/v/20190728165812603'
```

### get 요청
- http get 요청하기
- query parameter 이용하여 데이터 전달하기

```python
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
print(resp)
# 응답 코드가 2로 시작하면 성공을 의미함

resp.text
```

### post 요청
- http post 요청하기
- post data 이용하여 데이터 전달하기

```python
url = 'http://www.kangcom.com/member/member_check.asp'

# post에 전달하는 form 데이타
data = {
    'id' : 'macmath22',
    'pwd' : 'Test1357!'
}

resp = requests.post(url, data=data)
resp.text
```

## HTTP header 데이터 이용하기
- header 데이터 구성하기
- header 데이터 전달하기

```python
url = 'https://news.v.daum.net/v/20190728165812603'
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
}

resp = requests.get(url, headers=headers)
resp.text
```

## HTTP response 처리하기
1. response 객체의 이해
2. status_code 확인하기
3. text 속성 확인하기

```python
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
resp.st
```


## HTML 요소
- HTML(Hyper Text Markup Language)
웹사이트를 생성하기 위한 언어로 문서와 문서가 링크로 연결되어 있고,태그를 사용하는 언어
- 태그(Tag)란, HTML문서의 기본 블락으로 브라우저에게 어떻게 렌더링(화면에 표시)될지 전달
- ex. <태그명 속성1=“속성값1" 속성2=“속성값2”>Value</태그명>
