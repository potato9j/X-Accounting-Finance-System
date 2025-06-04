const transactions = [];
const adjustedEntries = [];

function addTransaction() {
    const account = document.getElementById('account').value;
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!account || isNaN(amount)) {
        alert('계정과목과 금액을 올바르게 입력해주세요');
        return;
    }

    transactions.push({ account, desc, amount, type });
    renderTrialBalance('trial-before', transactions);
}

document.getElementById('add-transaction').addEventListener('click', addTransaction);

document.getElementById('run-adjust').addEventListener('click', () => {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    runAdjustingEntries(start, end);
    const all = [...transactions, ...adjustedEntries];
    renderTrialBalance('trial-after', all);
    renderIncomeStatement('income', all);
});

function runAdjustingEntries(start, end) {
    adjustedEntries.length = 0; // reset
    transactions.forEach(tx => {
        if (needsAdjustment(tx, start, end)) {
            const adjust = createAdjustment(tx);
            adjustedEntries.push(adjust);
        }
    });
}

function needsAdjustment(tx, start, end) {
    // 단순 예시: 날짜가 기간에 포함되면 수정분개 필요하다고 가정
    return start && end; // 실제 로직은 기간 비교 등으로 확장
}

function createAdjustment(tx) {
    // 금액을 동일하게 반대 차변/대변으로 이동
    const opposite = tx.type === 'debit' ? 'credit' : 'debit';
    return { account: tx.account, desc: `Adjust: ${tx.desc}`, amount: tx.amount, type: opposite };
}

function renderTrialBalance(id, txs) {
    const container = document.getElementById(id);
    container.innerHTML = '<h3>' + (id === 'trial-before' ? '수정 전 시산표' : '수정 후 시산표') + '</h3>';
    const table = document.createElement('div');
    table.className = 'table';
    const debit = document.createElement('div');
    debit.className = 't-account';
    debit.innerHTML = '<strong>차변</strong><br>' + txs.filter(t => t.type === 'debit').map(t => `${t.account}: ${t.amount}`).join('<br>');
    const credit = document.createElement('div');
    credit.className = 't-account';
    credit.innerHTML = '<strong>대변</strong><br>' + txs.filter(t => t.type === 'credit').map(t => `${t.account}: ${t.amount}`).join('<br>');
    table.appendChild(debit);
    table.appendChild(credit);
    container.appendChild(table);
}

function renderIncomeStatement(id, txs) {
    const container = document.getElementById(id);
    container.innerHTML = '<h3>수정 후 손익계산서</h3>';
    const revenue = txs.filter(t => t.type === 'credit');
    const expense = txs.filter(t => t.type === 'debit');
    const revTotal = revenue.reduce((sum, r) => sum + r.amount, 0);
    const expTotal = expense.reduce((sum, e) => sum + e.amount, 0);
    const income = revTotal - expTotal;
    container.innerHTML += `수익 합계: ${revTotal}<br>비용 합계: ${expTotal}<br>순이익: ${income}`;
}
