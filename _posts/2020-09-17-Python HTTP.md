---
title: "[Python] 파이썬 HTTP 메쏘드 - Request와 Response"
date: 2020-9-17
categories:
- study
tags:
- python
toc: true
toc_ads: true
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

## HTTP Requests 모듈
- http request/response를 위한 모듈로, HTTP method를 메소드 명으로 사용하여 request 요청 예) get, post

```python
import requests
url = 'https://news.v.daum.net/v/20190728165812603'
```
<br>
<br>

### Get 요청
- http get 요청하기는 query parameter 이용하여 데이터 전달

```python
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
print(resp)
# 응답 코드가 2로 시작하면 성공을 의미함

resp.text
```
<br>
<br>

### Post 요청
- http post 요청하기는 post에 전달하는 form data를 이용하여 데이터 전달

```python
url = 'http://www.kangcom.com/member/member_check.asp'
data = {
    'id' : 'macmath22',
    'pwd' : 'Test1357!'
}

resp = requests.post(url, data=data)
resp.text
```
<br>
<br>

## HTTP Header 이용

```python
url = 'https://news.v.daum.net/v/20190728165812603'
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
}

resp = requests.get(url, headers=headers)
resp.text
```
<br>
<br>

## HTTP Response 처리
- status_code 및 text 속성 확인하기

```python
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
resp.st
```
<br>
<br>
<i> ※ credit: Fast Campus, 머신러닝과 데이터분석 A-Z 올인원 패키지 </i>