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

## API?
- API는 프로그램들이 서로 상호작용하는 것을 도와주는 매개체

<center>
<img src="https://user-images.githubusercontent.com/46369038/110097901-e7cd3b80-7de2-11eb-9f23-ae540246c1ec.gif" style="border: 2px solid rgb(213, 213, 213);">
<br>
<i>credit: https://www.kores.net/views/cms/komis/dataopen/openapi/openapiintro.jsp</i>
</center>
<br>
<br>

### API 역할
- API는 여러분이 가진 서버와 데이터베이스에 대한 출입구 역할로 허용된 사람들에게만 접근성을 부여해줌
- API는 애플리케이션과 기기가 데이터를 원활히 주고받을 수 있도록 돕는 역할
- API는 모든 접속을 표준화하기 때문에 기계/운영체제 등과 상관없이 누구나 동일한 액세스를 얻을 수 있으며, API는 범용 플러그처럼 작동 가능.
<br>
<br>

### API 유형
1. Private API: 내부 API로, 제 3자에게 노출되지 않습니다.
2. Public API: 개방형 API로, 모두에게 공개됩니다.
3. Partner API: 기업이 데이터 공유에 동의하는 특정인들만 사용 가능하며, 파트너 회사 간 소프트웨어를 통합하기 위해 사용.
<br>
<br>

## OPEN API 사용하기
1. 공공데이터 포털 회원가입/로그인(https://www.data.go.kr/)
2. API 사용 요청 / 키 발급
- 서비스 이용 신청하면 보통 자동으로 키 발금됨
3. API 문서(specification) 확인
4. API 테스트 및 개발
<br>
<br>

### key 값 확인하기
- 서비스 호출 트래킹할 목적이나 악의적인 사용을 금지할 목적으로 주로 사용
- 새로 발급받은 키는 1시간 이후 사용 가능

```python
serviceKey = 'GOe7vW0EjFIGLKTPBW2kPET%2FzYRtXB2WJ9i1oHP8PcONPPAgidtCTDBkPskKt2NMbCvTjiN13jAttzmsNXoX1Q%3D%3D'
```
<br>
<br>

### Endpoint 확인하기
- API가 서비스되는 서버의 IP 혹은 domain 주소

```python
# 주소 = 기본주소 + endpoint(종점)에 전송하는 데이터
# serviceKey=인증키 부분을 serviceKey={}.format(serviceKey)로 변경
# 보통 데이터를 xml 형식으로 받으나 요즘에는 jason 형식으로 받음. 주소 마지막에 _type=json 추가
endpoint = 'http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaCode?serviceKey={}&numOfRows=10&pageSize=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json'.format(serviceKey)
print(endpoint)
```
<br>
<br>

### Parameter 확인하기
- API 호출에 필요한 parameter 값 확인 및 구성

```python
# pageNo={}로 변경하고 .format(1) 추가
import requests
endpoint = 'http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaCode?serviceKey={}&numOfRows=10&pageSize=10&pageNo={}&MobileOS=ETC&MobileApp=AppTest&_type=json'.format(serviceKey, 1)
resp = requests.get(endpoint)

print(resp.status_code)
print(resp.text)

# json(dict)형식으로 호출
data = resp.json()

# data의 response의 body의 items의 item 중에서도 0번째 인덱스만 가져옴
print(data['response']['body']['items']['item'][0])
```
<br>
<br>
