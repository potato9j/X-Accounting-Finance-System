fun createJournalEntry(input: List<Triple<String, Boolean, Double>>):
JournalEntry{
    val debits = input.filter{ 
        it.second }.map {
            AccountEntry(if.first, true, it.third)}
    val creduts = input.filter{
        !it.second }.map {
            AccountEntry(it.first, false, it third)}

        return JournalEntry(LocalData.now(), debits, credits)
        }

/** 데이터 모델 설계 (초기모델)  **/