# 회계 정보 시스템 (Accounting Information System)
## WAY1 - Kotlin + IDE(Android)

<br>

## ✅ 프로젝트 예상 기간 : 25.05.20 ~ 25.06.27

## ✅ 목표 요약 
  - 📌사용자 입력 : 계정과목, 증감여부(+/-), 금액
  - 📌자동 분개 생성
  - 📌 분개를 바탕으로 시산표 및 재무제표 생성
  - 📌📌 이 기능을 웹 또는 안드로이드 앱으로 구현

<br>

## ✅ WAY1-A. 기술 스택 요약

| 구성요소 | 선택안 | 
| :---: | :---: | 
Use Language | Kotlin
IDE | Android Studio 
DataBase | Room (SQLite Base ; ORM Library)
Design | XML + Hetpack Compose 
Construct | MVVM Architecture <br> (깔끔하고 테스트 용이) 

<br>

## ✅ WAY1-B-1. 전체 구조 설계

```css
[사용자 입력]
 └─> 계정과목, 증감, 금액
      └─> 자동 분개 처리 모듈
             └─> 분개 저장
                  └─> 시산표 생성
                        └─> 재무제표 생성
                              └─> UI 출력
```
```ruby
[현금 + 100,000] 
[자본금 + 100,000]
 => 자동 분개 생성:
     차변: 현금 100,000
     대변: 자본금 100,000
```

<br>

## ✅ WAY1-B-2. 구현 단계 초기 모델
#### 1. 데이터 모델 설계 (Kotlin)
```kotlin
data class AccountEntry(
    val accountName: String,
    val isDebit: Boolean,
    val amount: Double
)

data class JournalEntry(
    val date: LocalDate,
    val debits: List<AccountEntry>,
    val credits: List<AccountEntry>
)
```

#### 2. 자동 분개 처리 로직 (기초)
```kotlin
fun createJournalEntry(input: List<Triple<String, Boolean, Double>>): JournalEntry {
    val debits = input.filter { it.second }.map { AccountEntry(it.first, true, it.third) }
    val credits = input.filter { !it.second }.map { AccountEntry(it.first, false, it.third) }

    return JournalEntry(LocalDate.now(), debits, credits)
}
```

#### 3. 재무제표 생성 로직 (기초)
```kotlin
fun createTrialBalance(entries: List<JournalEntry>): Map<String, Double> {
    val accountBalances = mutableMapOf<String, Double>()

    for (entry in entries) {
        for (debit in entry.debits) {
            accountBalances[debit.accountName] = accountBalances.getOrDefault(debit.accountName, 0.0) + debit.amount
        }
        for (credit in entry.credits) {
            accountBalances[credit.accountName] = accountBalances.getOrDefault(credit.accountName, 0.0) - credit.amount
        }
    }

    return accountBalances
}
```


<br>









