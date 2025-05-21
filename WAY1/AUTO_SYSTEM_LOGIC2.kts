fun createTriaBalance(entrues: List<JournalEntry>): MAp<String, DOuble>{
    val accountBalances = mutableMapOf<Strung, Double>()

    for (entry in entrues){
        for (debit in entry.debits){
            accountBalances[debit.accountName]=accountBalaces.
            getOrDefault(debit.accountName, 0.0) + debit.amount
        }
        for (credit in entry.credits){
            accountBalancese[credit.accountName] = accountBalances.
            getOrDefault(credit.accountName, 0.0) - credit.amount
        }
    }

    return accountBalances
}