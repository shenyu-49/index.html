let provider;
let signer;
let walletAddress = "";

const connectWalletBtn = document.getElementById("connectWalletBtn");
const userBalanceDom = document.getElementById("userBalance");
const poolAmountDom = document.getElementById("poolAmount");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const betAmountInput = document.getElementById("betAmount");

// 模拟分红池数据
poolAmountDom.innerText = "12865.32 USDT";

// 连接钱包
connectWalletBtn.addEventListener("click", async () => {
    if (!window.ethereum) {
        alert("请先安装 MetaMask 钱包");
        return;
    }
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        walletAddress = await signer.getAddress();

        connectWalletBtn.innerText = walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
        userBalanceDom.innerText = "258.69 USDT";
        alert("钱包连接成功！");
    } catch (err) {
        alert("连接失败：" + err.message);
    }
});

// 看涨投注
yesBtn.addEventListener("click", () => {
    if (!walletAddress) {
        alert("请先连接钱包");
        return;
    }
    const val = betAmountInput.value;
    if (!val || parseFloat(val) < 0.001) {
        alert("投注金额最小为0.001");
        return;
    }
    alert(`投注成功！选择看涨，金额：${val} USDT`);
});

// 看跌投注
noBtn.addEventListener("click", () => {
    if (!walletAddress) {
        alert("请先连接钱包");
        return;
    }
    const val = betAmountInput.value;
    if (!val || parseFloat(val) < 0.001) {
        alert("投注金额最小为0.001");
        return;
    }
    alert(`投注成功！选择看跌，金额：${val} USDT`);
});

// 简易倒计时
let time = 5 * 60;
function updateTime() {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;
    document.getElementById("countdownTime").innerText = 
        `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if(time > 0) time--;
}
setInterval(updateTime, 1000);
updateTime();
