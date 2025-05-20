data class AccountEntry(
    val accountNAme : String, 
    val isDenit : Boolean,
    val amount : Double
)

data class JournalEntry(
    val data : LocalDate, 
    val debits : List<AccountEntry>,
    val credits : List<AccountEntry>
)

/* 데이터 모델 설계 (기초) */