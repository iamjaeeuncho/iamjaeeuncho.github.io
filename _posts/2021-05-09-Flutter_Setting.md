---
title: "[Flutter] Dart SDK is not configured 해결 방법"
date: 2021-5-9
categories:
  - study
tags:
  - flutter
toc: true
toc_ads: true
toc_sticky: true
---


## 에러
![11111](https://user-images.githubusercontent.com/46369038/117569042-8dac6780-b0fe-11eb-882d-cd35cc1422f7.png)

요즘 만들고 싶은 어플이 생겨서 공부하고 있는 Flutter 프레임 Dart 언어  

분명 Flutter 패키지까지 다 다운 받아서 Dart SDK가 다 깔려있을텐데 

깃허브에서 예제 다운 받아서 열어보면 

저렇게 Dart SDK is not configured이라는 알림 창이 뜬다  

새로운 파일 만들때는 괜찮은데 꼭 기존 프로젝트 불러올때만 저럼..  


저거때문에 거의 하루를 꼬박 소비했는데 해결법이 너무 간단해서 허무했다 ㅎㅎ  
<br>
<br>

## 해결 방법
![image](https://user-images.githubusercontent.com/46369038/117631634-66fe3780-b1b7-11eb-99fd-f7cb3d17b21a.png)


아무튼 문제는 언어 Path값 설정이 안되어 있어서였는데,  

해결책은 상단에 File > Setting > Languages & Frameworks > Flutter에서

Flutter SDK path에 다운 받은 Flutter 폴더를 선택해주면 된다

그러면 dependencies 다운받거나 업데이트 받으라고 하는데 클릭만 해주면 끝난다

아무래도 내가 다운받을때 설정을 잘못 했던 것 같다
<br>
<br>
